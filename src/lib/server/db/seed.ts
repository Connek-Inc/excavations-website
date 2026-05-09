import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import bcrypt from 'bcryptjs';
import * as schema from './schema';

async function main() {
	const pool = mysql.createPool({
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT || 3306),
		user: process.env.DB_USER || '',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || ''
	});
	const db = drizzle(pool, { schema, mode: 'default' });

	const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@excavationserable.com';
	const adminPassword = process.env.SEED_ADMIN_PASSWORD;
	const adminName = process.env.SEED_ADMIN_NAME || 'Admin Mini Excavations Érable';

	if (!adminPassword) {
		console.error('❌ SEED_ADMIN_PASSWORD environment variable is required');
		console.error('   Add to .env: SEED_ADMIN_PASSWORD="YourStrongPassword2026!"');
		process.exit(1);
	}

	const passwordHash = await bcrypt.hash(adminPassword, 12);

	console.log('🌱 Seeding admin user...');
	await db.insert(schema.admins).values({
		email: adminEmail,
		passwordHash,
		name: adminName,
		role: 'superadmin',
		active: true
	});
	console.log(`✅ Admin created: ${adminEmail}`);

	console.log('🌱 Seeding default services...');
	await db.insert(schema.services).values([
		{
			slug: 'drain-francais',
			titleFr: 'Drain Français',
			titleEn: 'French Drain',
			titleEs: 'Drenaje Francés',
			descriptionFr: "Installation, réparation et remplacement de drain français résidentiel et commercial.",
			descriptionEn: 'Residential and commercial French drain installation, repair and replacement.',
			descriptionEs: 'Instalación, reparación y reemplazo de drenaje francés residencial y comercial.',
			icon: '💧',
			priceFromCAD: 4000,
			priceToCAD: 12000,
			featured: true,
			active: true,
			orderIndex: 1
		},
		{
			slug: 'excavation',
			titleFr: 'Excavation',
			titleEn: 'Excavation',
			titleEs: 'Excavación',
			descriptionFr: "Mini-pelles et excavateurs pour terrains restreints et accès difficiles.",
			descriptionEn: 'Mini-excavators for tight spaces and difficult access.',
			descriptionEs: 'Mini-excavadoras para espacios restringidos y accesos difíciles.',
			icon: '🚜',
			priceFromCAD: 95,
			priceToCAD: 195,
			featured: false,
			active: true,
			orderIndex: 2
		},
		{
			slug: 'reparation-fissures',
			titleFr: 'Réparation de Fissures',
			titleEn: 'Crack Repair',
			titleEs: 'Reparación de Grietas',
			descriptionFr: "Injection époxy ou polyuréthane pour fissures de fondation. Garantie 10 ans.",
			descriptionEn: 'Epoxy or polyurethane injection for foundation cracks. 10-year warranty.',
			descriptionEs: 'Inyección epoxi o poliuretano para grietas de cimientos. Garantía 10 años.',
			icon: '🔧',
			priceFromCAD: 450,
			priceToCAD: 1200,
			featured: false,
			active: true,
			orderIndex: 3
		},
		{
			slug: 'demolition',
			titleFr: 'Démolition',
			titleEn: 'Demolition',
			titleEs: 'Demolición',
			descriptionFr: "Démolition résidentielle, garage, piscine. Tri et recyclage écoresponsable.",
			descriptionEn: 'Residential demolition, garage, pool. Eco-friendly sorting and recycling.',
			descriptionEs: 'Demolición residencial, garaje, piscina. Reciclaje ecológico.',
			icon: '🔨',
			priceFromCAD: 12000,
			priceToCAD: 35000,
			featured: false,
			active: true,
			orderIndex: 4
		},
		{
			slug: 'inspection-camera',
			titleFr: 'Inspection Caméra',
			titleEn: 'Camera Inspection',
			titleEs: 'Inspección con Cámara',
			descriptionFr: "Diagnostic HD de drain et égout sans excavation. Rapport vidéo complet.",
			descriptionEn: 'HD drain and sewer diagnosis without excavation. Full video report.',
			descriptionEs: 'Diagnóstico HD sin excavación. Reporte de video completo.',
			icon: '📹',
			priceFromCAD: 250,
			priceToCAD: 600,
			featured: false,
			active: true,
			orderIndex: 5
		}
	]);
	console.log('✅ 5 services created');

	console.log('🌱 Seeding default settings...');
	await db.insert(schema.settings).values([
		{ settingKey: 'site_name', value: 'Mini Excavations Érable' },
		{ settingKey: 'phone', value: '+1 (514) 830-9973' },
		{ settingKey: 'email', value: 'miniexcavationerables@gmail.com' },
		{ settingKey: 'rbq_license', value: '5823-7736-01' },
		{ settingKey: 'address', value: 'Montréal, QC, Canada' }
	]);
	console.log('✅ Settings created');

	console.log('\n🎉 Seed complete! You can now login at /mi/admin/login');
	console.log(`   Email:    ${adminEmail}`);
	console.log(`   Password: (the one you set in SEED_ADMIN_PASSWORD)\n`);

	await pool.end();
}

main().catch((err) => {
	console.error('❌ Seed failed:', err);
	process.exit(1);
});
