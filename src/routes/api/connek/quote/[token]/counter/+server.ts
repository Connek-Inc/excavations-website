import { json } from '@sveltejs/kit';
import { ConnekApiError } from '$lib/server/connek/api';
import { counterOfferByToken, type CounterOfferPayload } from '$lib/server/connek/quotes';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	let payload: Partial<CounterOfferPayload>;
	try {
		payload = (await request.json()) as Partial<CounterOfferPayload>;
	} catch {
		return json({ error: 'invalid_json' }, { status: 400 });
	}

	if (typeof payload.amount_cents !== 'number' || payload.amount_cents < 0) {
		return json({ error: 'invalid_amount' }, { status: 400 });
	}

	try {
		const data = await counterOfferByToken(params.token, {
			amount_cents: payload.amount_cents,
			line_items: payload.line_items ?? [],
			message: payload.message
		});
		return json(data);
	} catch (e) {
		if (e instanceof ConnekApiError) {
			return json({ error: e.code ?? 'connek_error', message: e.message }, { status: e.status });
		}
		console.error('[connek/quote/counter] unexpected error', e);
		return json({ error: 'internal' }, { status: 500 });
	}
};
