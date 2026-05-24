import { apiGet, apiPut, apiDelete } from '$lib/api/client';

export type SettingValue = string | number | boolean | null | Record<string, unknown> | unknown[];

export async function listSettings(): Promise<Record<string, SettingValue>> {
	try {
		const r = await apiGet<{ ok: true; settings: Record<string, SettingValue> }>('/settings');
		return r.settings;
	} catch {
		return {};
	}
}

export async function getSetting<T = SettingValue>(key: string): Promise<T | null> {
	try {
		const r = await apiGet<{ ok: true; value: T }>(`/settings/${encodeURIComponent(key)}`);
		return r.value;
	} catch {
		return null;
	}
}

export async function setSetting(key: string, value: SettingValue): Promise<boolean> {
	try {
		await apiPut(`/settings/${encodeURIComponent(key)}`, { value });
		return true;
	} catch {
		return false;
	}
}

export async function deleteSetting(key: string): Promise<boolean> {
	try {
		await apiDelete(`/settings/${encodeURIComponent(key)}`);
		return true;
	} catch {
		return false;
	}
}
