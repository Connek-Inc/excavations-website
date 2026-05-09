import { SignJWT, jwtVerify } from 'jose';
import { db } from '../db';
import { admins, sessions } from '../db/schema';
import { eq, lt } from 'drizzle-orm';
import type { Cookies } from '@sveltejs/kit';

const SESSION_COOKIE = 'mi_admin_session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret() {
	return new TextEncoder().encode(
		process.env.JWT_SECRET || 'dev-secret-change-in-production-min-32chars'
	);
}

export interface SessionPayload {
	sessionId: string;
	adminId: number;
	email: string;
	name: string;
	role: string;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
	return await new SignJWT({ ...payload })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
	try {
		const { payload } = await jwtVerify(token, getSecret());
		return payload as unknown as SessionPayload;
	} catch {
		return null;
	}
}

export async function createSession(adminId: number, ip?: string, ua?: string) {
	const sessionId = crypto.randomUUID();
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
	await db.insert(sessions).values({
		id: sessionId,
		adminId,
		expiresAt,
		ipAddress: ip || null,
		userAgent: ua?.slice(0, 500) || null
	});
	return { sessionId, expiresAt };
}

export async function deleteSession(sessionId: string) {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function cleanExpiredSessions() {
	await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
}

export async function getAdminFromCookies(cookies: Cookies) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token) return null;

	const payload = await verifySessionToken(token);
	if (!payload) return null;

	try {
		const session = await db.query.sessions.findFirst({
			where: eq(sessions.id, payload.sessionId)
		});

		if (!session || session.expiresAt < new Date()) {
			if (session) await deleteSession(session.id);
			return null;
		}

		const admin = await db.query.admins.findFirst({
			where: eq(admins.id, payload.adminId)
		});

		if (!admin || !admin.active) return null;

		return {
			id: admin.id,
			email: admin.email,
			name: admin.name,
			role: admin.role,
			sessionId: session.id
		};
	} catch (err) {
		console.error('[auth] getAdminFromCookies DB error:', err);
		return null;
	}
}

export function setSessionCookie(cookies: Cookies, token: string, expiresAt: Date) {
	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		expires: expiresAt
	});
}

export function clearSessionCookie(cookies: Cookies) {
	cookies.delete(SESSION_COOKIE, { path: '/' });
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
