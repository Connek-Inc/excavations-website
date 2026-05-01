import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.admin && url.pathname !== '/mi/admin/login') {
		throw redirect(303, '/mi/admin/login');
	}
	return {
		admin: locals.admin
	};
};
