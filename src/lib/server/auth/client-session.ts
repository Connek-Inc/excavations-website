import { SignJWT, jwtVerify } from 'jose';
import { db } from '../db';
import { clients, clientSessions } from '../db/schema';
import { eq, lt } from 'drizzle-orm';
import type { Cookies } from '@sveltejs/kit';

const CLIENT_SESSION_COOKIE = 'mi_client_session';
const CLIENT_SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function getSecret() {
	return new TextEncoder().encode(
		process.env.JWT_SECRET || 'dev-secret-change-in-production-min-32chars'
	);
}

export interface ClientSessionPayload {
	sessionId: string;
	clientId: number;
	email: string;
	name: string;
}

export async function createClientSessionToken(payload: ClientSessionPayload): Promise<string> {
	return await new SignJWT({ ...payload })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('30d')
		.sign(getSecret());
}

export async function verifyClientSessionToken(token: string): Promise<ClientSessionPayload | null> {
	try {
		const { payload } = await jwtVerify(token, getSecret());
		return payload as unknown as ClientSessionPayload;
	} catch {
		return null;
	}
}

export async function createClientSession(clientId: number, ip?: string, ua?: string) {
	const sessionId = crypto.randomUUID();
	const expiresAt = new Date(Date.now() + CLIENT_SESSION_DURATION_MS);
	await db.insert(clientSessions).values({
		id: sessionId,
		clientId,
		expiresAt,
		ipAddress: ip || null,
		userAgent: ua?.slice(0, 500) || null
	});
	return { sessionId, expiresAt };
}

export async function deleteClientSession(sessionId: string) {
	await db.delete(clientSessions).where(eq(clientSessions.id, sessionId));
}

export async function cleanExpiredClientSessions() {
	await db.delete(clientSessions).where(lt(clientSessions.expiresAt, new Date()));
}

export async function getClientFromCookies(cookies: Cookies) {
	const token = cookies.get(CLIENT_SESSION_COOKIE);
	if (!token) return null;

	const payload = await verifyClientSessionToken(token);
	if (!payload) return null;

	try {
		const session = await db.query.clientSessions.findFirst({
			where: eq(clientSessions.id, payload.sessionId)
		});

		if (!session || session.expiresAt < new Date()) {
			if (session) await deleteClientSession(session.id);
			return null;
		}

		const client = await db.query.clients.findFirst({
			where: eq(clients.id, payload.clientId)
		});

		if (!client) return null;

		return {
			id: client.id,
			email: client.email,
			name: client.name,
			sessionId: session.id
		};
	} catch (err) {
		console.error('[client-auth] getClientFromCookies DB error:', err);
		return null;
	}
}

export function setClientSessionCookie(cookies: Cookies, token: string, expiresAt: Date) {
	cookies.set(CLIENT_SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		expires: expiresAt
	});
}

export function clearClientSessionCookie(cookies: Cookies) {
	cookies.delete(CLIENT_SESSION_COOKIE, { path: '/' });
}

export const CLIENT_SESSION_COOKIE_NAME = CLIENT_SESSION_COOKIE;
