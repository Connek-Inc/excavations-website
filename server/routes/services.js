import { Router } from 'express';
import { query, queryOne, execute } from '../db.js';
import { getAdminFromRequest, requireAdmin } from '../auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const admin = await getAdminFromRequest(req);
		const where = admin ? '' : 'WHERE active = 1';
		const rows = await query(
			`SELECT * FROM services ${where} ORDER BY order_index ASC, id ASC`
		);
		res.json({ ok: true, services: rows });
	} catch (e) {
		next(e);
	}
});

router.get('/:slug', async (req, res, next) => {
	try {
		const admin = await getAdminFromRequest(req);
		const where = admin ? 'WHERE slug = ?' : 'WHERE slug = ? AND active = 1';
		const row = await queryOne(`SELECT * FROM services ${where}`, [req.params.slug]);
		if (!row) return res.status(404).json({ ok: false, error: 'not found' });
		res.json({ ok: true, service: row });
	} catch (e) {
		next(e);
	}
});

router.post('/', requireAdmin, async (req, res, next) => {
	try {
		const s = req.body || {};
		const result = await execute(
			`INSERT INTO services
			 (slug, title_fr, title_en, title_es, description_fr, description_en, description_es,
			  icon, image, price_from_cad, price_to_cad, featured, active, order_index)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				s.slug,
				s.title_fr, s.title_en || null, s.title_es || null,
				s.description_fr || '', s.description_en || null, s.description_es || null,
				s.icon || null, s.image || null,
				s.price_from_cad ?? null, s.price_to_cad ?? null,
				s.featured ? 1 : 0, s.active === false ? 0 : 1, s.order_index ?? 0
			]
		);
		const row = await queryOne(`SELECT * FROM services WHERE id = ?`, [result.insertId]);
		res.status(201).json({ ok: true, service: row });
	} catch (e) {
		if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'slug already exists' });
		next(e);
	}
});

router.put('/:id', requireAdmin, async (req, res, next) => {
	try {
		const s = req.body || {};
		const existing = await queryOne(`SELECT id FROM services WHERE id = ?`, [req.params.id]);
		if (!existing) return res.status(404).json({ ok: false, error: 'not found' });
		await execute(
			`UPDATE services SET
			   slug = COALESCE(?, slug),
			   title_fr = COALESCE(?, title_fr), title_en = ?, title_es = ?,
			   description_fr = COALESCE(?, description_fr), description_en = ?, description_es = ?,
			   icon = ?, image = ?, price_from_cad = ?, price_to_cad = ?,
			   featured = ?, active = ?, order_index = ?
			 WHERE id = ?`,
			[
				s.slug ?? null,
				s.title_fr ?? null, s.title_en ?? null, s.title_es ?? null,
				s.description_fr ?? null, s.description_en ?? null, s.description_es ?? null,
				s.icon ?? null, s.image ?? null, s.price_from_cad ?? null, s.price_to_cad ?? null,
				s.featured ? 1 : 0, s.active === false ? 0 : 1, s.order_index ?? 0,
				req.params.id
			]
		);
		const row = await queryOne(`SELECT * FROM services WHERE id = ?`, [req.params.id]);
		res.json({ ok: true, service: row });
	} catch (e) {
		next(e);
	}
});

router.delete('/:id', requireAdmin, async (req, res, next) => {
	try {
		const result = await execute(`DELETE FROM services WHERE id = ?`, [req.params.id]);
		if (!result.affectedRows) return res.status(404).json({ ok: false, error: 'not found' });
		res.json({ ok: true });
	} catch (e) {
		next(e);
	}
});

export default router;
