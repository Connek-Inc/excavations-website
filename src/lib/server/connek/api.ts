/**
 * Server-side client for the Connek public API (/api/v1/*).
 *
 * Signs every request with HMAC-SHA256 using the partner key/secret
 * stored in env (CONNEK_API_KEY_ID + CONNEK_API_KEY_SECRET).
 *
 * Canonical string (must match auth_layer.py on the backend exactly):
 *   {METHOD}\n{PATH}\n{UNIX_SECONDS}\n{SHA256_HEX(body)}
 *
 * Anti-replay window on the backend: ±5 min — we always use Date.now().
 *
 * Never import this from a `.svelte` file — keep all HMAC operations
 * server-only so the secret never reaches the browser.
 */

import { createHash, createHmac } from 'node:crypto';
import { env } from '$env/dynamic/private';

const BASE_URL =
	env.CONNEK_API_BASE_URL ?? 'https://connek-dev-aa5f5db19836.herokuapp.com';
const KEY_ID = env.CONNEK_API_KEY_ID ?? '';
const KEY_SECRET = env.CONNEK_API_KEY_SECRET ?? '';

export class ConnekApiError extends Error {
	constructor(
		public status: number,
		public code: string | null,
		message: string,
		public raw?: unknown
	) {
		super(message);
	}
}

function signCanonical(method: string, path: string, ts: number, body: string): string {
	const bodySha = createHash('sha256').update(body, 'utf8').digest('hex');
	const canonical = `${method}\n${path}\n${ts}\n${bodySha}`;
	return createHmac('sha256', KEY_SECRET).update(canonical, 'utf8').digest('hex');
}

interface FetchOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: unknown;
	/** Set true to call an /access/{token}/* endpoint that uses a magic-link
	 * token instead of HMAC. The path is sent as-is and no signature headers
	 * are attached. */
	tokenOnly?: boolean;
}

export async function connekFetch<T = unknown>(path: string, opts: FetchOptions = {}): Promise<T> {
	if (!KEY_ID || !KEY_SECRET) {
		throw new ConnekApiError(
			500,
			'config_missing',
			'CONNEK_API_KEY_ID / CONNEK_API_KEY_SECRET not configured'
		);
	}

	const method = opts.method ?? 'GET';
	const bodyStr = opts.body == null ? '' : JSON.stringify(opts.body);
	const url = `${BASE_URL}${path}`;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	};

	if (!opts.tokenOnly) {
		const ts = Math.floor(Date.now() / 1000);
		headers['X-Connek-Key-Id'] = KEY_ID;
		headers['X-Connek-Timestamp'] = String(ts);
		headers['X-Connek-Signature'] = signCanonical(method, path, ts, bodyStr);
	}

	const res = await fetch(url, {
		method,
		headers,
		body: method === 'GET' ? undefined : bodyStr
	});

	const text = await res.text();
	let parsed: unknown = null;
	try {
		parsed = text ? JSON.parse(text) : null;
	} catch {
		parsed = text;
	}

	if (!res.ok) {
		// Public API surface returns `{ error: { code, message } }` (see
		// routers/public_api/v1/errors.py). Owner endpoints return
		// `{ success: false, error: "<string>" }`. Handle both.
		const detail =
			(parsed as { detail?: { error?: { code: string; message: string } } })?.detail?.error ??
			(parsed as { error?: { code: string; message: string } })?.error;
		const ownerErr = (parsed as { error?: string })?.error;
		throw new ConnekApiError(
			res.status,
			detail?.code ?? null,
			detail?.message ?? (typeof ownerErr === 'string' ? ownerErr : `HTTP ${res.status}`),
			parsed
		);
	}

	return parsed as T;
}
