import { db } from '$lib/server/db';
import { soumissions } from '$lib/server/db/schema';
import { desc, like, or, eq, and, count, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const search = url.searchParams.get('q')?.trim() || '';
	const statut = url.searchParams.get('statut') || '';
	const pageNum = Math.max(1, Number(url.searchParams.get('page')) || 1);
	const pageSize = 25;

	const conditions = [];
	if (search) {
		const q = `%${search.toLowerCase()}%`;
		conditions.push(
			or(
				like(sql`LOWER(${soumissions.clientNom})`, q),
				like(sql`LOWER(${soumissions.numero})`, q),
				like(sql`LOWER(${soumissions.projetAdresse})`, q)
			)
		);
	}
	if (statut) {
		conditions.push(eq(soumissions.statut, statut as any));
	}
	const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

	const [items, [{ c: total }]] = await Promise.all([
		db
			.select({
				id: soumissions.id,
				token: soumissions.token,
				numero: soumissions.numero,
				statut: soumissions.statut,
				clientNom: soumissions.clientNom,
				projetAdresse: soumissions.projetAdresse,
				dateSoumission: soumissions.dateSoumission,
				sousTotal: soumissions.sousTotal,
				sentAt: soumissions.sentAt,
				createdAt: soumissions.createdAt,
				updatedAt: soumissions.updatedAt
			})
			.from(soumissions)
			.where(whereClause)
			.orderBy(desc(soumissions.updatedAt))
			.limit(pageSize)
			.offset((pageNum - 1) * pageSize),
		db.select({ c: count() }).from(soumissions).where(whereClause)
	]);

	return {
		items,
		total: Number(total),
		page: pageNum,
		pageSize,
		filters: { search, statut }
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'ID requis' });
		await db.delete(soumissions).where(eq(soumissions.id, id));
		return { success: true };
	}
};
