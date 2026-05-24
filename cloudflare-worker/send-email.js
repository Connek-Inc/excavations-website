/**
 * Cloudflare Worker — Resend proxy for excavationserable.com
 *
 * SETUP (5 min):
 * 1. https://dash.cloudflare.com → Workers & Pages → Create → Hello World
 * 2. Reemplazá todo el código con este archivo
 * 3. Save and deploy
 * 4. Settings → Variables → "Add variable" (Encrypt):
 *      RESEND_API_KEY = re_G6rZbpRM_8hLbWCLk4C8LS8kfRgUfQ7ZM
 *      EMAIL_FROM     = Mini Excavations Érable <onboarding@resend.dev>
 *      ADMIN_EMAIL    = miniexcavationerable@gmail.com
 * 5. Triggers → Custom Domain (opcional, sino usá la URL por defecto
 *    tipo https://send-email.<tu-username>.workers.dev)
 * 6. Copiá esa URL y pegámela aquí en el chat — yo la cableo a las dos
 *    forms (SoumissionForm + UrgencyStepForm) en una sola línea.
 */

const CORS = {
	'Access-Control-Allow-Origin': 'https://excavationserable.com',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
		if (request.method !== 'POST') {
			return json({ ok: false, error: 'method not allowed' }, 405);
		}

		let body;
		try {
			body = await request.json();
		} catch {
			return json({ ok: false, error: 'invalid json' }, 400);
		}

		const {
			type = 'soumission',
			name = '',
			email = '',
			phone = '',
			adresse_personnelle,
			adresse_projet,
			type_projet,
			description,
			notes,
			niveau_urgence,
			type_probleme,
			langue = 'fr',
			confirmation_au_client = ''
		} = body || {};

		if (!email || !name) return json({ ok: false, error: 'name + email required' }, 400);
		if (!env.RESEND_API_KEY) return json({ ok: false, error: 'RESEND_API_KEY not set' }, 500);

		const FROM = env.EMAIL_FROM || 'Mini Excavations Érable <onboarding@resend.dev>';
		const ADMIN = env.ADMIN_EMAIL || 'miniexcavationerable@gmail.com';

		const isUrgence = type === 'urgence';
		const subject = isUrgence
			? `URGENCE — ${name} (${type_probleme || 'à préciser'})`
			: `Nouveau lead: ${name}${type_projet ? ` — ${type_projet}` : ''}`;

		const adminHtml = adminBody({
			isUrgence,
			name,
			email,
			phone,
			adresse_personnelle,
			adresse_projet,
			type_projet,
			description,
			notes,
			niveau_urgence,
			type_probleme,
			langue
		});

		const errors = [];

		// 1) Admin notification
		const adminRes = await sendResend(env.RESEND_API_KEY, {
			from: FROM,
			to: [ADMIN],
			reply_to: email,
			subject,
			html: adminHtml
		});
		if (!adminRes.ok) errors.push(`admin: ${adminRes.error}`);

		// 2) Client confirmation copy
		if (confirmation_au_client) {
			const clientRes = await sendResend(env.RESEND_API_KEY, {
				from: FROM,
				to: [email],
				reply_to: ADMIN,
				subject:
					langue === 'en'
						? 'We received your request — Mini Excavations Érable'
						: langue === 'es'
							? 'Recibimos su solicitud — Mini Excavations Érable'
							: 'Nous avons bien reçu votre demande — Mini Excavations Érable',
				html: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0a0a;white-space:pre-wrap">${escapeHtml(confirmation_au_client)}</div>`
			});
			if (!clientRes.ok) errors.push(`client: ${clientRes.error}`);
		}

		const adminFailed = errors.some((e) => e.startsWith('admin:'));
		if (adminFailed) return json({ ok: false, errors }, 500);
		return json({ ok: true, warnings: errors });
	}
};

async function sendResend(apiKey, payload) {
	try {
		const r = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
		if (!r.ok) {
			const txt = await r.text();
			return { ok: false, error: `HTTP ${r.status} ${txt.slice(0, 200)}` };
		}
		return { ok: true };
	} catch (e) {
		return { ok: false, error: String(e?.message || e) };
	}
}

function json(data, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json', ...CORS }
	});
}

function adminBody(d) {
	const rows = [];
	if (d.isUrgence) {
		rows.push(row('Type', 'URGENCE 🚨'));
		rows.push(row('Problème', d.type_probleme || '—'));
		rows.push(row('Niveau urgence', d.niveau_urgence || '—'));
	} else {
		rows.push(row('Type projet', d.type_projet || '—'));
	}
	rows.push(row('Nom', d.name));
	rows.push(row('Courriel', `<a href="mailto:${esc(d.email)}">${escapeHtml(d.email)}</a>`));
	if (d.phone) rows.push(row('Téléphone', `<a href="tel:${esc(d.phone)}">${escapeHtml(d.phone)}</a>`));
	if (d.adresse_personnelle) rows.push(row('Adresse personnelle', d.adresse_personnelle));
	if (d.adresse_projet) rows.push(row('Adresse projet', d.adresse_projet));
	rows.push(row('Description', `<pre style="white-space:pre-wrap;margin:0">${escapeHtml(d.description || '')}</pre>`));
	if (d.notes) rows.push(row('Notes', d.notes));
	rows.push(row('Langue', d.langue || 'fr'));

	return `<div style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0a0a0a">
<h1 style="font-size:20px;margin:0 0 16px">${d.isUrgence ? '🚨 URGENCE' : 'Nouveau lead'}</h1>
<table style="width:100%;border-collapse:collapse;font-size:14px">${rows.join('')}</table>
<p style="font-size:12px;color:#999;margin-top:32px;border-top:1px solid #eee;padding-top:16px">Mini Excavations Érable Inc. — RBQ 5823-7736-01 — excavationserable.com</p>
</div>`;
}

function row(label, value) {
	return `<tr><td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #eee;font-weight:600;width:160px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top">${value}</td></tr>`;
}

function escapeHtml(s) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function esc(s) {
	return escapeHtml(s).replace(/`/g, '&#96;');
}
