/**
 * GET /api/connek/services
 *
 * Returns the partner business' service catalog. Same caching contract as
 * /api/connek/business — the values change rarely enough that the 5 min
 * server cache + 60s browser cache is plenty.
 *
 * Used by SoumissionForm to populate the "project type" dropdown so it
 * always mirrors what's configured in Connek.
 */

import { json } from '@sveltejs/kit';
import { ConnekApiError } from '$lib/server/connek/api';
import { listServices, type PublicService } from '$lib/server/connek/quotes';
import type { RequestHandler } from './$types';

const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { at: number; data: PublicService[] } | null = null;

export const GET: RequestHandler = async () => {
	const now = Date.now();
	if (cache && now - cache.at < CACHE_TTL_MS) {
		return json(
			{ data: cache.data },
			{ headers: { 'cache-control': 'public, max-age=60, stale-while-revalidate=300' } }
		);
	}

	try {
		const { data } = await listServices();
		cache = { at: now, data };
		return json(
			{ data },
			{ headers: { 'cache-control': 'public, max-age=60, stale-while-revalidate=300' } }
		);
	} catch (e) {
		if (e instanceof ConnekApiError) {
			return json({ error: e.code ?? 'connek_error', message: e.message }, { status: e.status });
		}
		console.error('[connek/services] unexpected', e);
		return json({ error: 'internal' }, { status: 500 });
	}
};
