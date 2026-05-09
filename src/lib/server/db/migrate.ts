import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';

async function main() {
	const pool = mysql.createPool({
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env.DB_PORT || 3306),
		user: process.env.DB_USER || '',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || '',
		multipleStatements: true
	});
	const db = drizzle(pool);
	console.log('🔄 Running migrations...');
	await migrate(db, { migrationsFolder: './drizzle' });
	console.log('✅ Migrations complete');
	await pool.end();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
