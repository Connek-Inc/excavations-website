import { db } from '$lib/server/db';
import { contacts, blogs, services } from '$lib/server/db/schema';
import { count, desc, eq, gte, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const now = new Date();
	const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
	const last7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

	const [
		totalContacts,
		newContacts,
		contacts7d,
		contacts30d,
		totalBlogs,
		publishedBlogs,
		totalServices,
		recentContacts,
		statusBreakdown
	] = await Promise.all([
		db.select({ c: count() }).from(contacts),
		db.select({ c: count() }).from(contacts).where(eq(contacts.status, 'new')),
		db.select({ c: count() }).from(contacts).where(gte(contacts.createdAt, last7)),
		db.select({ c: count() }).from(contacts).where(gte(contacts.createdAt, last30)),
		db.select({ c: count() }).from(blogs),
		db.select({ c: count() }).from(blogs).where(eq(blogs.published, true)),
		db.select({ c: count() }).from(services).where(eq(services.active, true)),
		db.select().from(contacts).orderBy(desc(contacts.createdAt)).limit(8),
		db
			.select({
				status: contacts.status,
				c: count()
			})
			.from(contacts)
			.groupBy(contacts.status)
	]);

	const dailyStats = await db
		.select({
			day: sql<string>`strftime('%Y-%m-%d', ${contacts.createdAt}, 'unixepoch')`,
			c: count()
		})
		.from(contacts)
		.where(gte(contacts.createdAt, last30))
		.groupBy(sql`strftime('%Y-%m-%d', ${contacts.createdAt}, 'unixepoch')`)
		.orderBy(sql`strftime('%Y-%m-%d', ${contacts.createdAt}, 'unixepoch')`);

	return {
		stats: {
			totalContacts: totalContacts[0]?.c ?? 0,
			newContacts: newContacts[0]?.c ?? 0,
			contacts7d: contacts7d[0]?.c ?? 0,
			contacts30d: contacts30d[0]?.c ?? 0,
			totalBlogs: totalBlogs[0]?.c ?? 0,
			publishedBlogs: publishedBlogs[0]?.c ?? 0,
			totalServices: totalServices[0]?.c ?? 0
		},
		recentContacts,
		statusBreakdown,
		dailyStats
	};
};
