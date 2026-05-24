// Soumission helpers backed by the Express API at /api/soumissions.
// The shape of `Soumission` mirrors what server/routes/soumissions.js returns;
// helpers keep the same names so existing admin pages don't need to change.

import { apiGet, apiPost, apiPut, apiDelete } from '$lib/api/client';

export type SoumissionStatus =
	| 'nouvelle'
	| 'en_revision'
	| 'offerte'
	| 'contre_offre'
	| 'acceptee'
	| 'signee_par_les_deux'
	| 'rejetee'
	| 'archivee'
	| 'expiree';

export interface Offer {
	id: number;
	version_num: number;
	from_role: 'admin' | 'client';
	offer_type: 'offer' | 'counter-offer' | 'accept' | 'reject';
	amount_cents: number | null;
	payment_terms: string | null;
	deadline: string | null;
	notes: string | null;
	articles: unknown;
	created_at: string;
}

export interface Soumission {
	id: string;
	client_token: string;
	client_nom: string;
	client_email: string;
	client_telephone: string | null;
	client_adresse: string | null;
	projet_adresse: string | null;
	projet_type: string | null;
	projet_description: string;
	notes_client: string | null;
	status: SoumissionStatus;
	source: 'public-form' | 'urgences-form' | 'manual';
	lang: 'fr' | 'en' | 'es';
	admin_notes: string | null;
	numero: string | null;
	date_soumission: string | null;
	sous_total_cents: number;
	tps_cents: number;
	tvq_cents: number;
	total_cents: number;
	articles: unknown;
	modalites: unknown;
	sections: unknown;
	signature_client: string | null;
	signature_admin: string | null;
	expire_le: string | null;
	created_at: string;
	updated_at: string;
}

interface ListResponse { ok: true; soumissions: Soumission[] }
interface OneResponse { ok: true; soumission: Soumission; offers?: Offer[] }
interface CreateResponse { ok: true; soumission: Soumission; client_url?: string }
interface OfferResponse { ok: true; offer: Offer; status?: SoumissionStatus }

export async function readSoumissions(): Promise<Soumission[]> {
	try {
		const r = await apiGet<ListResponse>('/soumissions');
		return r.soumissions || [];
	} catch {
		return [];
	}
}

export async function findSoumission(id: string): Promise<{ soumission: Soumission; offers: Offer[] } | null> {
	try {
		const r = await apiGet<OneResponse>(`/soumissions/${encodeURIComponent(id)}`);
		return { soumission: r.soumission, offers: r.offers || [] };
	} catch {
		return null;
	}
}

export async function findByToken(token: string): Promise<{ soumission: Soumission; offers: Offer[] } | null> {
	try {
		const r = await apiGet<OneResponse>(`/soumissions/token/${encodeURIComponent(token)}`);
		return { soumission: r.soumission, offers: r.offers || [] };
	} catch {
		return null;
	}
}

export interface NewSoumissionInput {
	client_nom: string;
	client_email: string;
	client_telephone?: string;
	client_adresse?: string;
	projet_adresse?: string;
	projet_type?: string;
	projet_description: string;
	notes_client?: string;
	source?: 'public-form' | 'urgences-form' | 'manual';
	lang?: 'fr' | 'en' | 'es';
	niveau_urgence?: string;
}

export async function appendSoumission(input: NewSoumissionInput): Promise<Soumission | null> {
	try {
		const r = await apiPost<CreateResponse>('/soumissions', input);
		return r.soumission;
	} catch {
		return null;
	}
}

export async function updateSoumission(id: string, patch: Partial<Soumission>): Promise<Soumission | null> {
	try {
		const r = await apiPut<OneResponse>(`/soumissions/${encodeURIComponent(id)}`, patch);
		return r.soumission;
	} catch {
		return null;
	}
}

export async function deleteSoumission(id: string): Promise<boolean> {
	try {
		await apiDelete(`/soumissions/${encodeURIComponent(id)}`);
		return true;
	} catch {
		return false;
	}
}

export async function addAdminOffer(
	soumissionId: string,
	offer: { offer_type?: 'offer' | 'counter-offer' | 'accept' | 'reject'; amount_cents?: number; payment_terms?: string; deadline?: string; notes?: string; articles?: unknown }
): Promise<Offer | null> {
	try {
		const r = await apiPost<OfferResponse>(`/soumissions/${encodeURIComponent(soumissionId)}/offer`, offer);
		return r.offer;
	} catch {
		return null;
	}
}

