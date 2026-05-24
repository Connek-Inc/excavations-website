import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { admins } from '$lib/server/db/schema';
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
	default: async ({ request, cookies, getClientAddress }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '').trim().toLowerCase();
		const password = String(data.get('password') ?? '');

		if (!email || !password) {
			return fail(400, { error: 'Email et mot de passe requis', email });
		}

		// Soft brute-force protection
		await new Promise((r) => setTimeout(r, 200));

		let admin;
		try {
			admin = await db.query.admins.findFirst({
				where: eq(admins.email, email)
			});
		} catch (err) {
			console.error('[login] DB error:', err);
			const msg = err instanceof Error ? err.message : 'Database connection failed';
			return fail(500, {
				error: `Erreur DB: ${msg}. Vérifiez les variables DB_* et que la DB existe.`,
				email
			});
		}

		if (!admin || !admin.active) {
			return fail(401, { error: 'Identifiants invalides', email });
		}

		const valid = await bcrypt.compare(password, admin.passwordHash);
		if (!valid) {
			return fail(401, { error: 'Identifiants invalides', email });
		}

		const ip = getClientAddress();
		const ua = request.headers.get('user-agent') || undefined;
		const { sessionId, expiresAt } = await createSession(admin.id, ip, ua);
		const token = await createSessionToken({
			sessionId,
			adminId: admin.id,
			email: admin.email,
			name: admin.name,
			role: admin.role
		});
		setSessionCookie(cookies, token, expiresAt);

		try {
			await db
				.update(admins)
				.set({ lastLoginAt: new Date() })
				.where(eq(admins.id, admin.id));
		} catch (err) {
			console.error('[login] lastLoginAt update failed (non-fatal):', err);
		}

		throw redirect(303, '/mi/admin');
	}
};
