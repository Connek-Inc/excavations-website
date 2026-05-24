// /api/soumissions
//   POST   /                   → public, create + email admin/client
//   GET    /                   → admin, list
//   GET    /:id                → admin (by uuid) — full details + offers
//   GET    /token/:token       → public, lookup by client_token (for the customer-facing page)
//   PUT    /:id                → admin, update fields/status/articles/totals
//   POST   /:id/offer          → admin, add an offer entry (creates row in soumission_offers)
//   POST   /:id/counter        → public via token, client counter-offer
//   POST   /:id/sign-client    → public via token, save client signature
//   POST   /:id/sign-admin     → admin, save admin signature
//   DELETE /:id                → admin
import { Router } from 'express';
import crypto from 'node:crypto';
import { query, queryOne, execute } from '../db.js';
import { requireAdmin } from '../auth.js';
import { sendSoumissionEmails } from '../email.js';

const router = Router();

function uuid() {
	return crypto.randomUUID();
}
function token() {
	return crypto.randomBytes(24).toString('hex');
}
function jsonOrNull(v) {
	if (v === null || v === undefined) return null;
	if (typeof v === 'string') return v;
	try {
		return JSON.stringify(v);
	} catch {
		return null;
	}
}

async function loadOffers(soumissionId) {
	return await query(
		`SELECT * FROM soumission_offers WHERE soumission_id = ? ORDER BY version_num ASC, id ASC`,
		[soumissionId]
	);
}

