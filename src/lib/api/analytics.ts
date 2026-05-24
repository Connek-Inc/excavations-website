import { apiGet } from '$lib/api/client';

export interface SummaryStats {
	today: { pageviews: number; visitors: number; soumissions: number; contacts: number };
	last30: { pageviews: number; visitors: number; soumissions: number; contacts: number };
	daily: Array<{ day: string; pageviews: number; visitors: number }>;
}

export interface TopPage { path: string; hits: number; visitors: number }
export interface TopReferrer { referrer: string; hits: number }
export interface TopCountry { country_code: string; hits: number; visitors: number }
export interface TopDevice { device: string; hits: number }

export async function getSummary(): Promise<SummaryStats | null> {
	try {
		return await apiGet<SummaryStats>('/analytics/summary');
	} catch {
		return null;
	}
}

export async function getTopPages(): Promise<TopPage[]> {
	try {
		const r = await apiGet<{ ok: true; pages: TopPage[] }>('/analytics/pages');
		return r.pages;
	} catch {
		return [];
	}
}

export async function getTopReferrers(): Promise<TopReferrer[]> {
	try {
		const r = await apiGet<{ ok: true; referrers: TopReferrer[] }>('/analytics/referrers');
		return r.referrers;
	} catch {
		return [];
	}
}

export async function getTopCountries(): Promise<TopCountry[]> {
	try {
		const r = await apiGet<{ ok: true; countries: TopCountry[] }>('/analytics/countries');
		return r.countries;
	} catch {
		return [];
	}
}

export async function getDevices(): Promise<TopDevice[]> {
	try {
		const r = await apiGet<{ ok: true; devices: TopDevice[] }>('/analytics/devices');
		return r.devices;
	} catch {
		return [];
	}
}
