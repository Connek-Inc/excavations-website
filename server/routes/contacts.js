// /api/contacts
//   POST   /        → public, create lead
//   GET    /        → admin only, list
//   GET    /:id     → admin only, one
//   PUT    /:id     → admin only, update status/notes
//   DELETE /:id     → admin only
import { Router } from 'express';
import { query, queryOne, execute } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

router.post('/', async (req, res, next) => {
	try {
		const c = req.body || {};
		if (!c.name || !c.email || !c.message) {
			return res.status(400).json({ ok: false, error: 'name, email, message required' });
		}
		const result = await execute(
			`INSERT INTO contacts
			 (name, email, phone, subject, message, service_type, preferred_date, language, source, ip_address, user_agent)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				String(c.name).slice(0, 100),
				String(c.email).slice(0, 255),
				c.phone ? String(c.phone).slice(0, 50) : null,
				c.subject ? String(c.subject).slice(0, 200) : null,
				String(c.message),
				c.service_type || null,
				c.preferred_date || null,
				c.language || 'fr',
				c.source || 'website',
				req.ip,
				(req.headers['user-agent'] || '').slice(0, 500)
			]
		);
		res.status(201).json({ ok: true, id: result.insertId });
	} catch (e) {
		next(e);
	}
});

router.get('/', requireAdmin, async (req, res, next) => {
	try {
		const status = req.query.status;
		const where = status ? 'WHERE status = ?' : '';
		const params = status ? [status] : [];
		const rows = await query(`SELECT * FROM contacts ${where} ORDER BY created_at DESC`, params);
		res.json({ ok: true, contacts: rows });
	} catch (e) {
		next(e);
	}
});

router.get('/:id', requireAdmin, async (req, res, next) => {
	try {
		const row = await queryOne(`SELECT * FROM contacts WHERE id = ?`, [req.params.id]);
		if (!row) return res.status(404).json({ ok: false, error: 'not found' });
		res.json({ ok: true, contact: row });
	} catch (e) {
		next(e);
	}
});

router.put('/:id', requireAdmin, async (req, res, next) => {
	try {
		const c = req.body || {};
		const existing = await queryOne(`SELECT id FROM contacts WHERE id = ?`, [req.params.id]);
		if (!existing) return res.status(404).json({ ok: false, error: 'not found' });
		await execute(
			`UPDATE contacts SET
			   status = COALESCE(?, status),
			   notes = ?,
			   service_type = ?
			 WHERE id = ?`,
			[c.status ?? null, c.notes ?? null, c.service_type ?? null, req.params.id]
		);
		const row = await queryOne(`SELECT * FROM contacts WHERE id = ?`, [req.params.id]);
		res.json({ ok: true, contact: row });
	} catch (e) {
		next(e);
	}
});

router.delete('/:id', requireAdmin, async (req, res, next) => {
	try {
		const result = await execute(`DELETE FROM contacts WHERE id = ?`, [req.params.id]);
		if (!result.affectedRows) return res.status(404).json({ ok: false, error: 'not found' });
		res.json({ ok: true });
	} catch (e) {
		next(e);
	}
});

export default router;
