import { error, fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { eq, and, isNull } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { clients, passwordResets } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
	const reset = await db.query.passwordResets.findFirst({
		where: and(eq(passwordResets.token, params.token), isNull(passwordResets.usedAt))
	});
	if (!reset) throw error(404, 'Lien invalide ou déjà utilisé');
	if (reset.expiresAt < new Date()) throw error(410, 'Lien expiré');
	return { token: params.token };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const password = String(data.get('password') ?? '');
		const confirm = String(data.get('confirm') ?? '');

		if (password.length < 8) return fail(400, { error: 'Mot de passe minimum 8 caractères' });
		if (password !== confirm) return fail(400, { error: 'Les mots de passe ne correspondent pas' });

		const reset = await db.query.passwordResets.findFirst({
			where: and(eq(passwordResets.token, params.token), isNull(passwordResets.usedAt))
		});
		if (!reset) return fail(400, { error: 'Lien invalide ou déjà utilisé' });
		if (reset.expiresAt < new Date()) return fail(410, { error: 'Lien expiré' });

		const hash = await bcrypt.hash(password, 12);
		await db.update(clients).set({ passwordHash: hash }).where(eq(clients.id, reset.clientId));
		await db
			.update(passwordResets)
			.set({ usedAt: new Date() })
			.where(eq(passwordResets.id, reset.id));

		throw redirect(303, '/compte/login?reset=ok');
	}
};
