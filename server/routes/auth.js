// POST /api/auth/login  → { email, password } → sets cookie, returns admin
// POST /api/auth/logout → clears cookie + deletes session
// GET  /api/auth/me     → current admin or 401
import { Router } from 'express';
import { queryOne, execute } from '../db.js';
import {
	comparePassword,
	createSession,
	signToken,
	setSessionCookie,
	clearSessionCookie,
	getAdminFromRequest,
	deleteSession,
	requireAdmin
} from '../auth.js';

const router = Router();

router.post('/login', async (req, res, next) => {
	try {
		const email = String(req.body?.email || '').trim().toLowerCase();
		const password = String(req.body?.password || '');
		if (!email || !password) {
			return res.status(400).json({ ok: false, error: 'email and password required' });
		}

		// soft brute-force throttle
		await new Promise((r) => setTimeout(r, 200));

		const admin = await queryOne(
			`SELECT id, email, password_hash, name, role, active FROM admins WHERE email = ?`,
			[email]
		);
		if (!admin || !admin.active) {
			return res.status(401).json({ ok: false, error: 'invalid credentials' });
		}

		const valid = await comparePassword(password, admin.password_hash);
		if (!valid) {
			return res.status(401).json({ ok: false, error: 'invalid credentials' });
		}

		const ip = req.ip;
		const ua = req.headers['user-agent'] || '';
		const { sessionId, expiresAt } = await createSession({ adminId: admin.id, ip, ua });
		const token = await signToken({
			sessionId,
			adminId: admin.id,
			email: admin.email,
			role: admin.role
		});
		setSessionCookie(res, token, expiresAt);

		execute(`UPDATE admins SET last_login_at = NOW() WHERE id = ?`, [admin.id]).catch(() => {});

		res.json({
			ok: true,
			admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
		});
	} catch (e) {
		next(e);
	}
});

router.post('/logout', async (req, res, next) => {
	try {
		const admin = await getAdminFromRequest(req);
		if (admin) await deleteSession(admin.sessionId);
		clearSessionCookie(res);
		res.json({ ok: true });
	} catch (e) {
		next(e);
	}
});

router.get('/me', requireAdmin, (req, res) => {
	res.json({ ok: true, admin: req.admin });
});

export default router;
