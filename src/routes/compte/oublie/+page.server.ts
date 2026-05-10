import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { clients, passwordResets } from '$lib/server/db/schema';
import { sendPasswordResetEmail } from '$lib/server/email/resend';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ url }) => {
	return { email: url.searchParams.get('email') ?? '' };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '').trim().toLowerCase();
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			return fail(400, { error: 'Courriel invalide', email });

		const client = await db.query.clients.findFirst({ where: eq(clients.email, email) });

		// Always return success to avoid leaking email existence
		if (client) {
			const token = crypto.randomUUID().replace(/-/g, '');
			const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1h
			try {
				await db.insert(passwordResets).values({
					clientId: client.id,
					token,
					expiresAt
				});
				await sendPasswordResetEmail(client.email, client.name, token);
			} catch (err) {
				console.error('[forgot] error:', err);
			}
		}

		return { success: true };
	}
};
