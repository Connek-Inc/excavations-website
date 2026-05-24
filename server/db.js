// MySQL connection pool for Hostinger
import mysql from 'mysql2/promise';

let _pool = null;

export function getPool() {
	if (_pool) return _pool;

	const host = process.env.DB_HOST || 'localhost';
	const port = Number(process.env.DB_PORT || 3306);
	const user = process.env.DB_USER;
	const password = process.env.DB_PASSWORD;
	const database = process.env.DB_NAME;

	if (!user || !password || !database) {
		console.warn('[db] DB_USER/DB_PASSWORD/DB_NAME missing — DB calls will fail');
	}

	_pool = mysql.createPool({
		host,
		port,
		user: user || '',
		password: password || '',
		database: database || '',
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
		charset: 'utf8mb4',
		timezone: 'Z',
		dateStrings: false
	});

	return _pool;
}

/** Run a query that returns rows. */
export async function query(sql, params = []) {
	const [rows] = await getPool().execute(sql, params);
	return rows;
}

/** Run a query and return only the first row (or null). */
export async function queryOne(sql, params = []) {
	const rows = await query(sql, params);
	return rows[0] || null;
}

/** Run an INSERT/UPDATE/DELETE and return result metadata. */
export async function execute(sql, params = []) {
	const [result] = await getPool().execute(sql, params);
	return result;
}
