/**
 * Loads the quote tied to this magic-link token from connek-api.
 * The /api/v1/quotes/access/{token}/* endpoints are token-only (no HMAC),
 * but we still proxy them server-side so the token never leaves our domain
 * in client-readable URLs (it's in `params`, not in the user-agent's
 * referer to a third party).
 */

import { error } from '@sveltejs/kit';
import { ConnekApiError } from '$lib/server/connek/api';
import { viewQuoteByToken } from '$lib/server/connek/quotes';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { counterOfferByToken, signByToken } from '$lib/server/connek/quotes';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
	try {
		const data = await viewQuoteByToken(params.token);
		return { ...data, token: params.token };
	} catch (e) {
		if (e instanceof ConnekApiError) {
			if (e.status === 401 || e.status === 404) {
				throw error(404, e.message || 'Soumission introuvable');
			}
		}
		throw error(500, 'Could not load quote');
	}
};

export const actions: Actions = {
	counter: async ({ request, params }) => {
		const data = await request.formData();
		const amountStr = String(data.get('amount_cents') ?? '');
		const message = String(data.get('message') ?? '').trim();
		const amount_cents = Number.parseInt(amountStr, 10);

		if (!Number.isFinite(amount_cents) || amount_cents < 0) {
			return fail(400, { error: 'invalid_amount' });
		}

		try {
			await counterOfferByToken(params.token, { amount_cents, message: message || undefined });
			return { success: true, action: 'counter' };
		} catch (e) {
			if (e instanceof ConnekApiError) {
				return fail(e.status, { error: e.code ?? 'connek_error', message: e.message });
			}
			return fail(500, { error: 'internal' });
		}
	},

	sign: async ({ request, params }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		if (name.length < 2) return fail(400, { error: 'invalid_name' });

		try {
			await signByToken(params.token, { name });
			return { success: true, action: 'sign' };
		} catch (e) {
			if (e instanceof ConnekApiError) {
				return fail(e.status, { error: e.code ?? 'connek_error', message: e.message });
			}
			return fail(500, { error: 'internal' });
		}
	}
};
