// Diagnostic endpoint. GET /api/ping returns 200 with environment status.
import { Router } from 'express';
import { queryOne } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
	let dbOk = false;
	let dbError = null;
	try {
		const row = await queryOne('SELECT 1 AS ok');
		dbOk = row?.ok === 1;
	} catch (e) {
		dbError = e?.message || String(e);
	}

	res.json({
		ok: true,
		runtime: 'node',
		node_version: process.version,
		time: new Date().toISOString(),
		resend_configured: !!process.env.RESEND,
		jwt_configured: !!process.env.JWT_SECRET,
		db_configured: !!(process.env.DB_USER && process.env.DB_NAME),
		db_ok: dbOk,
		db_error: dbError
	});
});

export default router;
