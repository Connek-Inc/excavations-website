import type { LayoutServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// hooks.server.ts already protects this route, so locals.admin will exist
	// (except on /mi/admin/login which is handled differently)
	return {
		admin: locals.admin,
		pathname: url.pathname
	};
};
