import { apiGet, apiPost, apiPut, apiDelete } from '$lib/api/client';

export interface Review {
	id: number;
	author_name: string;
	author_city: string | null;
	rating: number;
	text_fr: string;
	text_en: string | null;
	text_es: string | null;
	service_type: string | null;
	published_at: string;
	verified: 0 | 1;
	featured: 0 | 1;
	created_at: string;
	updated_at: string;
}

export async function listReviews(opts: { featured?: boolean } = {}): Promise<Review[]> {
	try {
		const q = opts.featured ? '?featured=1' : '';
		const r = await apiGet<{ ok: true; reviews: Review[] }>(`/reviews${q}`);
		return r.reviews;
	} catch {
		return [];
	}
}

export async function createReview(input: Partial<Review>): Promise<Review | null> {
	try {
		const r = await apiPost<{ ok: true; review: Review }>('/reviews', input);
		return r.review;
	} catch {
		return null;
	}
}

export async function updateReview(id: number, input: Partial<Review>): Promise<Review | null> {
	try {
		const r = await apiPut<{ ok: true; review: Review }>(`/reviews/${id}`, input);
		return r.review;
	} catch {
		return null;
	}
}

export async function deleteReview(id: number): Promise<boolean> {
	try {
		await apiDelete(`/reviews/${id}`);
		return true;
	} catch {
		return false;
	}
}
