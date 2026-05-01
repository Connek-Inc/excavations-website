import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import * as schema from './schema';

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
if (!url) throw new Error('TURSO_DATABASE_URL not set');

const client = createClient({
	url,
	authToken: process.env.TURSO_AUTH_TOKEN
});
const db = drizzle(client, { schema });

async function seed() {
	console.log('🌱 Seeding database...');

	const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@miniexcavationserable.com';
	const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe2026!';
	const adminName = process.env.SEED_ADMIN_NAME || 'Administrator';

	const passwordHash = await bcrypt.hash(adminPassword, 12);

	const existing = await db.query.admins.findFirst({
		where: (a, { eq }) => eq(a.email, adminEmail)
	});

	if (existing) {
		console.log(`✓ Admin ${adminEmail} already exists`);
	} else {
		await db.insert(schema.admins).values({
			email: adminEmail,
			passwordHash,
			name: adminName,
			role: 'super_admin'
		});
		console.log(`✓ Created admin: ${adminEmail}`);
		console.log(`  Password: ${adminPassword}`);
		console.log('  ⚠️  Change this password immediately after first login');
	}

	const defaultServices = [
		{
			slug: 'drain-francais',
			titleFr: 'Drain Français',
			titleEn: 'French Drain',
			titleEs: 'Drenaje Francés',
			descriptionFr: 'Installation et réparation de drain français au Québec.',
			descriptionEn: 'French drain installation and repair in Quebec.',
			descriptionEs: 'Instalación y reparación de drenaje francés en Quebec.',
			icon: 'Droplets',
			displayOrder: 1,
			featured: true
		},
		{
			slug: 'excavation',
			titleFr: 'Excavation',
			titleEn: 'Excavation',
			titleEs: 'Excavación',
			descriptionFr: "Services complets d'excavation résidentielle et commerciale.",
			descriptionEn: 'Complete residential and commercial excavation services.',
			descriptionEs: 'Servicios completos de excavación residencial y comercial.',
			icon: 'Truck',
			displayOrder: 2,
			featured: true
		},
		{
			slug: 'reparation-fissures',
			titleFr: 'Réparation de Fissures',
			titleEn: 'Crack Repair',
			titleEs: 'Reparación de Grietas',
			descriptionFr: 'Réparation de fissures de fondation par injection.',
			descriptionEn: 'Foundation crack repair by injection.',
			descriptionEs: 'Reparación de grietas de cimientos por inyección.',
			icon: 'Wrench',
			displayOrder: 3,
			featured: true
		},
		{
			slug: 'demolition',
			titleFr: 'Démolition',
			titleEn: 'Demolition',
			titleEs: 'Demolición',
			descriptionFr: 'Démolition résidentielle et commerciale sécuritaire.',
			descriptionEn: 'Safe residential and commercial demolition.',
			descriptionEs: 'Demolición residencial y comercial segura.',
			icon: 'Hammer',
			displayOrder: 4,
			featured: true
		},
		{
			slug: 'inspection-camera',
			titleFr: 'Inspection par Caméra',
			titleEn: 'Camera Inspection',
			titleEs: 'Inspección con Cámara',
			descriptionFr: 'Diagnostic précis sans excavation.',
			descriptionEn: 'Precise diagnostics without excavation.',
			descriptionEs: 'Diagnóstico preciso sin excavación.',
			icon: 'Camera',
			displayOrder: 5,
			featured: true
		}
	];

	for (const svc of defaultServices) {
		const exists = await db.query.services.findFirst({
			where: (s, { eq }) => eq(s.slug, svc.slug)
		});
		if (!exists) {
			await db.insert(schema.services).values(svc);
			console.log(`✓ Service: ${svc.slug}`);
		}
	}

	const defaultSettings = [
		{ key: 'site_name', value: { value: 'Mini Excavations Érable' } },
		{ key: 'phone', value: { value: '+1-514-830-9973' } },
		{ key: 'email', value: { value: 'info@miniexcavationserable.com' } },
		{
			key: 'social',
			value: {
				facebook: '',
				instagram: '',
				linkedin: ''
			}
		},
		{
			key: 'business_hours',
			value: {
				monday: '07:00-18:00',
				tuesday: '07:00-18:00',
				wednesday: '07:00-18:00',
				thursday: '07:00-18:00',
				friday: '07:00-18:00',
				saturday: '08:00-15:00',
				sunday: 'closed'
			}
		}
	];

	for (const s of defaultSettings) {
		const exists = await db.query.settings.findFirst({
			where: (st, { eq }) => eq(st.key, s.key)
		});
		if (!exists) {
			await db.insert(schema.settings).values(s);
			console.log(`✓ Setting: ${s.key}`);
		}
	}

	console.log('✅ Seed complete');
	client.close();
}

seed().catch((err) => {
	console.error(err);
	process.exit(1);
});
