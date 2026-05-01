import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
if (!url) throw new Error('TURSO_DATABASE_URL not set');

const client = createClient({
	url,
	authToken: process.env.TURSO_AUTH_TOKEN
});
const db = drizzle(client);

async function main() {
	console.log('🔄 Running migrations...');
	await migrate(db, { migrationsFolder: './drizzle' });
	console.log('✅ Migrations complete');
	client.close();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
