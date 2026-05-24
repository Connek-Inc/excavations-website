// /api/analytics
//   POST /track     → public, log a page view (called from beacon.ts on every page load)
//   GET  /summary   → admin, dashboard stats (today + last 30 days)
//   GET  /pages     → admin, top pages last 30 days
//   GET  /referrers → admin, top referrers last 30 days
//   GET  /countries → admin, geo breakdown last 30 days
import { Router } from 'express';
import crypto from 'node:crypto';
import { query, queryOne, execute } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

function hash(s) {
	return crypto.createHash('sha1').update(String(s || '')).digest('hex');
}

function detectDevice(ua) {
	const u = String(ua || '').toLowerCase();
	if (!u) return 'other';
	if (/bot|spider|crawler|slurp|search/.test(u)) return 'bot';
	if (/tablet|ipad/.test(u)) return 'tablet';
	if (/mobile|android|iphone|ipod/.test(u)) return 'mobile';
	return 'desktop';
}

// ── beacon: log a page view ────────────────────────────────────────────────
router.post('/track', async (req, res) => {
	try {
		const { path, referrer, language, country_code } = req.body || {};
		if (!path || typeof path !== 'string' || path.length > 500) {
			return res.status(400).json({ ok: false, error: 'invalid path' });
		}
		const ua = req.headers['user-agent'] || '';
		const device = detectDevice(ua);
		if (device === 'bot') return res.json({ ok: true, skipped: 'bot' });

		// visitor_id from a cookie if present, else from ip+ua hash (no PII stored)
		let visitorId = req.cookies?.mi_vid;
		if (!visitorId) {
			visitorId = hash(`${req.ip}|${ua}|${new Date().toISOString().slice(0, 10)}`);
			res.cookie('mi_vid', visitorId, {
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				maxAge: 1000 * 60 * 60 * 24 * 365
			});
		}

		await execute(
			`INSERT INTO page_views
			 (path, referrer, user_agent_hash, visitor_id, language, country_code, device)
			 VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				path.slice(0, 500),
				referrer ? String(referrer).slice(0, 500) : null,
				hash(ua),
				visitorId,
				language ? String(language).slice(0, 5) : null,
				country_code ? String(country_code).slice(0, 2) : null,
				device
			]
		);
		res.json({ ok: true });
	} catch (e) {
		// never error on analytics — silently swallow
		res.json({ ok: false, error: 'logged' });
	}
});

// ── admin summary ──────────────────────────────────────────────────────────
router.get('/summary', requireAdmin, async (_req, res, next) => {
	try {
		const [today, last30, soumissionsToday, contactsToday, soumissions30, contacts30, daily] = await Promise.all([
			queryOne(`SELECT
			   COUNT(*) AS pageviews,
			   COUNT(DISTINCT visitor_id) AS visitors
			 FROM page_views WHERE DATE(created_at) = CURDATE()`),
			queryOne(`SELECT
			   COUNT(*) AS pageviews,
			   COUNT(DISTINCT visitor_id) AS visitors
			 FROM page_views WHERE created_at >= NOW() - INTERVAL 30 DAY`),
			queryOne(`SELECT COUNT(*) AS n FROM soumissions WHERE DATE(created_at) = CURDATE()`),
			queryOne(`SELECT COUNT(*) AS n FROM contacts WHERE DATE(created_at) = CURDATE()`),
			queryOne(`SELECT COUNT(*) AS n FROM soumissions WHERE created_at >= NOW() - INTERVAL 30 DAY`),
			queryOne(`SELECT COUNT(*) AS n FROM contacts WHERE created_at >= NOW() - INTERVAL 30 DAY`),
			query(`SELECT DATE(created_at) AS day, COUNT(*) AS pageviews, COUNT(DISTINCT visitor_id) AS visitors
			 FROM page_views WHERE created_at >= NOW() - INTERVAL 30 DAY
			 GROUP BY DATE(created_at) ORDER BY day ASC`)
		]);
		res.json({
			ok: true,
			today: {
				pageviews: today?.pageviews ?? 0,
				visitors: today?.visitors ?? 0,
				soumissions: soumissionsToday?.n ?? 0,
				contacts: contactsToday?.n ?? 0
			},
			last30: {
				pageviews: last30?.pageviews ?? 0,
				visitors: last30?.visitors ?? 0,
				soumissions: soumissions30?.n ?? 0,
				contacts: contacts30?.n ?? 0
			},
			daily
		});
	} catch (e) {
		next(e);
	}
});

router.get('/pages', requireAdmin, async (_req, res, next) => {
	try {
		const rows = await query(
			`SELECT path, COUNT(*) AS hits, COUNT(DISTINCT visitor_id) AS visitors
			 FROM page_views WHERE created_at >= NOW() - INTERVAL 30 DAY
			 GROUP BY path ORDER BY hits DESC LIMIT 20`
		);
		res.json({ ok: true, pages: rows });
	} catch (e) {
		next(e);
	}
});

router.get('/referrers', requireAdmin, async (_req, res, next) => {
	try {
		const rows = await query(
			`SELECT COALESCE(NULLIF(referrer, ''), '(direct)') AS referrer, COUNT(*) AS hits
			 FROM page_views WHERE created_at >= NOW() - INTERVAL 30 DAY
			 GROUP BY referrer ORDER BY hits DESC LIMIT 20`
		);
		res.json({ ok: true, referrers: rows });
	} catch (e) {
		next(e);
	}
});

router.get('/countries', requireAdmin, async (_req, res, next) => {
	try {
		const rows = await query(
			`SELECT COALESCE(country_code, '??') AS country_code, COUNT(*) AS hits, COUNT(DISTINCT visitor_id) AS visitors
			 FROM page_views WHERE created_at >= NOW() - INTERVAL 30 DAY
			 GROUP BY country_code ORDER BY hits DESC LIMIT 20`
		);
		res.json({ ok: true, countries: rows });
	} catch (e) {
		next(e);
	}
});

router.get('/devices', requireAdmin, async (_req, res, next) => {
	try {
		const rows = await query(
			`SELECT COALESCE(device, 'other') AS device, COUNT(*) AS hits
			 FROM page_views WHERE created_at >= NOW() - INTERVAL 30 DAY
			 GROUP BY device ORDER BY hits DESC`
		);
		res.json({ ok: true, devices: rows });
	} catch (e) {
		next(e);
	}
});

export default router;
