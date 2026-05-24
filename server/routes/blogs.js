// /api/blogs
//   GET    /            → list (public sees only published; admin sees all)
//   GET    /:slug       → single by slug (public published; admin any)
//   POST   /            → admin only, create
//   PUT    /:id         → admin only, update
//   DELETE /:id         → admin only
//   POST   /:id/publish → admin only, toggle published
import { Router } from 'express';
import { query, queryOne, execute } from '../db.js';
import { getAdminFromRequest, requireAdmin } from '../auth.js';

const router = Router();

function tagsToJson(t) {
	if (!t) return null;
	if (Array.isArray(t)) return JSON.stringify(t);
	if (typeof t === 'string') return JSON.stringify(t.split(',').map((s) => s.trim()).filter(Boolean));
	return null;
}

router.get('/', async (req, res, next) => {
	try {
		const admin = await getAdminFromRequest(req);
		const where = admin ? '' : 'WHERE published = 1';
		const rows = await query(`SELECT * FROM blogs ${where} ORDER BY published_at DESC, updated_at DESC`);
		res.json({ ok: true, blogs: rows });
	} catch (e) {
		next(e);
	}
});

router.get('/:slug', async (req, res, next) => {
	try {
		const admin = await getAdminFromRequest(req);
		const where = admin ? 'WHERE slug = ?' : 'WHERE slug = ? AND published = 1';
		const row = await queryOne(`SELECT * FROM blogs ${where}`, [req.params.slug]);
		if (!row) return res.status(404).json({ ok: false, error: 'not found' });
		// non-blocking view increment for published posts (public reads)
		if (!admin) execute(`UPDATE blogs SET views = views + 1 WHERE id = ?`, [row.id]).catch(() => {});
		res.json({ ok: true, blog: row });
	} catch (e) {
		next(e);
	}
});

router.post('/', requireAdmin, async (req, res, next) => {
	try {
		const b = req.body || {};
		const result = await execute(
			`INSERT INTO blogs
			 (slug, title_fr, title_en, title_es, excerpt_fr, excerpt_en, excerpt_es,
			  content_fr, content_en, content_es, cover_image, meta_title, meta_description,
			  meta_keywords, category, tags, published, published_at, author_id)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				b.slug,
				b.title_fr, b.title_en || null, b.title_es || null,
				b.excerpt_fr || null, b.excerpt_en || null, b.excerpt_es || null,
				b.content_fr || '', b.content_en || null, b.content_es || null,
				b.cover_image || null, b.meta_title || null, b.meta_description || null,
				b.meta_keywords || null, b.category || null, tagsToJson(b.tags),
				b.published ? 1 : 0, b.published ? new Date() : null, req.admin.id
			]
		);
		const row = await queryOne(`SELECT * FROM blogs WHERE id = ?`, [result.insertId]);
		res.status(201).json({ ok: true, blog: row });
	} catch (e) {
		if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'slug already exists' });
		next(e);
	}
});

router.put('/:id', requireAdmin, async (req, res, next) => {
	try {
		const b = req.body || {};
		const existing = await queryOne(`SELECT id, published FROM blogs WHERE id = ?`, [req.params.id]);
		if (!existing) return res.status(404).json({ ok: false, error: 'not found' });

		const publishedAt = b.published && !existing.published ? new Date() : undefined;
		await execute(
			`UPDATE blogs SET
			   slug = COALESCE(?, slug),
			   title_fr = COALESCE(?, title_fr), title_en = ?, title_es = ?,
			   excerpt_fr = ?, excerpt_en = ?, excerpt_es = ?,
			   content_fr = COALESCE(?, content_fr), content_en = ?, content_es = ?,
			   cover_image = ?, meta_title = ?, meta_description = ?, meta_keywords = ?,
			   category = ?, tags = ?, published = ?,
			   published_at = COALESCE(?, published_at)
			 WHERE id = ?`,
			[
				b.slug ?? null,
				b.title_fr ?? null, b.title_en ?? null, b.title_es ?? null,
				b.excerpt_fr ?? null, b.excerpt_en ?? null, b.excerpt_es ?? null,
				b.content_fr ?? null, b.content_en ?? null, b.content_es ?? null,
				b.cover_image ?? null, b.meta_title ?? null, b.meta_description ?? null,
				b.meta_keywords ?? null, b.category ?? null, tagsToJson(b.tags),
				b.published ? 1 : 0,
				publishedAt ?? null,
				req.params.id
			]
		);
		const row = await queryOne(`SELECT * FROM blogs WHERE id = ?`, [req.params.id]);
		res.json({ ok: true, blog: row });
	} catch (e) {
		if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'slug already exists' });
		next(e);
	}
});

router.post('/:id/publish', requireAdmin, async (req, res, next) => {
	try {
		const row = await queryOne(`SELECT published FROM blogs WHERE id = ?`, [req.params.id]);
		if (!row) return res.status(404).json({ ok: false, error: 'not found' });
		const next_pub = row.published ? 0 : 1;
		await execute(
			`UPDATE blogs SET published = ?, published_at = COALESCE(published_at, NOW()) WHERE id = ?`,
			[next_pub, req.params.id]
		);
		res.json({ ok: true, published: !!next_pub });
	} catch (e) {
		next(e);
	}
});

router.delete('/:id', requireAdmin, async (req, res, next) => {
	try {
		const result = await execute(`DELETE FROM blogs WHERE id = ?`, [req.params.id]);
		if (!result.affectedRows) return res.status(404).json({ ok: false, error: 'not found' });
		res.json({ ok: true });
	} catch (e) {
		next(e);
	}
});

export default router;