// ── create (public) ────────────────────────────────────────────────────────
router.post('/', async (req, res, next) => {
	try {
		const s = req.body || {};
		if (!s.client_nom || !s.client_email || !s.projet_description) {
			return res.status(400).json({ ok: false, error: 'client_nom, client_email, projet_description required' });
		}
		const id = uuid();
		const tk = token();
		await execute(
			`INSERT INTO soumissions
			 (id, client_token, client_nom, client_email, client_telephone, client_adresse, projet_adresse,
			  projet_type, projet_description, notes_client, source, lang, ip_address, user_agent)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				id, tk,
				String(s.client_nom).slice(0, 200),
				String(s.client_email).slice(0, 255),
				s.client_telephone ? String(s.client_telephone).slice(0, 50) : null,
				s.client_adresse ? String(s.client_adresse).slice(0, 255) : null,
				s.projet_adresse ? String(s.projet_adresse).slice(0, 255) : null,
				s.projet_type || null,
				String(s.projet_description),
				s.notes_client || null,
				s.source === 'urgences-form' ? 'urgences-form' : 'public-form',
				s.lang || 'fr',
				req.ip,
				(req.headers['user-agent'] || '').slice(0, 500)
			]
		);
		const row = await queryOne(`SELECT * FROM soumissions WHERE id = ?`, [id]);

		// fire-and-forget email (don't block response on Resend latency)
		const origin = `${req.protocol}://${req.get('host')}`;
		sendSoumissionEmails(
			{ ...row, niveau_urgence: s.niveau_urgence },
			origin
		).then((r) => {
			if (!r.admin?.ok) console.warn('[soumissions] admin email failed:', r.admin?.error);
			if (!r.client?.ok && row.client_email) console.warn('[soumissions] client email failed:', r.client?.error);
		}).catch((e) => console.warn('[soumissions] email crashed:', e?.message || e));

		res.status(201).json({ ok: true, soumission: row, client_url: `/soumission/${tk}` });
	} catch (e) {
		next(e);
	}
});

// ── admin list ─────────────────────────────────────────────────────────────
router.get('/', requireAdmin, async (req, res, next) => {
	try {
		const status = req.query.status;
		const where = status ? 'WHERE status = ?' : '';
		const params = status ? [status] : [];
		const rows = await query(
			`SELECT * FROM soumissions ${where} ORDER BY created_at DESC`,
			params
		);
		res.json({ ok: true, soumissions: rows });
	} catch (e) {
		next(e);
	}
});

// ── admin single (with offers) ─────────────────────────────────────────────
router.get('/:id', requireAdmin, async (req, res, next) => {
	try {
		const row = await queryOne(`SELECT * FROM soumissions WHERE id = ?`, [req.params.id]);
		if (!row) return res.status(404).json({ ok: false, error: 'not found' });
		const offers = await loadOffers(row.id);
		res.json({ ok: true, soumission: row, offers });
	} catch (e) {
		next(e);
	}
});

// ── public lookup by token ─────────────────────────────────────────────────
router.get('/token/:token', async (req, res, next) => {
	try {
		const row = await queryOne(`SELECT * FROM soumissions WHERE client_token = ?`, [req.params.token]);
		if (!row) return res.status(404).json({ ok: false, error: 'not found' });
		const offers = await loadOffers(row.id);
		// strip internal admin-only fields for safety
		delete row.ip_address;
		delete row.user_agent;
		delete row.admin_notes;
		res.json({ ok: true, soumission: row, offers });
	} catch (e) {
		next(e);
	}
});

// ── admin update ───────────────────────────────────────────────────────────
router.put('/:id', requireAdmin, async (req, res, next) => {
	try {
		const s = req.body || {};
		const existing = await queryOne(`SELECT id FROM soumissions WHERE id = ?`, [req.params.id]);
		if (!existing) return res.status(404).json({ ok: false, error: 'not found' });
		await execute(
			`UPDATE soumissions SET
			   status = COALESCE(?, status),
			   admin_notes = ?,
			   numero = ?,
			   date_soumission = ?,
			   sous_total_cents = COALESCE(?, sous_total_cents),
			   tps_cents = COALESCE(?, tps_cents),
			   tvq_cents = COALESCE(?, tvq_cents),
			   total_cents = COALESCE(?, total_cents),
			   articles = ?,
			   modalites = ?,
			   sections = ?,
			   expire_le = ?,
			   projet_type = COALESCE(?, projet_type),
			   projet_description = COALESCE(?, projet_description),
			   projet_adresse = ?,
			   notes_client = ?
			 WHERE id = ?`,
			[
				s.status ?? null,
				s.admin_notes ?? null,
				s.numero ?? null,
				s.date_soumission ?? null,
				s.sous_total_cents ?? null,
				s.tps_cents ?? null,
				s.tvq_cents ?? null,
				s.total_cents ?? null,
				jsonOrNull(s.articles),
				jsonOrNull(s.modalites),
				jsonOrNull(s.sections),
				s.expire_le ?? null,
				s.projet_type ?? null,
				s.projet_description ?? null,
				s.projet_adresse ?? null,
				s.notes_client ?? null,
				req.params.id
			]
		);
		const row = await queryOne(`SELECT * FROM soumissions WHERE id = ?`, [req.params.id]);
		res.json({ ok: true, soumission: row });
	} catch (e) {
		next(e);
	}
});

// ── admin offer ────────────────────────────────────────────────────────────
router.post('/:id/offer', requireAdmin, async (req, res, next) => {
	try {
		const o = req.body || {};
		const existing = await queryOne(`SELECT id FROM soumissions WHERE id = ?`, [req.params.id]);
		if (!existing) return res.status(404).json({ ok: false, error: 'not found' });
		const last = await queryOne(
			`SELECT MAX(version_num) AS v FROM soumission_offers WHERE soumission_id = ?`,
			[req.params.id]
		);
		const versionNum = (last?.v ?? 0) + 1;
		const result = await execute(
			`INSERT INTO soumission_offers
			 (soumission_id, version_num, from_role, offer_type, amount_cents, payment_terms, deadline, notes, articles)
			 VALUES (?, ?, 'admin', ?, ?, ?, ?, ?, ?)`,
			[
				req.params.id, versionNum,
				o.offer_type || 'offer',
				o.amount_cents ?? null,
				o.payment_terms || null,
				o.deadline || null,
				o.notes || null,
				jsonOrNull(o.articles)
			]
		);
		// auto-set status to 'offerte' if first offer
		await execute(
			`UPDATE soumissions SET status = CASE WHEN status IN ('nouvelle','en_revision') THEN 'offerte' ELSE status END WHERE id = ?`,
			[req.params.id]
		);
		const row = await queryOne(`SELECT * FROM soumission_offers WHERE id = ?`, [result.insertId]);
		res.status(201).json({ ok: true, offer: row });
	} catch (e) {
		next(e);
	}
});

// ── client counter-offer (public via token) ────────────────────────────────
router.post('/token/:token/counter', async (req, res, next) => {
	try {
		const o = req.body || {};
		const soumission = await queryOne(`SELECT id FROM soumissions WHERE client_token = ?`, [req.params.token]);
		if (!soumission) return res.status(404).json({ ok: false, error: 'not found' });
		const last = await queryOne(
			`SELECT MAX(version_num) AS v FROM soumission_offers WHERE soumission_id = ?`,
			[soumission.id]
		);
		const versionNum = (last?.v ?? 0) + 1;
		const offerType = o.offer_type === 'accept' ? 'accept' : o.offer_type === 'reject' ? 'reject' : 'counter-offer';
		const result = await execute(
			`INSERT INTO soumission_offers
			 (soumission_id, version_num, from_role, offer_type, amount_cents, payment_terms, deadline, notes, articles)
			 VALUES (?, ?, 'client', ?, ?, ?, ?, ?, ?)`,
			[
				soumission.id, versionNum, offerType,
				o.amount_cents ?? null,
				o.payment_terms || null,
				o.deadline || null,
				o.notes || null,
				jsonOrNull(o.articles)
			]
		);
		// status transitions
		const nextStatus = offerType === 'accept' ? 'acceptee' : offerType === 'reject' ? 'rejetee' : 'contre_offre';
		await execute(`UPDATE soumissions SET status = ? WHERE id = ?`, [nextStatus, soumission.id]);
		const row = await queryOne(`SELECT * FROM soumission_offers WHERE id = ?`, [result.insertId]);
		res.status(201).json({ ok: true, offer: row, status: nextStatus });
	} catch (e) {
		next(e);
	}
});

// ── client signature (public via token) ────────────────────────────────────
router.post('/token/:token/sign-client', async (req, res, next) => {
	try {
		const { signature, nom } = req.body || {};
		if (!signature || !nom) return res.status(400).json({ ok: false, error: 'signature and nom required' });
		const soumission = await queryOne(`SELECT id, signature_admin FROM soumissions WHERE client_token = ?`, [req.params.token]);
		if (!soumission) return res.status(404).json({ ok: false, error: 'not found' });
		const nextStatus = soumission.signature_admin ? 'signee_par_les_deux' : 'acceptee';
		await execute(
			`UPDATE soumissions SET signature_client = ?, signature_client_nom = ?, signature_client_at = NOW(), status = ? WHERE id = ?`,
			[signature, nom, nextStatus, soumission.id]
		);
		res.json({ ok: true, status: nextStatus });
	} catch (e) {
		next(e);
	}
});

// ── admin signature ────────────────────────────────────────────────────────
router.post('/:id/sign-admin', requireAdmin, async (req, res, next) => {
	try {
		const { signature, nom } = req.body || {};
		if (!signature || !nom) return res.status(400).json({ ok: false, error: 'signature and nom required' });
		const soumission = await queryOne(`SELECT id, signature_client FROM soumissions WHERE id = ?`, [req.params.id]);
		if (!soumission) return res.status(404).json({ ok: false, error: 'not found' });
		const nextStatus = soumission.signature_client ? 'signee_par_les_deux' : 'acceptee';
		await execute(
			`UPDATE soumissions SET signature_admin = ?, signature_admin_nom = ?, signature_admin_at = NOW(), status = ? WHERE id = ?`,
			[signature, nom, nextStatus, req.params.id]
		);
		res.json({ ok: true, status: nextStatus });
	} catch (e) {
		next(e);
	}
});

// ── delete ─────────────────────────────────────────────────────────────────
router.delete('/:id', requireAdmin, async (req, res, next) => {
	try {
		const result = await execute(`DELETE FROM soumissions WHERE id = ?`, [req.params.id]);
		if (!result.affectedRows) return res.status(404).json({ ok: false, error: 'not found' });
		res.json({ ok: true });
	} catch (e) {
		next(e);
	}
});

export default router;
