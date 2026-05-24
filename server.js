// ╔════════════════════════════════════════════════════════════════════════════
// ║ Express server for excavationserable.com
// ║ Pattern intentionally identical to ~/app/server.js (elcarajoese) so
// ║ Hostinger LSAPI lsnode.js can load it (no top-level await, plain ESM).
// ║
// ║ Responsibilities:
// ║   - Serve SvelteKit static build (build/) as the public site
// ║   - Expose JSON API at /api/* for admin + soumissions + analytics
// ║   - Talk to Hostinger MySQL via mysql2/promise
// ║   - Send emails via Resend (server-side fetch with API key)
// ╚════════════════════════════════════════════════════════════════════════════
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import authRouter from './server/routes/auth.js';
import blogsRouter from './server/routes/blogs.js';
import servicesRouter from './server/routes/services.js';
import reviewsRouter from './server/routes/reviews.js';
import settingsRouter from './server/routes/settings.js';
import contactsRouter from './server/routes/contacts.js';
import soumissionsRouter from './server/routes/soumissions.js';
import analyticsRouter from './server/routes/analytics.js';
import pingRouter from './server/routes/ping.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

app.use(
	helmet({
		contentSecurityPolicy: false,
		crossOriginEmbedderPolicy: false
	})
);
app.use(compression());
app.use(cookieParser(process.env.JWT_SECRET || 'dev-secret'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(morgan(isProd ? 'combined' : 'dev'));

const allowed = (process.env.ALLOWED_ORIGINS || `https://excavationserable.com,http://localhost:5173,http://localhost:4173`).split(',').map((s) => s.trim());
app.use(
	cors({
		credentials: true,
		origin(origin, cb) {
			if (!origin || allowed.includes('*') || allowed.includes(origin)) return cb(null, true);
			return cb(new Error(`CORS blocked: ${origin}`));
		}
	})
);

// Soft global rate limit
app.use(
	'/api/',
	rateLimit({
		windowMs: 60 * 1000,
		max: 240,
		standardHeaders: true,
		legacyHeaders: false
	})
);

// ─── Health & diagnostics ───────────────────────────────────────────────────
app.use('/api/ping', pingRouter);

// ─── API routes ─────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/soumissions', soumissionsRouter);
app.use('/api/analytics', analyticsRouter);

// ─── Static SvelteKit build (frontend) ──────────────────────────────────────
const buildDir = path.join(__dirname, 'build');
const hasBuild = fs.existsSync(path.join(buildDir, 'index.html')) || fs.existsSync(path.join(buildDir, '200.html'));

if (hasBuild) {
	app.use(
		express.static(buildDir, {
			maxAge: isProd ? '7d' : 0,
			etag: true,
			index: ['index.html']
		})
	);

	// SPA fallback for any non-API route — serve 200.html
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

// ─── Error handlers ─────────────────────────────────────────────────────────
app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'not found' }));

app.use((err, _req, res, _next) => {
	console.error('[server] error:', err);
	res.status(err.status || 500).json({
		ok: false,
		error: err.message || 'Server error'
	});
});

// ─── Boot ────────────────────────────────────────────────────────────────────
const server = app.listen(PORT, HOST, () => {
	console.log(`🚀 Mini Excavations Érable — Express listening on http://${HOST}:${PORT}`);
	console.log(`   Build: ${hasBuild ? 'OK' : 'MISSING (run npm run build)'}`);
	console.log(`   DB host: ${process.env.DB_HOST || '(not set)'}`);
	console.log(`   Resend: ${process.env.RESEND ? 'configured' : 'NOT SET'}`);
});

const shutdown = (signal) => {
	console.log(`Received ${signal}, shutting down...`);
	server.close(() => process.exit(0));
	setTimeout(() => process.exit(1), 10000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Don't let a stray promise rejection from a misbehaving handler tear down
// the whole Node app on Hostinger LSAPI — log and keep serving.
process.on('unhandledRejection', (reason) => {
	console.error('[server] unhandledRejection:', reason);
});
process.on('uncaughtException', (err) => {
	console.error('[server] uncaughtException:', err);
});

export default app;
