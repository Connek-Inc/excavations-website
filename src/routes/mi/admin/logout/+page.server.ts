import { redirect } from '@sveltejs/kit';
import { clearSessionCookie, deleteSession } from '$lib/server/auth/session';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	throw redirect(303, '/mi/admin/login');
};

export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		if (locals.admin) {
			await deleteSession(locals.admin.sessionId);
		}
		clearSessionCookie(cookies);
		throw redirect(303, '/mi/admin/login');
	}
};
