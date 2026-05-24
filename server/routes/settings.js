// /api/settings — KV store. Public can read; admin can write.
// GET  /          → list all
// GET  /:key      → one value
// PUT  /:key      → admin only, upsert
// DELETE /:key    → admin only
import { Router } from 'express';
import { query, queryOne, execute } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

router.get('/', async (_req, res, next) => {
	try {
		const rows = await query(`SELECT setting_key, value, value_json FROM settings`);
		const out = {};
		for (const r of rows) {
			out[r.setting_key] = r.value_json ?? r.value;
		}
		res.json({ ok: true, settings: out });
	} catch (e) {
		next(e);
	}
});

router.get('/:key', async (req, res, next) => {
	try {
		const row = await queryOne(
			`SELECT setting_key, value, value_json FROM settings WHERE setting_key = ?`,
			[req.params.key]
		);
		if (!row) return res.status(404).json({ ok: false, error: 'not found' });
		res.json({ ok: true, key: row.setting_key, value: row.value_json ?? row.value });
	} catch (e) {
		next(e);
	}
});

router.put('/:key', requireAdmin, async (req, res, next) => {
	try {
		const v = req.body?.value;
		const isObj = v !== null && typeof v === 'object';
		await execute(
			`INSERT INTO settings (setting_key, value, value_json) VALUES (?, ?, ?)
			 ON DUPLICATE KEY UPDATE value = VALUES(value), value_json = VALUES(value_json)`,
			[req.params.key, isObj ? null : (v != null ? String(v) : null), isObj ? JSON.stringify(v) : null]
		);
		res.json({ ok: true, key: req.params.key, value: v });
	} catch (e) {
		next(e);
	}
});

router.delete('/:key', requireAdmin, async (req, res, next) => {
	try {
		await execute(`DELETE FROM settings WHERE setting_key = ?`, [req.params.key]);
		res.json({ ok: true });
	} catch (e) {
		next(e);
	}
});

export default router;
