import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { getAdminFromCookies } from '$lib/server/auth/session';

const ADMIN_PATH_PREFIX = '/mi/admin';
const LOGIN_PATH = '/mi/admin/login';

export const handle: Handle = async ({ event, resolve }) => {
	const { url, cookies } = event;

	if (url.pathname.startsWith(ADMIN_PATH_PREFIX)) {
		const admin = await getAdminFromCookies(cookies);
		event.locals.admin = admin;

		const isLoginPage = url.pathname === LOGIN_PATH;

		if (!admin && !isLoginPage) {
			throw redirect(303, `${LOGIN_PATH}?from=${encodeURIComponent(url.pathname)}`);
		}

		if (admin && isLoginPage) {
			throw redirect(303, '/mi/admin');
		}
	}

	return resolve(event);
};
