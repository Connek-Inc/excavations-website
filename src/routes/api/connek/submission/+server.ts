/**
 * POST /api/connek/submission
 *
 * Receives the public landing form, forwards it to connek-api's
 * `POST /api/v1/quotes/submission` (HMAC-signed server-side). Returns the
 * token + quote_id so the browser can redirect the visitor to their
 * /soumission/[token] tracking page.
 *
 * The browser NEVER sees the partner key/secret. All HMAC stays here.
 */

import { json } from '@sveltejs/kit';
import { ConnekApiError } from '$lib/server/connek/api';
import { createSubmission, type SubmissionPayload } from '$lib/server/connek/quotes';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	let payload: Partial<SubmissionPayload>;
	try {
		payload = (await request.json()) as Partial<SubmissionPayload>;
	} catch {
		return json({ error: 'invalid_json' }, { status: 400 });
	}

	// Local sanity check — the backend will validate again, but we want
	// to give a friendly error before paying for the network round-trip.
	const required: Array<keyof SubmissionPayload> = [
		'client_first_name',
		'client_email',
		'client_phone',
		'project_description'
	];
	for (const k of required) {
		if (!payload[k] || String(payload[k]).trim() === '') {
			return json({ error: 'missing_field', field: k }, { status: 400 });
		}
	}

	const digits = String(payload.client_phone).replace(/\D/g, '');
	if (digits.length < 10) {
		return json({ error: 'invalid_phone' }, { status: 400 });
	}

	try {
		const result = await createSubmission({
			client_first_name: payload.client_first_name!,
			client_last_name: payload.client_last_name,
			client_email: payload.client_email!,
			client_phone: payload.client_phone!,
			client_address: payload.client_address,
			category: payload.category,
			subcategory: payload.subcategory,
			location: payload.location,
			project_description: payload.project_description!,
			client_notes: payload.client_notes,
			expires_in_days: payload.expires_in_days ?? 30
		});
		return json({
			ok: true,
			quote_id: result.quote_id,
			token: result.token,
			tracking_url: `/soumission/${encodeURIComponent(result.token)}`
		});
	} catch (e) {
		if (e instanceof ConnekApiError) {
			return json(
				{ error: e.code ?? 'connek_error', message: e.message },
				{ status: e.status }
			);
		}
		const ip = getClientAddress();
		console.error('[connek/submission] unexpected error', { ip, e });
		return json({ error: 'internal' }, { status: 500 });
	}
};
