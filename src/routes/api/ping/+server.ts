import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Tiny diagnostic endpoint — returns 200 only when SvelteKit is actually
// running on Node.js. If the deploy is static, this 404s.
export const GET: RequestHandler = async () => {
	return json({
		ok: true,
		runtime: 'node',
		time: new Date().toISOString(),
		resend_configured: !!process.env.RESEND
	});
};
