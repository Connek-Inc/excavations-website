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

// ─────────────────────────────────────────────
// clients — cuentas de clientes (auth para /compte y /soumission)
// ─────────────────────────────────────────────
export const clients = mysqlTable(
	'clients',
	{
		id: int('id').autoincrement().primaryKey(),
		email: varchar('email', { length: 255 }).notNull(),
		passwordHash: varchar('password_hash', { length: 255 }).notNull(),
		name: varchar('name', { length: 100 }).notNull(),
		telephone: varchar('telephone', { length: 50 }),
		adresse: varchar('adresse', { length: 255 }),
		emailVerified: boolean('email_verified').notNull().default(false),
		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
	},
	(t) => ({
		emailIdx: uniqueIndex('clients_email_idx').on(t.email)
	})
);

// ─────────────────────────────────────────────
// client_sessions — sesiones de clientes
// ─────────────────────────────────────────────
export const clientSessions = mysqlTable(
	'client_sessions',
	{
		id: varchar('id', { length: 64 }).primaryKey(),
		clientId: int('client_id').notNull(),
		expiresAt: timestamp('expires_at').notNull(),
		userAgent: varchar('user_agent', { length: 500 }),
		ipAddress: varchar('ip_address', { length: 45 }),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(t) => ({
		clientIdx: index('client_sessions_client_idx').on(t.clientId),
		expiresIdx: index('client_sessions_expires_idx').on(t.expiresAt)
	})
);

// ─────────────────────────────────────────────
// password_resets — tokens para recuperar contraseña
// ─────────────────────────────────────────────
export const passwordResets = mysqlTable(
	'password_resets',
	{
		id: int('id').autoincrement().primaryKey(),
		clientId: int('client_id').notNull(),
		token: varchar('token', { length: 64 }).notNull(),
		expiresAt: timestamp('expires_at').notNull(),
		usedAt: timestamp('used_at'),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(t) => ({
		tokenIdx: uniqueIndex('password_resets_token_idx').on(t.token),
		clientIdx: index('password_resets_client_idx').on(t.clientId)
	})
);

// ─────────────────────────────────────────────
// soumissions — cotizaciones con counter-offers y firma
// ─────────────────────────────────────────────
export const soumissions = mysqlTable(
	'soumissions',
	{
		id: varchar('id', { length: 36 }).primaryKey(),
		clientId: int('client_id'),
		clientToken: varchar('client_token', { length: 64 }).notNull(),

		clientNom: varchar('client_nom', { length: 200 }).notNull(),
		clientEmail: varchar('client_email', { length: 255 }).notNull(),
		clientTelephone: varchar('client_telephone', { length: 50 }),
		clientAdresse: varchar('client_adresse', { length: 255 }),
		projetAdresse: varchar('projet_adresse', { length: 255 }),
		projetDescription: text('projet_description').notNull(),
		projetType: varchar('projet_type', { length: 100 }),

		statut: mysqlEnum('statut', [
			'nouvelle',
			'en_revision',
			'offerte',
			'contre_offre',
			'acceptee',
			'signee_par_les_deux',
			'rejetee',
			'expiree'
		])
			.notNull()
			.default('nouvelle'),

		numero: varchar('numero', { length: 50 }),
		dateSoumission: varchar('date_soumission', { length: 10 }),

		sousTotal: int('sous_total_cents').notNull().default(0),
		tps: int('tps_cents').notNull().default(0),
		tvq: int('tvq_cents').notNull().default(0),
		total: int('total_cents').notNull().default(0),

		articles: json('articles').$type<{ description: string; quantite: number; prix_unitaire: number }[]>(),
		modalites: json('modalites').$type<{ label: string; pourcentage: number }[]>(),
		sections: json('sections').$type<Record<string, string>>(),

		notesAdmin: text('notes_admin'),
		notesClient: text('notes_client'),

		signatureClient: text('signature_client'),
		signatureClientAt: timestamp('signature_client_at'),
		signatureClientNom: varchar('signature_client_nom', { length: 200 }),

		signatureAdmin: text('signature_admin'),
		signatureAdminAt: timestamp('signature_admin_at'),
		signatureAdminNom: varchar('signature_admin_nom', { length: 200 }),

		expireLe: varchar('expire_le', { length: 10 }),

		createdAt: timestamp('created_at').notNull().defaultNow(),
		updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
	},
	(t) => ({
		tokenIdx: uniqueIndex('soumissions_token_idx').on(t.clientToken),
		clientIdx: index('soumissions_client_idx').on(t.clientId),
		statutIdx: index('soumissions_statut_idx').on(t.statut),
		createdIdx: index('soumissions_created_idx').on(t.createdAt)
	})
);

// ─────────────────────────────────────────────
// soumission_versions — historial de offre/contre-offre
// ─────────────────────────────────────────────
export const soumissionVersions = mysqlTable(
	'soumission_versions',
	{
		id: int('id').autoincrement().primaryKey(),
		soumissionId: varchar('soumission_id', { length: 36 }).notNull(),
		versionNum: int('version_num').notNull(),
		type: mysqlEnum('type', ['offre_admin', 'contre_offre_client']).notNull(),
		auteur: varchar('auteur', { length: 50 }).notNull(),
		message: text('message'),
		sousTotal: int('sous_total_cents'),
		total: int('total_cents'),
		articles: json('articles').$type<{ description: string; quantite: number; prix_unitaire: number }[]>(),
		modalites: json('modalites').$type<{ label: string; pourcentage: number }[]>(),
		sections: json('sections').$type<Record<string, string>>(),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(t) => ({
		soumissionIdx: index('soumission_versions_soumission_idx').on(t.soumissionId)
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
export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type ClientSession = typeof clientSessions.$inferSelect;
export type Soumission = typeof soumissions.$inferSelect;
export type NewSoumission = typeof soumissions.$inferInsert;
export type SoumissionVersion = typeof soumissionVersions.$inferSelect;
export type NewSoumissionVersion = typeof soumissionVersions.$inferInsert;
export type PasswordReset = typeof passwordResets.$inferSelect;
