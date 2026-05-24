import { redirect } from '@sveltejs/kit';
import { eq, desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { soumissions } from '$lib/server/db/schema';
import { rowToSoumission } from '$lib/server/soumissions/mapper';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.client) throw redirect(303, '/compte/login');

	const rows = await db
		.select()
		.from(soumissions)
		.where(eq(soumissions.clientId, locals.client.id))
		.orderBy(desc(soumissions.createdAt));

	return {
		client: locals.client,
		soumissions: rows.map(rowToSoumission)
	};
};
