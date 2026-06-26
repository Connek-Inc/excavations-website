// ╔════════════════════════════════════════════════════════════════════════════
// ║ Express server for excavationserable.com (Mini Excavations Érable) — the new
// ║ React/Vite site. Mirrors the proven mprom/excavations setup:
// ║   1. Serve the Vite build (dist/) as the public site.
// ║   2. POST /api/lead — capture the contact form, sign it with the Connek
// ║      partner key (HMAC, server-side only), forward to the Connek API
// ║      (best-effort), AND send the notification emails directly via Resend so
// ║      a lead is NEVER lost. The partner SECRET never reaches the browser.
// ║   3. SPA fallback: any non-API route → dist/index.html.
// ║
// ║ Runs with PM2 on the VPS (port 3000, like the old SvelteKit site).
// ╚════════════════════════════════════════════════════════════════════════════
import 'dotenv/config';
import express from 'express';
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
app.use(express.json({ limit: '1mb' }));

// ─── Connek + Resend config (server-only) ───────────────────────────────────
const CONNEK_BASE = process.env.CONNEK_API_BASE_URL || 'https://api.dev.connek.ca';
const CONNEK_KEY_ID = process.env.CONNEK_API_KEY_ID || '';
const CONNEK_KEY_SECRET = process.env.CONNEK_API_KEY_SECRET || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const BUSINESS_NAME = process.env.BUSINESS_NAME || 'Mini Excavations Érable';
const BUSINESS_NOTIFY_EMAIL = process.env.BUSINESS_NOTIFY_EMAIL || '';
const FROM_ADDR = process.env.FROM_EMAIL || 'team@connek.ca';
const businessFrom = () => `${BUSINESS_NAME} <${FROM_ADDR}>`;
// api.dev.connek.ca (public-key) expone /v1/leads → crea el lead en Connek.
const SUBMISSION_PATH = '/v1/leads';

// HMAC: canonical = METHOD\nPATH\nUNIX_SECONDS\nSHA256_HEX(body)
function signConnek(method, signedPath, bodyStr) {
	const ts = Math.floor(Date.now() / 1000).toString();
	const bodySha = createHash('sha256').update(bodyStr, 'utf8').digest('hex');
	const canonical = `${method}\n${signedPath}\n${ts}\n${bodySha}`;
	const sig = createHmac('sha256', CONNEK_KEY_SECRET).update(canonical, 'utf8').digest('hex');
	return { 'X-Connek-Key-Id': CONNEK_KEY_ID, 'X-Connek-Timestamp': ts, 'X-Connek-Signature': sig };
}

