import { apiGet, apiPost, apiPut, apiDelete } from '$lib/api/client';

export type ContactStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'lost' | 'archived';

export interface Contact {
	id: number;
	name: string;
	email: string;
	phone: string | null;
	subject: string | null;
	message: string;
	service_type: string | null;
	preferred_date: string | null;
	language: string | null;
	source: string | null;
	status: ContactStatus;
	notes: string | null;
	created_at: string;
	updated_at: string;
}

export async function listContacts(status?: ContactStatus): Promise<Contact[]> {
	try {
		const q = status ? `?status=${encodeURIComponent(status)}` : '';
		const r = await apiGet<{ ok: true; contacts: Contact[] }>(`/contacts${q}`);
		return r.contacts;
	} catch {
		return [];
	}
}

export async function getContact(id: number): Promise<Contact | null> {
	try {
		const r = await apiGet<{ ok: true; contact: Contact }>(`/contacts/${id}`);
		return r.contact;
	} catch {
		return null;
	}
}

export async function createContact(input: { name: string; email: string; message: string; phone?: string; subject?: string; service_type?: string; language?: string; source?: string }): Promise<{ id: number } | null> {
	try {
		return await apiPost<{ ok: true; id: number }>('/contacts', input);
	} catch {
		return null;
	}
}

export async function updateContact(id: number, patch: Partial<Contact>): Promise<Contact | null> {
	try {
		const r = await apiPut<{ ok: true; contact: Contact }>(`/contacts/${id}`, patch);
		return r.contact;
	} catch {
		return null;
	}
}

export async function deleteContact(id: number): Promise<boolean> {
	try {
		await apiDelete(`/contacts/${id}`);
		return true;
	} catch {
		return false;
	}
}
