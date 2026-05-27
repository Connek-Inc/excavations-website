import { json } from '@sveltejs/kit';
import { ConnekApiError } from '$lib/server/connek/api';
import { signByToken, type SignPayload } from '$lib/server/connek/quotes';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	let payload: Partial<SignPayload>;
	try {
		payload = (await request.json()) as Partial<SignPayload>;
	} catch {
		return json({ error: 'invalid_json' }, { status: 400 });
	}

	const name = (payload.name ?? '').trim();
	if (name.length < 2) {
		return json({ error: 'invalid_name' }, { status: 400 });
	}

	try {
		const data = await signByToken(params.token, { name });
		return json(data);
	} catch (e) {
		if (e instanceof ConnekApiError) {
			return json({ error: e.code ?? 'connek_error', message: e.message }, { status: e.status });
		}
		console.error('[connek/quote/sign] unexpected error', e);
		return json({ error: 'internal' }, { status: 500 });
	}
};
