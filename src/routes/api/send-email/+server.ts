import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import type { RequestHandler } from './$types';

const ADMIN_EMAIL = 'miniexcavationerable@gmail.com';

// Use a verified domain once you have one in Resend; until then the
// onboarding sender works for testing.
const FROM = process.env.EMAIL_FROM || 'Mini Excavations Érable <onboarding@resend.dev>';

export const POST: RequestHandler = async ({ request }) => {
	let payload: any;
	try {
		payload = await request.json();
	} catch {
		return json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
	}

	const {
		type = 'soumission', // 'soumission' | 'urgence'
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
	} = payload || {};

	if (!email || !name) {
		return json({ ok: false, error: 'name and email are required' }, { status: 400 });
	}

	const apiKey = process.env.RESEND;
	if (!apiKey) {
		console.error('[send-email] RESEND env var not set on the server');
		return json(
			{ ok: false, error: 'Email service not configured on the server' },
			{ status: 500 }
		);
	}

	const resend = new Resend(apiKey);
	const isUrgence = type === 'urgence';
	const subject = isUrgence
		? `URGENCE — ${name} (${type_probleme || 'à préciser'})`
		: `Nouveau lead: ${name}${type_projet ? ` — ${type_projet}` : ''}`;

	const adminBody = buildAdminBody({
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

	const errors: string[] = [];

	try {
		const r = await resend.emails.send({
			from: FROM,
			to: [ADMIN_EMAIL],
			replyTo: email,
			subject,
			html: adminBody
		});
		if ((r as any)?.error) errors.push(`admin: ${(r as any).error.message || 'unknown'}`);
	} catch (err) {
		errors.push(`admin: ${err instanceof Error ? err.message : 'send failed'}`);
	}

	// Also send a confirmation copy to the client (best-effort)
	if (confirmation_au_client) {
		try {
			const r = await resend.emails.send({
				from: FROM,
				to: [email],
				replyTo: ADMIN_EMAIL,
				subject:
					langue === 'en'
						? 'We received your request — Mini Excavations Érable'
						: langue === 'es'
							? 'Recibimos su solicitud — Mini Excavations Érable'
							: 'Nous avons bien reçu votre demande — Mini Excavations Érable',
				html: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0a0a;white-space:pre-wrap">${escapeHtml(
					confirmation_au_client
				)}</div>`
			});
			if ((r as any)?.error) errors.push(`client: ${(r as any).error.message || 'unknown'}`);
		} catch (err) {
			errors.push(`client: ${err instanceof Error ? err.message : 'send failed'}`);
		}
	}

	if (errors.length > 0) {
		// admin email is most important; if it failed return error
		const adminFailed = errors.some((e) => e.startsWith('admin:'));
		if (adminFailed) return json({ ok: false, errors }, { status: 500 });
	}

	return json({ ok: true, warnings: errors });
};

function buildAdminBody(d: {
	isUrgence: boolean;
	name: string;
	email: string;
	phone?: string;
	adresse_personnelle?: string;
	adresse_projet?: string;
	type_projet?: string;
	description?: string;
	notes?: string;
	niveau_urgence?: string;
	type_probleme?: string;
	langue?: string;
}) {
	const rows: string[] = [];
	if (d.isUrgence) {
		rows.push(row('Type', 'URGENCE 🚨'));
		rows.push(row('Problème', d.type_probleme || '—'));
		rows.push(row('Niveau urgence', d.niveau_urgence || '—'));
	} else {
		rows.push(row('Type projet', d.type_projet || '—'));
	}
	rows.push(row('Nom', d.name));
	rows.push(row('Courriel', `<a href="mailto:${escapeAttr(d.email)}">${escapeHtml(d.email)}</a>`));
	if (d.phone)
		rows.push(row('Téléphone', `<a href="tel:${escapeAttr(d.phone)}">${escapeHtml(d.phone)}</a>`));
	if (d.adresse_personnelle) rows.push(row('Adresse personnelle', d.adresse_personnelle));
	if (d.adresse_projet) rows.push(row('Adresse projet', d.adresse_projet));
	rows.push(row('Description', `<pre style="white-space:pre-wrap;margin:0">${escapeHtml(d.description || '')}</pre>`));
	if (d.notes) rows.push(row('Notes', d.notes));
	rows.push(row('Langue visiteur', d.langue || 'fr'));

	return `
		<div style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0a0a0a">
			<h1 style="font-size:20px;margin:0 0 16px">${d.isUrgence ? '🚨 URGENCE' : 'Nouveau lead'}</h1>
			<table style="width:100%;border-collapse:collapse;font-size:14px">${rows.join('')}</table>
			<p style="font-size:12px;color:#999;margin-top:32px;border-top:1px solid #eee;padding-top:16px">
				Mini Excavations Érable Inc. — RBQ 5823-7736-01 — excavationserable.com
			</p>
		</div>
	`;
}

function row(label: string, value: string) {
	return `
		<tr>
			<td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #eee;font-weight:600;width:160px;vertical-align:top">${escapeHtml(label)}</td>
			<td style="padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top">${value}</td>
		</tr>
	`;
}

function escapeHtml(s: string) {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function escapeAttr(s: string) {
	return escapeHtml(s).replace(/`/g, '&#96;');
}
