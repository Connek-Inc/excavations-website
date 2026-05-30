// ╔════════════════════════════════════════════════════════════════════════════
// ║ Express server for excavationserable.com
// ║
// ║ Hostinger LSAPI (lsnode.js) picks this file up automatically — no
// ║ manual Node.js app registration in hPanel is required. Pattern is
// ║ intentionally aligned with the elcarajoese setup on the same host
// ║ (plain ESM, no top-level await, LSAPI-compatible).
// ║
// ║ Responsibilities:
// ║   1. Serve the SvelteKit static build under `build/` as the public site
// ║   2. Proxy /api/connek/* requests to the Connek backend with HMAC
// ║      signing (the partner SECRET never leaves this process)
// ║   3. SPA fallback for any non-API, non-asset route → `build/200.html`
// ║
// ║ Everything else (auth, blogs, contacts, soumissions, analytics, MySQL)
// ║ used to live here too. We dropped all of that because the only user
// ║ of the site is the public landing + form — the legacy admin was
// ║ unused. Anything dynamic now lives on connek-ai.
// ╚════════════════════════════════════════════════════════════════════════════
import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { createHash, createHmac } from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);
app.use(
	helmet({
		contentSecurityPolicy: false, // SvelteKit already sets its own
		crossOriginEmbedderPolicy: false
	})
);
app.use(compression());
app.use(express.json({ limit: '1mb' }));

// ─── Connek public-API proxy (HMAC server-side) ─────────────────────────────
//
// The frontend calls `/api/connek/<path>`. We sign with the partner key
// (CONNEK_API_KEY_*) and forward to `${CONNEK_API_BASE_URL}/api/v1/<path>`.
// Mirrors `src/lib/server/connek/api.ts` so behaviour stays identical
// whether the request is served by Express (prod) or SvelteKit (dev).
//
// Canonical string MUST match connek-ai's auth_layer.py:
//   {METHOD}\n{PATH}\n{UNIX_SECONDS}\n{SHA256_HEX(body)}
const CONNEK_BASE = process.env.CONNEK_API_BASE_URL || 'https://api.dev.connek.ca';
const CONNEK_KEY_ID = process.env.CONNEK_API_KEY_ID || '';
const CONNEK_KEY_SECRET = process.env.CONNEK_API_KEY_SECRET || '';

function signConnek(method, signedPath, bodyStr) {
	const ts = Math.floor(Date.now() / 1000);
	const bodySha = createHash('sha256').update(bodyStr, 'utf8').digest('hex');
	const canonical = `${method}\n${signedPath}\n${ts}\n${bodySha}`;
	const sig = createHmac('sha256', CONNEK_KEY_SECRET).update(canonical, 'utf8').digest('hex');
	return {
		'X-Connek-Key-Id': CONNEK_KEY_ID,
		'X-Connek-Timestamp': String(ts),
		'X-Connek-Signature': sig
	};
}

async function connekProxy(req, res, { method, backendPath, tokenOnly = false }) {
	if (!tokenOnly && (!CONNEK_KEY_ID || !CONNEK_KEY_SECRET)) {
		return res
			.status(500)
			.json({ error: 'config_missing', message: 'CONNEK_API_KEY_* not configured' });
	}
	const bodyStr = method === 'GET' ? '' : JSON.stringify(req.body ?? {});
	const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
	if (!tokenOnly) Object.assign(headers, signConnek(method, backendPath, bodyStr));

	try {
		const upstream = await fetch(`${CONNEK_BASE}${backendPath}`, {
			method,
			headers,
			body: method === 'GET' ? undefined : bodyStr
		});
		const text = await upstream.text();
		// Pass status + body straight through so the browser sees the same
		// envelope connek-ai sent (e.g., 404 { error: { code, message } }).
		res
			.status(upstream.status)
			.type(upstream.headers.get('content-type') || 'application/json')
			.send(text);
	} catch (err) {
		console.error('[connek proxy]', backendPath, err);
		res.status(502).json({ error: 'upstream_unavailable', message: String(err?.message ?? err) });
	}
}

