import { db } from '$lib/server/db';
import { contacts } from '$lib/server/db/schema';
import { desc, like, or, eq, and, count, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const search = url.searchParams.get('q')?.trim() || '';
	const status = url.searchParams.get('status') || '';
	const pageNum = Math.max(1, Number(url.searchParams.get('page')) || 1);
	const pageSize = 25;

	const conditions = [];
	if (search) {
		const q = `%${search.toLowerCase()}%`;
		conditions.push(
			or(
				like(sql`LOWER(${contacts.name})`, q),
				like(sql`LOWER(${contacts.email})`, q),
				like(sql`LOWER(${contacts.message})`, q),
				like(sql`LOWER(${contacts.phone})`, q)
			)
		);
	}
	if (status) {
		conditions.push(eq(contacts.status, status as any));
	}
	const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

	const [items, [{ c: total }]] = await Promise.all([
		db
			.select()
			.from(contacts)
			.where(whereClause)
			.orderBy(desc(contacts.createdAt))
			.limit(pageSize)
			.offset((pageNum - 1) * pageSize),
		db.select({ c: count() }).from(contacts).where(whereClause)
	]);

	return {
		items,
		total: Number(total),
		page: pageNum,
		pageSize,
		filters: { search, status }
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'ID requis' });
		await db.delete(contacts).where(eq(contacts.id, id));
		return { success: true };
	}
};
