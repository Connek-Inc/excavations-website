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
import { renderSubmission } from './email-templates.js';

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

// ─── Fallback email sender (Resend) ─────────────────────────────────────────
// connek-workers POSTs here when it can't deliver a submission email after its
// own retries. We re-send via our own Resend key (shared with connek-workers).
// Auth is a shared secret in the X-Fallback-Secret header — without it the
// endpoint refuses, so this can't be abused as an open relay.
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FALLBACK_SECRET = process.env.FALLBACK_SHARED_SECRET || '';
const FALLBACK_FROM = process.env.FALLBACK_FROM || 'Connek <team@connek.ca>';

// Excavations envía las notificaciones de submission directamente (mecanismo de
// emergencia/garantía: si connek-workers / la cola no entrega, el correo sale
// igual desde aquí, que es donde se origina la submission). Reusa Resend.
const BUSINESS_NAME = process.env.BUSINESS_NAME || 'Mini Excavations Érable';
const BUSINESS_NOTIFY_EMAIL = process.env.BUSINESS_NOTIFY_EMAIL || '';
// Dirección verificada en Resend (el dominio connek.ca está verificado). El
// NOMBRE visible del remitente es el del negocio (no "Connek"), para que el
// cliente vea que lo atiende la empresa.
const FROM_ADDR = process.env.FROM_EMAIL || 'team@connek.ca';
const businessFrom = () => `${BUSINESS_NAME} <${FROM_ADDR}>`;

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

// Send one email via the Resend REST API. Throws on non-2xx.
async function sendViaResend({ to, subject, html, from, replyTo }) {
	const payload = { from: from || FALLBACK_FROM, to: Array.isArray(to) ? to : [to], subject, html };
	if (replyTo) payload.reply_to = replyTo;
	const r = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	const body = await r.json().catch(() => ({}));
	if (!r.ok) throw new Error(`resend ${r.status}: ${JSON.stringify(body).slice(0, 200)}`);
	return body?.id;
}

