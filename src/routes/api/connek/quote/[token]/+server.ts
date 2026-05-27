/**
 * GET /api/connek/quote/[token]
 *
 * Proxies the magic-link view endpoint so the browser never has to call
 * connek-api directly. Keeps cross-origin / cookie surface inside the
 * landing's own domain.
 */

import { json } from '@sveltejs/kit';
import { ConnekApiError } from '$lib/server/connek/api';
import { viewQuoteByToken } from '$lib/server/connek/quotes';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const data = await viewQuoteByToken(params.token);
		return json(data);
	} catch (e) {
		if (e instanceof ConnekApiError) {
			return json({ error: e.code ?? 'connek_error', message: e.message }, { status: e.status });
		}
		console.error('[connek/quote/get] unexpected error', e);
		return json({ error: 'internal' }, { status: 500 });
	}
};