async function sendViaResend({ to, subject, html, replyTo }) {
	const payload = { from: businessFrom(), to: Array.isArray(to) ? to : [to], subject, html };
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

// Sends client confirmation + business alert. Returns true if at least one sent.
async function sendLeadEmails(input, upstream) {
	if (!RESEND_API_KEY) {
		console.warn('[lead] RESEND_API_KEY no configurada — no se envía');
		return false;
	}
	const reference = upstream?.reference ?? upstream?.quote_number ?? '';
	const data = {
		client_first_name: String(input.name || '').trim().split(/\s+/)[0] || input.name,
		client_name: input.name,
		client_email: input.email,
		client_phone: input.phone,
		category: input.service,
		project_address: input.zone,
		project_description: input.message,
		reference
	};
	const jobs = [];
	if (input.email) {
		const r = renderSubmission('submission_client', data);
		jobs.push(
			sendViaResend({ to: input.email, subject: r.subject, html: r.html, replyTo: BUSINESS_NOTIFY_EMAIL || undefined })
				.then((id) => { console.log(`[lead] client=${input.email} ref=${reference} id=${id}`); return true; })
				.catch((e) => { console.error('[lead] client falló:', e?.message ?? e); return false; })
		);
	}
	if (BUSINESS_NOTIFY_EMAIL) {
		const r = renderSubmission('submission_business', data);
		jobs.push(
			sendViaResend({ to: BUSINESS_NOTIFY_EMAIL, subject: r.subject, html: r.html, replyTo: input.email || undefined })
				.then((id) => { console.log(`[lead] business=${BUSINESS_NOTIFY_EMAIL} ref=${reference} id=${id}`); return true; })
				.catch((e) => { console.error('[lead] business falló:', e?.message ?? e); return false; })
		);
	}
	const results = await Promise.all(jobs);
	return results.some(Boolean);
}

// ─── Lead form ──────────────────────────────────────────────────────────────
// Body from the React ContactForm: { name, phone, email, service, message, zone }
app.post('/api/lead', async (req, res) => {
	const input = req.body || {};
	const { name, phone, email, service, message, zone } = input;
	if (!name || (!email && !phone)) {
		return res.status(400).json({ error: 'missing_contact', message: 'name and (email or phone) required' });
	}

	// Compose a readable description (Connek requires min 5 chars).
	const descLines = [
		service ? `Service: ${service}` : null,
		zone ? `Zone: ${zone}` : null,
		message ? `Détails: ${message}` : null,
		phone ? `Téléphone: ${phone}` : null
	].filter(Boolean);
	let description = descLines.join('\n');
	if (description.length < 10) description = `${description} — demande web`;

	// Forward to Connek (best-effort — the email below is the guaranteed path).
	// The endpoint requires email + a 10-digit phone; skip the call otherwise.
	let upstream = null, upstreamOk = false, upstreamStatus = 0;
	const digits = String(phone || '').replace(/\D/g, '');
	if (CONNEK_KEY_ID && CONNEK_KEY_SECRET && email && digits.length >= 10) {
		const parts = String(name).trim().split(/\s+/);
		const firstName = parts.shift() || '';
		const lastName = parts.join(' ');
		const payload = {
			title: `Soumission web — ${service || 'Excavation'}`.slice(0, 200),
			description,
			first_name: firstName.length >= 2 ? firstName : String(name).trim(),
			last_name: lastName || undefined,
			email,
			phone: phone || undefined
		};
		const bodyStr = JSON.stringify(payload);
		try {
			const r = await fetch(`${CONNEK_BASE}${SUBMISSION_PATH}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', ...signConnek('POST', SUBMISSION_PATH, bodyStr) },
				body: bodyStr
			});
			upstreamStatus = r.status;
			const text = await r.text();
			try { upstream = JSON.parse(text); } catch { upstream = { raw: text }; }
			upstreamOk = r.ok;
		} catch (e) {
			upstream = { error: 'network_error', message: String(e) };
		}
	}

	// Guaranteed delivery — the business (+ client) get notified no matter what.
	const emailsSent = await sendLeadEmails(input, upstream);

	if (!upstreamOk && !emailsSent) {
		return res.status(upstreamStatus === 429 ? 429 : 502).json({ error: 'delivery_failed', status: upstreamStatus });
	}
	const leadId = upstream?.quote_id || upstream?.client_id;
	const ref = upstream?.reference || (leadId ? `MEE-${String(leadId).padStart(4, '0')}` : 'MEE-OK');
	return res.status(200).json({ ok: true, ref });
});

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

// ─── SEO : robots.txt + sitemap.xml (rutas explícitas, antes del SPA fallback) ─
const SITE = 'https://excavationserable.com';
const SERVICE_SLUGS = ['drain-francais', 'reparation-fissures', 'inspection-camera', 'impermeabilisation', 'excavation', 'demolition', 'egout-sanitaire'];
const CITY_SLUGS = ['montreal', 'laval', 'longueuil', 'brossard', 'saint-lambert', 'boucherville', 'varennes', 'repentigny', 'terrebonne', 'blainville', 'saint-jerome', 'boisbriand', 'sainte-therese', 'mirabel'];
const STATIC_PATHS = ['/', '/contact', '/portfolio', '/licences', '/zones', '/a-propos', '/politique-confidentialite', '/conditions'];

app.get('/robots.txt', (_req, res) => {
	res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (_req, res) => {
	const urls = [
		...STATIC_PATHS,
		...SERVICE_SLUGS.map((s) => `/services/${s}`),
		...CITY_SLUGS.map((c) => `/excavation/${c}`)
	];
	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		urls.map((u) => `  <url><loc>${SITE}${u}</loc><changefreq>weekly</changefreq></url>`).join('\n') +
		`\n</urlset>\n`;
	res.type('application/xml').send(body);
});

// ─── Static Vite build ──────────────────────────────────────────────────────
const buildDir = path.join(__dirname, 'dist');
const hasBuild = fs.existsSync(path.join(buildDir, 'index.html'));
if (hasBuild) {
	app.use(express.static(buildDir, { maxAge: isProd ? '7d' : 0, etag: true, index: ['index.html'] }));
	app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(path.join(buildDir, 'index.html')));
} else {
	app.get('/', (_req, res) =>
		res.status(503).type('html').send('<h1>Build missing</h1><p>Run <code>npm run build</code> first.</p>')
	);
}
app.use('/api', (_req, res) => res.status(404).json({ error: 'not_found' }));

const server = app.listen(PORT, HOST, () => {
	console.log(`🚜 excavationserable.com (${BUSINESS_NAME}) — listening on http://${HOST}:${PORT}`);
	console.log(`   Build: ${hasBuild ? 'OK' : 'MISSING'}`);
	console.log(`   Connek: ${CONNEK_BASE} ${CONNEK_KEY_ID ? '(keyed)' : '(NO KEY)'} · Resend: ${RESEND_API_KEY ? 'ON' : 'OFF'} · Notify: ${BUSINESS_NOTIFY_EMAIL || '(unset)'}`);
});

const shutdown = (sig) => { console.log(`Received ${sig}, shutting down...`); server.close(() => process.exit(0)); setTimeout(() => process.exit(1), 10000).unref(); };
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('unhandledRejection', (r) => console.error('[server] unhandledRejection:', r));
process.on('uncaughtException', (e) => console.error('[server] uncaughtException:', e));

export default app;