// Emergency/guaranteed submission notification: sent straight from excavations
// so the lead is NEVER lost even if connek-workers / the queue is down. Renders
// the local templates from the form body + the connek-api response (reference,
// token). Best-effort: failures are logged, never block the form response.
async function sendSubmissionEmails(b, upstream) {
	if (!RESEND_API_KEY) {
		console.warn('[submission email] RESEND_API_KEY no configurada — no se envía');
		return;
	}
	const reference = upstream?.reference ?? upstream?.quote_number ?? '';
	const token = upstream?.token ?? '';

	if (b?.client_email) {
		try {
			const r = renderSubmission('submission_client', {
				client_first_name: b.client_first_name,
				business_name: BUSINESS_NAME,
				category: b.category,
				project_description: b.project_description,
				token,
				reference
			});
			const id = await sendViaResend({
				to: b.client_email, subject: r.subject, html: r.html,
				from: businessFrom(),                      // remitente = el negocio, no "Connek"
				replyTo: BUSINESS_NOTIFY_EMAIL || undefined // si el cliente responde → va al negocio
			});
			console.log(`[submission email] client=${b.client_email} ref=${reference} id=${id}`);
		} catch (e) {
			console.error('[submission email] client falló:', e?.message ?? e);
		}
	}

	if (BUSINESS_NOTIFY_EMAIL) {
		try {
			const r = renderSubmission('submission_business', {
				client_first_name: b.client_first_name,
				client_email: b.client_email,
				client_phone: b.client_phone,
				project_address: b.location,
				category: b.category,
				project_description: b.project_description,
				reference
			});
			const id = await sendViaResend({
				to: BUSINESS_NOTIFY_EMAIL, subject: r.subject, html: r.html,
				from: businessFrom(),                  // remitente = el negocio
				replyTo: b.client_email || undefined    // el negocio responde → directo al cliente
			});
			console.log(`[submission email] business=${BUSINESS_NOTIFY_EMAIL} ref=${reference} id=${id}`);
		} catch (e) {
			console.error('[submission email] business falló:', e?.message ?? e);
		}
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

// POST /api/connek/submission — landing-page quote submission form.
// Proxies to connek-api (creates the quote/lead) AND sends the notification
// emails directly from excavations — the emergency/guarantee path: the business
// + client get notified even if connek-workers / the queue is down.
app.post('/api/connek/submission', async (req, res) => {
	const body = req.body ?? {};
	const backendPath = '/api/v1/quotes/submission';
	const bodyStr = JSON.stringify(body);

	let status = 500;
	let text = JSON.stringify({ error: 'config_missing', message: 'CONNEK_API_KEY_* not configured' });
	let upstream = null;

	if (CONNEK_KEY_ID && CONNEK_KEY_SECRET) {
		const headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...signConnek('POST', backendPath, bodyStr)
		};
		try {
			const r = await fetch(`${CONNEK_BASE}${backendPath}`, { method: 'POST', headers, body: bodyStr });
			status = r.status;
			text = await r.text();
			try { upstream = JSON.parse(text); } catch { /* upstream returned non-JSON; keep raw */ }
		} catch (err) {
			console.error('[connek proxy] submission', err);
			status = 502;
			text = JSON.stringify({ error: 'upstream_unavailable', message: String(err?.message ?? err) });
		}
	}

	// Emergency send — fire-and-forget so a slow/failing email never blocks the
	// form response. `upstream` may be null if connek-api was down; we still
	// notify the business with the form data so the lead isn't lost.
	sendSubmissionEmails(body, upstream).catch((e) => console.error('[submission email]', e));

	res.status(status).type('application/json').send(text);
});

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

// POST /api/fallback/email — last-resort sender for connek-workers.
// Body: { to, subject?, kind?: 'submission_client'|'submission_business',
//         data?: {...}, html?, from? }. Provide `html` to relay as-is, or
// `kind`+`data` to render the submission template here. Requires the shared
// secret header so it can't be used as an open relay.
app.post('/api/fallback/email', async (req, res) => {
	if (!FALLBACK_SECRET || req.get('X-Fallback-Secret') !== FALLBACK_SECRET) {
		return res.status(401).json({ ok: false, error: 'unauthorized' });
	}
	if (!RESEND_API_KEY) {
		return res.status(500).json({ ok: false, error: 'resend_not_configured' });
	}

	const { to, subject, html, kind, data, from } = req.body ?? {};
	if (!to) return res.status(400).json({ ok: false, error: 'missing_to' });

	let finalHtml;
	let finalSubject = subject;
	if (kind) {
		// Prefer excavations' own template for known kinds (submissions).
		const rendered = renderSubmission(kind, data ?? {});
		finalHtml = rendered.html;
		finalSubject = finalSubject || rendered.subject;
	} else {
		finalHtml = html; // relay pre-rendered HTML as-is
	}
	if (!finalHtml) return res.status(400).json({ ok: false, error: 'missing_html_or_kind' });

	try {
		const upstream = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: from || FALLBACK_FROM,
				to: Array.isArray(to) ? to : [to],
				subject: finalSubject || 'Connek',
				html: finalHtml
			})
		});
		const body = await upstream.json().catch(() => ({}));
		if (!upstream.ok) {
			console.error('[fallback email] resend error', upstream.status, body);
			return res.status(502).json({ ok: false, error: 'resend_failed', detail: body });
		}
		console.log(`[fallback email] sent id=${body?.id} to=${JSON.stringify(to)} kind=${kind || '(html)'}`);
		return res.json({ ok: true, id: body?.id });
	} catch (err) {
		console.error('[fallback email] error', err);
		return res.status(502).json({ ok: false, error: String(err?.message ?? err) });
	}
});

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

// ─── Health check (keep-alive) ────────────────────────────────────────────────
// Liveness endpoint baratito para un cron de uptime. Mantiene el worker Node
// de LSAPI despierto SIN tocar el backend Connek. Hostinger duerme/recicla
// este proceso cuando está idle; un cron que pinguea /api/health cada par de
// minutos lo mantiene arriba y lo relevanta a los ~2 min de un crash.
// OJO: hay que pinguear una ruta /api/* — la home la sirve LiteSpeed directo
// desde build/ y NO despierta a Node.
app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

// ─── Legacy no-op endpoints ──────────────────────────────────────────────────
// /api/analytics/track existía en el Express viejo (escribía en MySQL).
// Algún build cacheado del browser puede seguir llamándolo — respondemos
// 204 silencioso en vez de 404/502 para que no salga rojo en devtools.
app.post('/api/analytics/track', (_req, res) => res.status(204).end());

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
