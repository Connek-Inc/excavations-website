import {
	mysqlTable,
	int,
	varchar,
	text,
	timestamp,
	boolean,
	json,
	mysqlEnum,
	uniqueIndex,
	index
} from 'drizzle-orm/mysql-core';

// ─────────────────────────────────────────────
// admins — usuarios del panel /mi/admin
// ─────────────────────────────────────────────
export const admins = mysqlTable(
	'admins',
	{
		id: int('id').autoincrement().primaryKey(),
		email: varchar('email', { length: 255 }).notNull(),
		passwordHash: varchar('password_hash', { length: 255 }).notNull(),
		name: varchar('name', { length: 100 }).notNull(),
		role: mysqlEnum('role', ['superadmin', 'admin', 'editor']).notNull().default('admin'),
		active: boolean('active').notNull().default(true),
		lastLoginAt: timestamp('last_login_at'),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
	},
	(t) => ({
		emailIdx: uniqueIndex('admins_email_idx').on(t.email)
	})
);

// ─────────────────────────────────────────────
// sessions — JWT sessions server-side
// ─────────────────────────────────────────────
export const sessions = mysqlTable(
	'sessions',
	{
		id: varchar('id', { length: 64 }).primaryKey(),
		adminId: int('admin_id').notNull(),
		expiresAt: timestamp('expires_at').notNull(),
		userAgent: varchar('user_agent', { length: 500 }),
		ipAddress: varchar('ip_address', { length: 45 }),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(t) => ({
		adminIdx: index('sessions_admin_idx').on(t.adminId),
		expiresIdx: index('sessions_expires_idx').on(t.expiresAt)
	})
);

// ─────────────────────────────────────────────
// contacts — leads del formulario público
// ─────────────────────────────────────────────
export const contacts = mysqlTable(
	'contacts',
	{
		id: int('id').autoincrement().primaryKey(),
		name: varchar('name', { length: 100 }).notNull(),
		email: varchar('email', { length: 255 }).notNull(),
		phone: varchar('phone', { length: 50 }),
		subject: varchar('subject', { length: 200 }),
		message: text('message').notNull(),
		serviceType: varchar('service_type', { length: 100 }),
		preferredDate: timestamp('preferred_date'),
		language: varchar('language', { length: 5 }).default('fr'),
		source: varchar('source', { length: 50 }).default('website'),
		status: mysqlEnum('status', ['new', 'contacted', 'quoted', 'won', 'lost', 'archived'])
			.notNull()
			.default('new'),
		notes: text('notes'),
		ipAddress: varchar('ip_address', { length: 45 }),
		userAgent: varchar('user_agent', { length: 500 }),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
	},
	(t) => ({
		statusIdx: index('contacts_status_idx').on(t.status),
		createdIdx: index('contacts_created_idx').on(t.createdAt)
	})
);

// ─────────────────────────────────────────────
// blogs — artículos editables
// ─────────────────────────────────────────────
export const blogs = mysqlTable(
	'blogs',
	{
		id: int('id').autoincrement().primaryKey(),
		slug: varchar('slug', { length: 200 }).notNull(),
		titleFr: varchar('title_fr', { length: 200 }).notNull(),
		titleEn: varchar('title_en', { length: 200 }),
		titleEs: varchar('title_es', { length: 200 }),
		excerptFr: text('excerpt_fr'),
		excerptEn: text('excerpt_en'),
		excerptEs: text('excerpt_es'),
		contentFr: text('content_fr').notNull(),
		contentEn: text('content_en'),
		contentEs: text('content_es'),
		coverImage: varchar('cover_image', { length: 500 }),
		metaTitle: varchar('meta_title', { length: 200 }),
		metaDescription: varchar('meta_description', { length: 500 }),
		metaKeywords: text('meta_keywords'),
		category: varchar('category', { length: 100 }),
		tags: json('tags').$type<string[]>(),
		published: boolean('published').notNull().default(false),
		publishedAt: timestamp('published_at'),
		views: int('views').notNull().default(0),
		authorId: int('author_id'),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
	},
	(t) => ({
		slugIdx: uniqueIndex('blogs_slug_idx').on(t.slug),
		publishedIdx: index('blogs_published_idx').on(t.published)
	})
);

// ─────────────────────────────────────────────
// services — servicios mostrados en home
// ─────────────────────────────────────────────
export const services = mysqlTable(
	'services',
	{
		id: int('id').autoincrement().primaryKey(),
		slug: varchar('slug', { length: 100 }).notNull(),
		titleFr: varchar('title_fr', { length: 100 }).notNull(),
		titleEn: varchar('title_en', { length: 100 }),
		titleEs: varchar('title_es', { length: 100 }),
		descriptionFr: text('description_fr').notNull(),
		descriptionEn: text('description_en'),
		descriptionEs: text('description_es'),
		icon: varchar('icon', { length: 50 }),
		image: varchar('image', { length: 500 }),
		priceFromCAD: int('price_from_cad'),
		priceToCAD: int('price_to_cad'),
		featured: boolean('featured').notNull().default(false),
		active: boolean('active').notNull().default(true),
		orderIndex: int('order_index').notNull().default(0),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
	},
	(t) => ({
		slugIdx: uniqueIndex('services_slug_idx').on(t.slug)
	})
);

// ─────────────────────────────────────────────
// reviews — testimonios
// ─────────────────────────────────────────────
export const reviews = mysqlTable('reviews', {
	id: int('id').autoincrement().primaryKey(),
	authorName: varchar('author_name', { length: 100 }).notNull(),
	authorCity: varchar('author_city', { length: 100 }),
	rating: int('rating').notNull().default(5),
	textFr: text('text_fr').notNull(),
	textEn: text('text_en'),
	textEs: text('text_es'),
	serviceType: varchar('service_type', { length: 100 }),
	publishedAt: timestamp('published_at').notNull().defaultNow(),
	verified: boolean('verified').notNull().default(false),
	featured: boolean('featured').notNull().default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
});

// ─────────────────────────────────────────────
// settings — config global key-value
// ─────────────────────────────────────────────
export const settings = mysqlTable(
	'settings',
	{
		id: int('id').autoincrement().primaryKey(),
		settingKey: varchar('setting_key', { length: 100 }).notNull(),
		value: text('value'),
		valueJson: json('value_json'),
		updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
	},
	(t) => ({
		keyIdx: uniqueIndex('settings_key_idx').on(t.settingKey)
	})
);

// ─────────────────────────────────────────────
// analytics — eventos internos (opcional)
// ─────────────────────────────────────────────
export const analytics = mysqlTable(
	'analytics',
	{
		id: int('id').autoincrement().primaryKey(),
		event: varchar('event', { length: 100 }).notNull(),
		path: varchar('path', { length: 500 }),
		referrer: varchar('referrer', { length: 500 }),
		userAgent: varchar('user_agent', { length: 500 }),
		ipAddress: varchar('ip_address', { length: 45 }),
		metadata: json('metadata'),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(t) => ({
		eventIdx: index('analytics_event_idx').on(t.event),
		createdIdx: index('analytics_created_idx').on(t.createdAt)
	})
);

// Type exports for use in routes
export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type Setting = typeof settings.$inferSelect;
