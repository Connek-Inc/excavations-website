import { redirect, type Handle } from '@sveltejs/kit';
import { getAdminFromCookies } from '$lib/server/auth/session';
import { getClientFromCookies } from '$lib/server/auth/client-session';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	const isAdminRoute = path.startsWith('/mi/admin');
	const isAdminLogin = path === '/mi/admin/login' || path === '/mi/admin/login/';
	const isCompteRoute = path.startsWith('/compte');
	const isClientAuthPage =
		path === '/compte/login' ||
		path === '/compte/login/' ||
		path === '/compte/inscription' ||
		path === '/compte/inscription/' ||
		path === '/compte/oublie' ||
		path === '/compte/oublie/' ||
		path.startsWith('/compte/reset/');
	const isSoumissionArea = path.startsWith('/soumission');

	event.locals.admin = null;
	event.locals.client = null;

	if (isAdminRoute) {
		event.locals.admin = await getAdminFromCookies(event.cookies);
		if (!isAdminLogin && !event.locals.admin) {
			throw redirect(303, '/mi/admin/login');
		}
		if (isAdminLogin && event.locals.admin) {
			throw redirect(303, '/mi/admin');
		}
	}

	if (isCompteRoute || isSoumissionArea) {
		event.locals.client = await getClientFromCookies(event.cookies);
		if (isCompteRoute && !isClientAuthPage && !event.locals.client) {
			throw redirect(303, '/compte/login');
		}
		if (isClientAuthPage && event.locals.client) {
			throw redirect(303, '/compte');
		}
	}

	return resolve(event);
};
