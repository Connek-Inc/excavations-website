import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const admins = sqliteTable('admins', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	name: text('name').notNull(),
	role: text('role').notNull().default('admin'),
	lastLoginAt: integer('last_login_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	adminId: integer('admin_id')
		.notNull()
		.references(() => admins.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});

export const contacts = sqliteTable('contacts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull(),
	phone: text('phone'),
	subject: text('subject'),
	message: text('message').notNull(),
	serviceType: text('service_type'),
	preferredDate: integer('preferred_date', { mode: 'timestamp' }),
	status: text('status').notNull().default('new'),
	notes: text('notes'),
	source: text('source').default('website'),
	language: text('language').default('fr'),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});

export const blogs = sqliteTable('blogs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	slug: text('slug').notNull().unique(),
	titleFr: text('title_fr').notNull(),
	titleEn: text('title_en'),
	titleEs: text('title_es'),
	excerptFr: text('excerpt_fr'),
	excerptEn: text('excerpt_en'),
	excerptEs: text('excerpt_es'),
	contentFr: text('content_fr').notNull(),
	contentEn: text('content_en'),
	contentEs: text('content_es'),
	coverImage: text('cover_image'),
	metaTitle: text('meta_title'),
	metaDescription: text('meta_description'),
	metaKeywords: text('meta_keywords'),
	category: text('category'),
	tags: text('tags', { mode: 'json' }).$type<string[]>().default([]),
	published: integer('published', { mode: 'boolean' }).notNull().default(false),
	publishedAt: integer('published_at', { mode: 'timestamp' }),
	views: integer('views').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});

export const services = sqliteTable('services', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	slug: text('slug').notNull().unique(),
	titleFr: text('title_fr').notNull(),
	titleEn: text('title_en'),
	titleEs: text('title_es'),
	descriptionFr: text('description_fr'),
	descriptionEn: text('description_en'),
	descriptionEs: text('description_es'),
	icon: text('icon'),
	image: text('image'),
	priceFrom: integer('price_from'),
	displayOrder: integer('display_order').notNull().default(0),
	featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
	active: integer('active', { mode: 'boolean' }).notNull().default(true),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});

export const settings = sqliteTable('settings', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	key: text('key').notNull().unique(),
	value: text('value', { mode: 'json' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});

export const analytics = sqliteTable('analytics', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	path: text('path').notNull(),
	referrer: text('referrer'),
	userAgent: text('user_agent'),
	ipAddress: text('ip_address'),
	language: text('language'),
	country: text('country'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});

export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type Setting = typeof settings.$inferSelect;
export type Session = typeof sessions.$inferSelect;
