import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { soumissions } from '$lib/server/db/schema';
import { rowToSoumission } from '$lib/server/soumissions/mapper';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async () => {
	const rows = await db.select().from(soumissions).orderBy(desc(soumissions.createdAt));
	return { soumissions: rows.map(rowToSoumission) };
};
