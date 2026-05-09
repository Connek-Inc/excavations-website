import { db } from '$lib/server/db';
import { contacts, blogs, services, reviews } from '$lib/server/db/schema';
import { count, desc, gte, eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const now = new Date();
	const last7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

	const [
		[totalContacts],
		[contacts7d],
		[contacts30d],
		[newContacts],
		[totalBlogs],
		[publishedBlogs],
		[totalServices],
		[totalReviews]
	] = await Promise.all([
		db.select({ c: count() }).from(contacts),
		db.select({ c: count() }).from(contacts).where(gte(contacts.createdAt, last7)),
		db.select({ c: count() }).from(contacts).where(gte(contacts.createdAt, last30)),
		db.select({ c: count() }).from(contacts).where(eq(contacts.status, 'new')),
		db.select({ c: count() }).from(blogs),
		db.select({ c: count() }).from(blogs).where(eq(blogs.published, true)),
		db.select({ c: count() }).from(services),
		db.select({ c: count() }).from(reviews)
	]);

	const recentContacts = await db
		.select()
		.from(contacts)
		.orderBy(desc(contacts.createdAt))
		.limit(8);

	const statusBreakdown = await db
		.select({ status: contacts.status, c: count() })
		.from(contacts)
		.groupBy(contacts.status);

	// Daily stats (last 30 days)
	const dailyStats = await db
		.select({
			day: sql<string>`DATE_FORMAT(${contacts.createdAt}, '%Y-%m-%d')`,
			c: count()
		})
		.from(contacts)
		.where(gte(contacts.createdAt, last30))
		.groupBy(sql`DATE_FORMAT(${contacts.createdAt}, '%Y-%m-%d')`)
		.orderBy(sql`DATE_FORMAT(${contacts.createdAt}, '%Y-%m-%d')`);

	return {
		stats: {
			totalContacts: Number(totalContacts.c),
			contacts7d: Number(contacts7d.c),
			contacts30d: Number(contacts30d.c),
			newContacts: Number(newContacts.c),
			totalBlogs: Number(totalBlogs.c),
			publishedBlogs: Number(publishedBlogs.c),
			totalServices: Number(totalServices.c),
			totalReviews: Number(totalReviews.c)
		},
		recentContacts,
		statusBreakdown,
		dailyStats
	};
};
