import { Router } from 'express';
import { query, queryOne, execute } from '../db.js';
import { getAdminFromRequest, requireAdmin } from '../auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
	try {
		const admin = await getAdminFromRequest(req);
		const onlyFeatured = req.query.featured === '1';
		const where = admin
			? onlyFeatured
				? 'WHERE featured = 1'
				: ''
			: 'WHERE featured = 1';
		const rows = await query(`SELECT * FROM reviews ${where} ORDER BY published_at DESC`);
		res.json({ ok: true, reviews: rows });
	} catch (e) {
		next(e);
	}
});

router.post('/', requireAdmin, async (req, res, next) => {
	try {
		const r = req.body || {};
		const result = await execute(
			`INSERT INTO reviews
			 (author_name, author_city, rating, text_fr, text_en, text_es, service_type, verified, featured)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				r.author_name,
				r.author_city || null,
				Number(r.rating) || 5,
				r.text_fr || '',
				r.text_en || null,
				r.text_es || null,
				r.service_type || null,
				r.verified ? 1 : 0,
				r.featured ? 1 : 0
			]
		);
		const row = await queryOne(`SELECT * FROM reviews WHERE id = ?`, [result.insertId]);
		res.status(201).json({ ok: true, review: row });
	} catch (e) {
		next(e);
	}
});

router.put('/:id', requireAdmin, async (req, res, next) => {
	try {
		const r = req.body || {};
		const existing = await queryOne(`SELECT id FROM reviews WHERE id = ?`, [req.params.id]);
		if (!existing) return res.status(404).json({ ok: false, error: 'not found' });
		await execute(
			`UPDATE reviews SET
			   author_name = COALESCE(?, author_name),
			   author_city = ?,
			   rating = COALESCE(?, rating),
			   text_fr = COALESCE(?, text_fr),
			   text_en = ?, text_es = ?,
			   service_type = ?,
			   verified = ?, featured = ?
			 WHERE id = ?`,
			[
				r.author_name ?? null,
				r.author_city ?? null,
				r.rating ?? null,
				r.text_fr ?? null,
				r.text_en ?? null,
				r.text_es ?? null,
				r.service_type ?? null,
				r.verified ? 1 : 0,
				r.featured ? 1 : 0,
				req.params.id
			]
		);
		const row = await queryOne(`SELECT * FROM reviews WHERE id = ?`, [req.params.id]);
		res.json({ ok: true, review: row });
	} catch (e) {
		next(e);
	}
});

router.delete('/:id', requireAdmin, async (req, res, next) => {
	try {
		const result = await execute(`DELETE FROM reviews WHERE id = ?`, [req.params.id]);
		if (!result.affectedRows) return res.status(404).json({ ok: false, error: 'not found' });
		res.json({ ok: true });
	} catch (e) {
		next(e);
	}
});

export default router;
