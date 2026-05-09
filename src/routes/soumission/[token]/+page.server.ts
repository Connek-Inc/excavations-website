import { db } from '$lib/server/db';
import { soumissions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;
export const csr = true;

export const load: PageServerLoad = async ({ params }) => {
	const token = params.token;
	if (!token) throw error(404, 'Soumission introuvable');

	const rows = await db
		.select()
		.from(soumissions)
		.where(eq(soumissions.token, token))
		.limit(1);
	const row = rows[0];
	if (!row) throw error(404, 'Soumission introuvable');

	// Bloque l'accès tant que l'admin n'a pas marqué la soumission comme envoyée
	if (row.statut === 'Brouillon' && !row.sentAt) {
		throw error(403, "Cette soumission n'est pas encore disponible.");
	}

	return {
		soumission: row
	};
};
