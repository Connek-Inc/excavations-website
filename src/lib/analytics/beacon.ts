// Lightweight pageview beacon. POSTs a row into the `page_views` table via
// /api/analytics/track. Fire-and-forget — never throws.

import { browser } from '$app/environment';
import { apiPost } from '$lib/api/client';

let lastPath: string | null = null;

export function track(path: string, opts: { referrer?: string; language?: string } = {}) {
	if (!browser) return;
	if (lastPath === path) return; // dedupe identical consecutive hits
	lastPath = path;

	const payload = {
		path,
		referrer: opts.referrer ?? document.referrer ?? '',
		language: opts.language ?? navigator.language?.slice(0, 5) ?? null
	};

	// fire-and-forget; sendBeacon is great but doesn't include cookies on all browsers,
	// so we use fetch with keepalive instead
	try {
		void apiPost('/analytics/track', payload).catch(() => {});
	} catch {}
}
