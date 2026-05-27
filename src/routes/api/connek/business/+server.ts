/**
 * GET /api/connek/business
 *
 * Returns the partner business public profile (name, contact, hero image,
 * etc.). Browser-callable: it triggers an HMAC-signed call to connek-api
 * server-side, so the partner secret never reaches the page.
 *
 * Cached for 5 min — business profile is high-read, low-write data.
 */

import { json } from '@sveltejs/kit';
import { ConnekApiError } from '$lib/server/connek/api';
import { getBusinessProfile, type BusinessProfile } from '$lib/server/connek/quotes';
import type { RequestHandler } from './$types';

const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { at: number; data: BusinessProfile } | null = null;

export const GET: RequestHandler = async () => {
	const now = Date.now();
	if (cache && now - cache.at < CACHE_TTL_MS) {
		return json(
			{ data: cache.data },
			{ headers: { 'cache-control': 'public, max-age=60, stale-while-revalidate=300' } }
		);
	}

	try {
		const { data } = await getBusinessProfile();
		cache = { at: now, data };
		return json(
			{ data },
			{ headers: { 'cache-control': 'public, max-age=60, stale-while-revalidate=300' } }
		);
	} catch (e) {
		if (e instanceof ConnekApiError) {
			return json({ error: e.code ?? 'connek_error', message: e.message }, { status: e.status });
		}
		console.error('[connek/business] unexpected', e);
		return json({ error: 'internal' }, { status: 500 });
	}
};
