import { redirect, type Handle } from '@sveltejs/kit';
import { getAdminFromCookies } from '$lib/server/auth/session';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	const isAdminRoute = path.startsWith('/mi/admin');
	const isLoginRoute = path === '/mi/admin/login' || path === '/mi/admin/login/';

	// Always populate locals.admin if cookie exists (so login page can redirect logged-in users)
	if (isAdminRoute) {
		event.locals.admin = await getAdminFromCookies(event.cookies);

		// Protected admin routes — must be authenticated
		if (!isLoginRoute && !event.locals.admin) {
			throw redirect(303, '/mi/admin/login');
		}

		// Already logged in → don't show login page, send to dashboard
		if (isLoginRoute && event.locals.admin) {
			throw redirect(303, '/mi/admin');
		}
	} else {
		event.locals.admin = null;
	}

	return resolve(event);
};
