/**
 * High-level wrappers around the Connek `/api/v1/quotes*` endpoints.
 * All HMAC-signing is delegated to `connekFetch`; the magic-link
 * `/access/{token}/*` endpoints are called with `tokenOnly: true` so
 * we don't sign with the partner secret on behalf of a client action.
 */

import { connekFetch } from './api';

// ── Types matching the backend payloads/responses ──────────────────────

export interface QuoteLineItem {
	description: string;
	quantity: number;
	unit_price_cents: number;
	amount_cents: number;
}

export interface SubmissionPayload {
	client_first_name: string;
	client_last_name?: string;
	client_email: string;
	client_phone: string; // backend requires ≥10 digits
	client_address?: string;
	// Project context — aligned with the requests model.
	category?: string;
	subcategory?: string;
	location?: string; // project address
	project_description: string;
	client_notes?: string;
	// Optional severity flag persisted on the request row. The urgency
	// funnel always sends "urgent" so emergencies jump to the top of the
	// business' inbox.
	urgency?: string;
	expires_in_days?: number;
}

export interface SubmissionResponse {
	quote_id: number;
	client_id: number;
	client_registration_status: 'lite' | 'verified' | 'full';
	quote_kind: 'submission';
	status: 'nouvelle';
	token: string;
}

export interface ViewQuoteResponse {
	quote: {
		id: number;
		business_id: number;
		quote_kind: 'basic' | 'submission';
		status: string;
		amount_cents: number;
		currency: string | null;
		description: string | null;
		client_address: string | null;
		project_address: string | null;
		project_type: string | null;
		client_notes: string | null;
		terms: string | null;
		line_items: unknown[];
		taxes: unknown;
		expires_at: string | null;
		accepted_at: string | null;
		declined_at: string | null;
		client_signed_at: string | null;
		client_signed_name: string | null;
		business_signed_at: string | null;
		created_at: string;
	};
	offers: Array<{
		id: number;
		offered_by: 'business' | 'client';
		amount_cents: number;
		line_items: unknown[];
		message: string | null;
		status: 'pending' | 'accepted' | 'rejected' | 'superseded';
		created_at: string;
	}>;
	client: {
		id: number;
		first_name: string | null;
		last_name: string | null;
		email: string | null;
		registration_status: 'lite' | 'verified' | 'full' | null;
	};
	business: {
		id: number;
		name: string | null;
		profile_image: string | null;
	};
	token: {
		scopes: string[];
		expires_at: string;
	};
}

export interface CounterOfferPayload {
	amount_cents: number;
	line_items?: QuoteLineItem[];
	message?: string;
}

export interface SignPayload {
	name: string;
}

export interface BusinessProfile {
	id: number;
	name: string | null;
	category: string | null;
	description: string | null;
	business_email: string | null;
	phone: string | null;
	url: string | null;
	profile_image: string | null;
	banner_image: string | null;
	address: string | null;
	instagram_handle: string | null;
	tiktok_handle: string | null;
	facebook_handle: string | null;
	whatsapp_handle: string | null;
	opening_hours: unknown;
	validated: boolean | null;
	invoice_terms: string | null;
	quote_terms: string | null;
}

export interface PublicService {
	id: number;
	name: string | null;
	description: string | null;
	price_cents: number | null;
	duration_minutes: number | null;
	images: unknown;
	profile_image: string | null;
	business_id: number;
}

// ── Wrappers ───────────────────────────────────────────────────────────

/** Submit a quote request from a public landing form. HMAC-signed. */
export function createSubmission(payload: SubmissionPayload): Promise<SubmissionResponse> {
	return connekFetch<SubmissionResponse>('/api/v1/quotes/submission', {
		method: 'POST',
		body: payload
	});
}

/** Magic-link token-only endpoints — never signed with the partner secret.
 * The token IS the credential, so we forward it as part of the URL only. */
export function viewQuoteByToken(token: string): Promise<ViewQuoteResponse> {
	return connekFetch<ViewQuoteResponse>(`/api/v1/quotes/access/${encodeURIComponent(token)}`, {
		method: 'GET',
		tokenOnly: true
	});
}

export function counterOfferByToken(
	token: string,
	payload: CounterOfferPayload
): Promise<{ ok: true }> {
	return connekFetch(`/api/v1/quotes/access/${encodeURIComponent(token)}/counter`, {
		method: 'POST',
		body: payload,
		tokenOnly: true
	});
}

export function signByToken(
	token: string,
	payload: SignPayload
): Promise<{ ok: true; accepted_offer_id: number }> {
	return connekFetch(`/api/v1/quotes/access/${encodeURIComponent(token)}/sign`, {
		method: 'POST',
		body: payload,
		tokenOnly: true
	});
}

/** HMAC-signed reads of the business + its services for the landing UI. */
export function getBusinessProfile(): Promise<{ data: BusinessProfile }> {
	return connekFetch<{ data: BusinessProfile }>('/api/v1/business/profile');
}

export function listServices(): Promise<{ data: PublicService[]; business_id: number }> {
	return connekFetch<{ data: PublicService[]; business_id: number }>('/api/v1/services');
}
