import { redirect } from '@sveltejs/kit';
import { clearClientSessionCookie, deleteClientSession } from '$lib/server/auth/client-session';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async () => {
	throw redirect(303, '/compte/login');
};

export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		if (locals.client) {
			await deleteClientSession(locals.client.sessionId);
		}
		clearClientSessionCookie(cookies);
		throw redirect(303, '/compte/login');
	}
};
