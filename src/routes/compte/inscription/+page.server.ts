import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { clients } from '$lib/server/db/schema';
import {
	createClientSession,
	createClientSessionToken,
	setClientSessionCookie
} from '$lib/server/auth/client-session';
import type { Actions } from './$types';

export const prerender = false;

export const actions: Actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim().toLowerCase();
		const telephone = String(data.get('telephone') ?? '').trim();
		const password = String(data.get('password') ?? '');

		if (name.length < 2) return fail(400, { error: 'Nom requis', name, email, telephone });
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			return fail(400, { error: 'Courriel invalide', name, email, telephone });
		if (password.length < 8)
			return fail(400, { error: 'Mot de passe minimum 8 caractères', name, email, telephone });

		try {
			const existing = await db.query.clients.findFirst({ where: eq(clients.email, email) });
			if (existing)
				return fail(400, { error: 'Un compte existe déjà avec ce courriel', name, email, telephone });
		} catch (err) {
			console.error('[register] DB error:', err);
			return fail(500, { error: 'Erreur de base de données', name, email, telephone });
		}

		const hash = await bcrypt.hash(password, 12);
		let clientId: number | null = null;
		try {
			const inserted = await db.insert(clients).values({
				email,
				passwordHash: hash,
				name,
				telephone: telephone || null
			});
			clientId = (inserted as any)[0]?.insertId ?? null;
			if (!clientId) {
				const just = await db.query.clients.findFirst({ where: eq(clients.email, email) });
				clientId = just?.id ?? null;
			}
		} catch (err) {
			console.error('[register] Insert error:', err);
			return fail(500, { error: 'Impossible de créer le compte', name, email, telephone });
		}

		if (!clientId) return fail(500, { error: 'Erreur inattendue', name, email, telephone });

		const ip = getClientAddress();
		const ua = request.headers.get('user-agent') || undefined;
		const { sessionId, expiresAt } = await createClientSession(clientId, ip, ua);
		const token = await createClientSessionToken({ sessionId, clientId, email, name });
		setClientSessionCookie(cookies, token, expiresAt);

		throw redirect(303, '/compte');
	}
};
