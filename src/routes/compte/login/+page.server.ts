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
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ url }) => {
	return { email: url.searchParams.get('email') ?? '' };
};

export const actions: Actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '').trim().toLowerCase();
		const password = String(data.get('password') ?? '');

		if (!email || !password) return fail(400, { error: 'Email et mot de passe requis', email });

		await new Promise((r) => setTimeout(r, 200));

		let client;
		try {
			client = await db.query.clients.findFirst({ where: eq(clients.email, email) });
		} catch (err) {
			console.error('[client-login] DB error:', err);
			return fail(500, { error: 'Erreur de base de données', email });
		}

		if (!client) return fail(401, { error: 'Identifiants invalides', email });

		const valid = await bcrypt.compare(password, client.passwordHash);
		if (!valid) return fail(401, { error: 'Identifiants invalides', email });

		const ip = getClientAddress();
		const ua = request.headers.get('user-agent') || undefined;
		const { sessionId, expiresAt } = await createClientSession(client.id, ip, ua);
		const token = await createClientSessionToken({
			sessionId,
			clientId: client.id,
			email: client.email,
			name: client.name
		});
		setClientSessionCookie(cookies, token, expiresAt);

		throw redirect(303, '/compte');
	}
};