export async function addClientCounter(
	token: string,
	offer: { offer_type?: 'counter-offer' | 'accept' | 'reject'; amount_cents?: number; payment_terms?: string; deadline?: string; notes?: string; articles?: unknown }
): Promise<{ offer: Offer; status: SoumissionStatus } | null> {
	try {
		const r = await apiPost<OfferResponse>(`/soumissions/token/${encodeURIComponent(token)}/counter`, offer);
		return { offer: r.offer, status: r.status! };
	} catch {
		return null;
	}
}

export async function signByClient(token: string, signature: string, nom: string): Promise<SoumissionStatus | null> {
	try {
		const r = await apiPost<{ ok: true; status: SoumissionStatus }>(`/soumissions/token/${encodeURIComponent(token)}/sign-client`, { signature, nom });
		return r.status;
	} catch {
		return null;
	}
}

export async function signByAdmin(id: string, signature: string, nom: string): Promise<SoumissionStatus | null> {
	try {
		const r = await apiPost<{ ok: true; status: SoumissionStatus }>(`/soumissions/${encodeURIComponent(id)}/sign-admin`, { signature, nom });
		return r.status;
	} catch {
		return null;
	}
}

// ── Admin session check (asks the API who you are) ─────────────────────────
export async function checkAdminSession(): Promise<{ id: number; email: string; name: string; role: string } | null> {
	try {
		const r = await apiGet<{ ok: true; admin: { id: number; email: string; name: string; role: string } }>('/auth/me');
		return r.admin;
	} catch {
		return null;
	}
}

// ── i18n helpers (pure, kept here for backwards compat) ────────────────────
export function statusLabel(s: SoumissionStatus, lang: 'fr' | 'en' | 'es'): string {
	const map: Record<'fr' | 'en' | 'es', Record<SoumissionStatus, string>> = {
		fr: {
			nouvelle: 'Nouvelle',
			en_revision: 'En révision',
			offerte: 'Offre envoyée',
			contre_offre: 'Contre-offre',
			acceptee: 'Acceptée',
			signee_par_les_deux: 'Signée',
			rejetee: 'Rejetée',
			archivee: 'Archivée',
			expiree: 'Expirée'
		},
		en: {
			nouvelle: 'New',
			en_revision: 'Under review',
			offerte: 'Quote sent',
			contre_offre: 'Counter-offer',
			acceptee: 'Accepted',
			signee_par_les_deux: 'Signed',
			rejetee: 'Rejected',
			archivee: 'Archived',
			expiree: 'Expired'
		},
		es: {
			nouvelle: 'Nueva',
			en_revision: 'En revisión',
			offerte: 'Cotización enviada',
			contre_offre: 'Contra-oferta',
			acceptee: 'Aceptada',
			signee_par_les_deux: 'Firmada',
			rejetee: 'Rechazada',
			archivee: 'Archivada',
			expiree: 'Expirada'
		}
	};
	return map[lang][s] || s;
}

export function statusColor(s: SoumissionStatus): string {
	const map: Record<SoumissionStatus, string> = {
		nouvelle: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
		en_revision: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
		offerte: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
		contre_offre: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
		acceptee: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
		signee_par_les_deux: 'bg-emerald-600/20 text-emerald-800 dark:text-emerald-200 border-emerald-600/40',
		rejetee: 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30',
		archivee: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30',
		expiree: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300 border-zinc-500/30'
	};
	return map[s] || map.archivee;
}

// ── Legacy URL-encoded offer token (kept for backward compat with /offre/[token]) ─
export function encodeOfferToken(payload: Record<string, unknown>): string {
	const json = JSON.stringify(payload);
	if (typeof window !== 'undefined' && typeof btoa === 'function') {
		return btoa(unescape(encodeURIComponent(json)))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	}
	return Buffer.from(json, 'utf-8').toString('base64url');
}

export function decodeOfferToken(token: string): Record<string, unknown> | null {
	try {
		const padded = token.replace(/-/g, '+').replace(/_/g, '/');
		const json =
			typeof window !== 'undefined' && typeof atob === 'function'
				? decodeURIComponent(escape(atob(padded)))
				: Buffer.from(padded, 'base64').toString('utf-8');
		return JSON.parse(json);
	} catch {
		return null;
	}
}
