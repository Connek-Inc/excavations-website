import { fail } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { clients, soumissions } from '$lib/server/db/schema';
import {
	createClientSession,
	createClientSessionToken,
	setClientSessionCookie
} from '$lib/server/auth/client-session';
import { sendNewSoumissionEmail } from '$lib/server/email/resend';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ locals }) => {
	return { client: locals.client };
};

function genToken() {
	return crypto.randomUUID().replace(/-/g, '');
}

export const actions: Actions = {
	create: async ({ request, cookies, getClientAddress, locals }) => {
		const data = await request.formData();
		const mode = String(data.get('mode') ?? 'register'); // 'register' | 'login' | 'guest'
		const client_nom = String(data.get('client_nom') ?? '').trim();
		const client_email = String(data.get('client_email') ?? '').trim().toLowerCase();
		const client_telephone = String(data.get('client_telephone') ?? '').trim();
		const client_adresse = String(data.get('client_adresse') ?? '').trim();
		const projet_adresse = String(data.get('projet_adresse') ?? '').trim();
		const projet_type = String(data.get('projet_type') ?? '').trim();
		const projet_description = String(data.get('projet_description') ?? '').trim();
		const notes_client = String(data.get('notes_client') ?? '').trim();
		const password = String(data.get('password') ?? '');

		if (!client_nom || client_nom.length < 2)
			return fail(400, { error: 'Nom requis', values: Object.fromEntries(data) });
		if (!client_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client_email))
			return fail(400, { error: 'Courriel invalide', values: Object.fromEntries(data) });
		if (!projet_adresse || projet_adresse.length < 4)
			return fail(400, { error: 'Adresse du projet requise', values: Object.fromEntries(data) });
		if (!projet_type)
			return fail(400, { error: 'Type de projet requis', values: Object.fromEntries(data) });
		if (!projet_description || projet_description.length < 30)
			return fail(400, {
				error: 'Description trop courte (minimum 30 caractères)',
				values: Object.fromEntries(data)
			});

		let clientId: number | null = locals.client?.id ?? null;

		if (!clientId && mode !== 'guest') {
			if (!password || password.length < 8)
				return fail(400, {
					error: 'Mot de passe requis (minimum 8 caractères)',
					values: Object.fromEntries(data),
					needsPassword: true
				});

			let existing;
			try {
				existing = await db.query.clients.findFirst({
					where: eq(clients.email, client_email)
				});
			} catch (err) {
				console.error('[soumission] DB error:', err);
				return fail(500, {
					error: 'Erreur de base de données',
					values: Object.fromEntries(data)
				});
			}

			if (existing) {
				if (mode !== 'login') {
					return fail(400, {
						error: 'Un compte existe déjà avec ce courriel. Entrez votre mot de passe pour continuer.',
						values: Object.fromEntries(data),
						needsLogin: true
					});
				}
				const valid = await bcrypt.compare(password, existing.passwordHash);
				if (!valid)
					return fail(401, {
						error: 'Mot de passe incorrect',
						values: Object.fromEntries(data),
						needsLogin: true
					});
				clientId = existing.id;
			} else {
				const hash = await bcrypt.hash(password, 12);
				try {
					const inserted = await db.insert(clients).values({
						email: client_email,
						passwordHash: hash,
						name: client_nom,
						telephone: client_telephone || null,
						adresse: client_adresse || null
					});
					clientId = (inserted as any)[0]?.insertId ?? null;
					if (!clientId) {
						const justInserted = await db.query.clients.findFirst({
							where: eq(clients.email, client_email)
						});
						clientId = justInserted?.id ?? null;
					}
				} catch (err) {
					console.error('[soumission] Client create error:', err);
					return fail(500, {
						error: 'Impossible de créer le compte',
						values: Object.fromEntries(data)
					});
				}
			}

			if (clientId) {
				const ip = getClientAddress();
				const ua = request.headers.get('user-agent') || undefined;
				const { sessionId, expiresAt } = await createClientSession(clientId, ip, ua);
				const token = await createClientSessionToken({
					sessionId,
					clientId,
					email: client_email,
					name: client_nom
				});
				setClientSessionCookie(cookies, token, expiresAt);
			}
		}

		const id = crypto.randomUUID();
		const clientToken = genToken();

		try {
			await db.insert(soumissions).values({
				id,
				clientId,
				clientToken,
				clientNom: client_nom,
				clientEmail: client_email,
				clientTelephone: client_telephone || null,
				clientAdresse: client_adresse || null,
				projetAdresse: projet_adresse || null,
				projetType: projet_type || null,
				projetDescription: projet_description,
				notesClient: notes_client || null,
				statut: 'nouvelle',
				articles: [],
				modalites: [],
				sections: {}
			});
		} catch (err) {
			console.error('[soumission] Insert error:', err);
			return fail(500, {
				error: 'Erreur lors de la création de la soumission',
				values: Object.fromEntries(data)
			});
		}

		// Fire-and-forget email
		sendNewSoumissionEmail(client_email, client_nom, clientToken).catch(() => {});

		return { success: true, token: clientToken };
	}
};
