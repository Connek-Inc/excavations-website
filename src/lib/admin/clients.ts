// Admin session helpers, backed by the Express /api/auth endpoints.
// Same public surface as the old localStorage version — pages keep working.

import { apiGet, apiPost } from '$lib/api/client';

export interface AdminAccount {
	id: number;
	email: string;
	name: string;
	role: string;
}

export interface AdminSession extends AdminAccount {}

export async function login(email: string, password: string): Promise<{ ok: true; admin: AdminAccount } | { ok: false; reason: 'bad-credentials' | 'network' }> {
	try {
		const r = await apiPost<{ ok: true; admin: AdminAccount }>('/auth/login', { email, password });
		return { ok: true, admin: r.admin };
	} catch (e: any) {
		if (e?.status === 401 || e?.status === 400) return { ok: false, reason: 'bad-credentials' };
		return { ok: false, reason: 'network' };
	}
}

export async function logout(): Promise<void> {
	try {
		await apiPost('/auth/logout');
	} catch {}
}

export async function getCurrent(): Promise<AdminSession | null> {
	try {
		const r = await apiGet<{ ok: true; admin: AdminAccount }>('/auth/me');
		return r.admin;
	} catch {
		return null;
	}
}
