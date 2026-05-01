import { drizzle } from 'drizzle-orm/libsql';
import { createClient, type Client } from '@libsql/client';
import * as schema from './schema';

let _client: Client | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getClient() {
	if (_client) return _client;

	const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
	const authToken = process.env.TURSO_AUTH_TOKEN;

	if (!url) {
		throw new Error(
			'TURSO_DATABASE_URL not configured. Set it in .env (e.g. libsql://your-db.turso.io or file:local.db)'
		);
	}

	_client = createClient({
		url,
		authToken
	});

	return _client;
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
	get(_, prop) {
		if (!_db) {
			_db = drizzle(getClient(), { schema });
		}
		return Reflect.get(_db, prop);
	}
});

export { schema };
