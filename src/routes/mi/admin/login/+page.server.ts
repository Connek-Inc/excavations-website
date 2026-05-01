import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { db } from '$lib/server/db';
import { admins } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import {
	createSession,
	createSessionToken,
	setSessionCookie
} from '$lib/server/auth/session';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.admin) throw redirect(303, '/mi/admin');
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const email = String(data.get('email') || '').trim().toLowerCase();
		const password = String(data.get('password') || '');

		if (!email || !password) {
			return fail(400, { email, error: 'Email et mot de passe requis' });
		}

		const admin = await db.query.admins.findFirst({
			where: eq(admins.email, email)
		});

		await new Promise((r) => setTimeout(r, 200));

		if (!admin) {
			return fail(401, { email, error: 'Identifiants invalides' });
		}

		const valid = await bcrypt.compare(password, admin.passwordHash);
		if (!valid) {
			return fail(401, { email, error: 'Identifiants invalides' });
		}

		const { sessionId, expiresAt } = await createSession(admin.id);
		const token = await createSessionToken({
			sessionId,
			adminId: admin.id,
			email: admin.email,
			name: admin.name,
			role: admin.role
		});

		setSessionCookie(cookies, token, expiresAt);

		await db
			.update(admins)
			.set({ lastLoginAt: new Date() })
			.where(eq(admins.id, admin.id));

		const redirectTo = url.searchParams.get('from') || '/mi/admin';
		throw redirect(303, redirectTo.startsWith('/mi/admin') ? redirectTo : '/mi/admin');
	}
};
