// JWT-based auth for the admin panel.
// Sessions live in MySQL (`sessions` table) and a signed JWT cookie
// `mi_admin_session` binds the session id to the client.
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { query, queryOne, execute } from './db.js';

const COOKIE = 'mi_admin_session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function secret() {
	const s = process.env.JWT_SECRET;
	if (!s || s.length < 16) {
		console.warn('[auth] JWT_SECRET missing/short — using dev fallback');
	}
	return new TextEncoder().encode(s || 'dev-secret-min-16-chars-please');
}

export async function signToken(payload) {
	return await new SignJWT({ ...payload })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(secret());
}

export async function verifyToken(token) {
	try {
		const { payload } = await jwtVerify(token, secret());
		return payload;
	} catch {
		return null;
	}
}

export async function hashPassword(plain) {
	return bcrypt.hash(plain, 10);
}

export async function comparePassword(plain, hash) {
	return bcrypt.compare(plain, hash);
}

export async function createSession({ adminId, ip, ua }) {
	const sessionId = crypto.randomUUID();
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
	await execute(
		`INSERT INTO sessions (id, admin_id, expires_at, user_agent, ip_address)
		 VALUES (?, ?, ?, ?, ?)`,
		[sessionId, adminId, expiresAt, ua ? ua.slice(0, 500) : null, ip || null]
	);
	return { sessionId, expiresAt };
}

export async function deleteSession(sessionId) {
	await execute(`DELETE FROM sessions WHERE id = ?`, [sessionId]);
}

export async function getAdminFromRequest(req) {
	const token = req.signedCookies?.[COOKIE] || req.cookies?.[COOKIE];
	if (!token) return null;
	const payload = await verifyToken(token);
	if (!payload) return null;

	const session = await queryOne(
		`SELECT id, admin_id, expires_at FROM sessions WHERE id = ?`,
		[payload.sessionId]
	);
	if (!session) return null;
	if (new Date(session.expires_at) < new Date()) {
		await deleteSession(session.id);
		return null;
	}

	const admin = await queryOne(
		`SELECT id, email, name, role, active FROM admins WHERE id = ?`,
		[payload.adminId]
	);
	if (!admin || !admin.active) return null;

	return {
		id: admin.id,
		email: admin.email,
		name: admin.name,
		role: admin.role,
		sessionId: session.id
	};
}

export function setSessionCookie(res, token, expiresAt) {
	res.cookie(COOKIE, token, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		signed: false,
		expires: expiresAt
	});
}

export function clearSessionCookie(res) {
	res.clearCookie(COOKIE, { path: '/' });
}

/** Express middleware: 401 if no admin in request. */
export async function requireAdmin(req, res, next) {
	const admin = await getAdminFromRequest(req);
	if (!admin) return res.status(401).json({ ok: false, error: 'unauthorized' });
	req.admin = admin;
	next();
}