// GET /api/connek/services — list public-visible services
app.get('/api/connek/services', (req, res) =>
	connekProxy(req, res, { method: 'GET', backendPath: '/api/v1/services' })
);

// GET /api/connek/business — business profile snapshot
app.get('/api/connek/business', (req, res) =>
	connekProxy(req, res, { method: 'GET', backendPath: '/api/v1/business/profile' })
);

// POST /api/connek/submission — landing-page quote submission form
app.post('/api/connek/submission', (req, res) =>
	connekProxy(req, res, { method: 'POST', backendPath: '/api/v1/quotes/submission' })
);

// GET /api/connek/quote/:token — client opens their quote via magic link
// (token-only; partner SECRET not used)
app.get('/api/connek/quote/:token', (req, res) =>
	connekProxy(req, res, {
		method: 'GET',
		backendPath: `/api/v1/quotes/access/${encodeURIComponent(req.params.token)}`,
		tokenOnly: true
	})
);

// POST /api/connek/quote/:token/counter — counter-offer (token-only)
app.post('/api/connek/quote/:token/counter', (req, res) =>
	connekProxy(req, res, {
		method: 'POST',
		backendPath: `/api/v1/quotes/access/${encodeURIComponent(req.params.token)}/counter`,
		tokenOnly: true
	})
);

// POST /api/connek/quote/:token/sign — sign acceptance (token-only)
app.post('/api/connek/quote/:token/sign', (req, res) =>
	connekProxy(req, res, {
		method: 'POST',
		backendPath: `/api/v1/quotes/access/${encodeURIComponent(req.params.token)}/sign`,
		tokenOnly: true
	})
);

// ─── Static SvelteKit build ─────────────────────────────────────────────────
const buildDir = path.join(__dirname, 'build');
const hasBuild =
	fs.existsSync(path.join(buildDir, 'index.html')) ||
	fs.existsSync(path.join(buildDir, '200.html'));

if (hasBuild) {
	app.use(
		express.static(buildDir, {
			maxAge: isProd ? '7d' : 0,
			etag: true,
			index: ['index.html']
		})
	);

	// SPA fallback for any non-API route — serve 200.html (adapter-static)
	const fallbackFile = fs.existsSync(path.join(buildDir, '200.html'))
		? path.join(buildDir, '200.html')
		: path.join(buildDir, 'index.html');

	app.get(/^(?!\/api\/).*/, (_req, res) => {
		res.sendFile(fallbackFile);
	});
} else {
	app.get('/', (_req, res) => {
		res
			.status(503)
			.type('html')
			.send('<h1>Build missing</h1><p>Run <code>npm run build</code> first.</p>');
	});
}

// ─── 404 for unknown /api/* ──────────────────────────────────────────────────
app.use('/api', (_req, res) => res.status(404).json({ error: 'not_found' }));

app.use((err, _req, res, _next) => {
	console.error('[server] error:', err);
	res.status(err.status || 500).json({ error: err.message || 'server_error' });
});

// ─── Boot ────────────────────────────────────────────────────────────────────
const server = app.listen(PORT, HOST, () => {
	console.log(`🚀 excavationserable.com — listening on http://${HOST}:${PORT}`);
	console.log(`   Build: ${hasBuild ? 'OK' : 'MISSING'}`);
	console.log(`   Connek: ${CONNEK_BASE} ${CONNEK_KEY_ID ? '(keyed)' : '(NO KEY)'}`);
});

const shutdown = (signal) => {
	console.log(`Received ${signal}, shutting down...`);
	server.close(() => process.exit(0));
	setTimeout(() => process.exit(1), 10000).unref();
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
	console.error('[server] unhandledRejection:', reason);
});
process.on('uncaughtException', (err) => {
	console.error('[server] uncaughtException:', err);
});

export default app;
