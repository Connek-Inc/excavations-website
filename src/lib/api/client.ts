// Tiny fetch wrapper for the /api/* endpoints exposed by server.js.
// Uses credentials:'include' so the JWT session cookie travels with every call.
// Same origin in production (Express serves the build); in dev,
// PUBLIC_API_BASE can point to e.g. http://localhost:3000.

import { PUBLIC_API_BASE } from '$env/static/public';

const BASE = (PUBLIC_API_BASE || '').replace(/\/$/, '');

export interface ApiError extends Error {
	status: number;
	body?: unknown;
}

export async function api<T = unknown>(
	path: string,
	opts: {
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
		body?: unknown;
		headers?: Record<string, string>;
		signal?: AbortSignal;
	} = {}
): Promise<T> {
	const url = `${BASE}/api${path.startsWith('/') ? path : `/${path}`}`;
	const init: RequestInit = {
		method: opts.method || 'GET',
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			...(opts.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
			...(opts.headers || {})
		},
		signal: opts.signal
	};
	if (opts.body !== undefined) init.body = JSON.stringify(opts.body);

	let res: Response;
	try {
		res = await fetch(url, init);
	} catch (e) {
		const err = new Error(`Network error: ${(e as Error)?.message || e}`) as ApiError;
		err.status = 0;
		throw err;
	}

	let data: unknown = null;
	const ct = res.headers.get('content-type') || '';
	if (ct.includes('application/json')) {
		try {
			data = await res.json();
		} catch {
			data = null;
		}
	}

	if (!res.ok) {
		const msg = (data as { error?: string })?.error || res.statusText || `HTTP ${res.status}`;
		const err = new Error(msg) as ApiError;
		err.status = res.status;
		err.body = data;
		throw err;
	}

	return data as T;
}

export const apiGet = <T = unknown>(p: string, signal?: AbortSignal) => api<T>(p, { signal });
export const apiPost = <T = unknown>(p: string, body?: unknown) => api<T>(p, { method: 'POST', body });
export const apiPut = <T = unknown>(p: string, body?: unknown) => api<T>(p, { method: 'PUT', body });
export const apiDelete = <T = unknown>(p: string) => api<T>(p, { method: 'DELETE' });
