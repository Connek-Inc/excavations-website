import { apiGet, apiPost, apiPut, apiDelete } from '$lib/api/client';

export interface Service {
	id: number;
	slug: string;
	title_fr: string;
	title_en: string | null;
	title_es: string | null;
	description_fr: string;
	description_en: string | null;
	description_es: string | null;
	icon: string | null;
	image: string | null;
	price_from_cad: number | null;
	price_to_cad: number | null;
	featured: 0 | 1;
	active: 0 | 1;
	order_index: number;
	created_at: string;
	updated_at: string;
}

export async function listServices(): Promise<Service[]> {
	try {
		const r = await apiGet<{ ok: true; services: Service[] }>('/services');
		return r.services;
	} catch {
		return [];
	}
}

export async function getService(slug: string): Promise<Service | null> {
	try {
		const r = await apiGet<{ ok: true; service: Service }>(`/services/${encodeURIComponent(slug)}`);
		return r.service;
	} catch {
		return null;
	}
}

export async function createService(input: Partial<Service>): Promise<Service | null> {
	try {
		const r = await apiPost<{ ok: true; service: Service }>('/services', input);
		return r.service;
	} catch {
		return null;
	}
}

export async function updateService(id: number, input: Partial<Service>): Promise<Service | null> {
	try {
		const r = await apiPut<{ ok: true; service: Service }>(`/services/${id}`, input);
		return r.service;
	} catch {
		return null;
	}
}

export async function deleteService(id: number): Promise<boolean> {
	try {
		await apiDelete(`/services/${id}`);
		return true;
	} catch {
		return false;
	}
}
