import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: mysql.Pool | null = null;

function getPool() {
	if (_pool) return _pool;

	const host = process.env.DB_HOST || 'localhost';
	const user = process.env.DB_USER;
	const password = process.env.DB_PASSWORD;
	const database = process.env.DB_NAME;
	const port = Number(process.env.DB_PORT || 3306);

	if (!user || !password || !database) {
		console.warn('[DB] DB credentials missing — DB calls will fail');
	}

	_pool = mysql.createPool({
		host,
		user: user || '',
		password: password || '',
		database: database || '',
		port,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
		charset: 'utf8mb4',
		timezone: 'Z'
	});

	return _pool;
}

export function getDb() {
	if (_db) return _db;
	_db = drizzle(getPool(), { schema, mode: 'default' });
	return _db;
}

// Convenience export — lazy-loaded
export const db = new Proxy({} as ReturnType<typeof getDb>, {
	get(_, prop) {
		const real = getDb();
		// @ts-ignore
		return real[prop];
	}
});

export { schema };
