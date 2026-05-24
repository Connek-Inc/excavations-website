// Resend email sender. Uses fetch directly (no SDK) so we don't introduce
// extra ESM-with-TLA dependencies that lsnode would choke on.

const RESEND_URL = 'https://api.resend.com/emails';

function getKey() {
	const k = process.env.RESEND;
	if (!k) console.warn('[email] RESEND env var missing — sends will be skipped');
	return k;
}

const ADMIN_EMAIL = () => process.env.ADMIN_EMAIL || 'miniexcavationerable@gmail.com';
const FROM = () => process.env.EMAIL_FROM || 'Mini Excavations Érable <onboarding@resend.dev>';

async function sendOne(payload) {
	const key = getKey();
	if (!key) return { ok: false, error: 'RESEND key missing' };
	try {
		const r = await fetch(RESEND_URL, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${key}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
		if (!r.ok) {
			const txt = await r.text().catch(() => '');
			return { ok: false, error: `HTTP ${r.status} ${txt.slice(0, 200)}` };
		}
		return { ok: true };
	} catch (e) {
		return { ok: false, error: String(e?.message || e) };
	}
}

function esc(s) {
	return String(s ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function row(label, value) {
	return `<tr><td style="padding:8px 12px;background:#f9fafb;border-bottom:1px solid #eee;font-weight:600;width:170px;vertical-align:top">${esc(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top">${value}</td></tr>`;
}

function adminEmailBody(d, urlOrigin) {
	const isUrgence = d.source === 'urgences-form';
	const rows = [];
	if (isUrgence) {
		rows.push(row('Type', '🚨 URGENCE'));
		if (d.niveau_urgence) rows.push(row("Niveau d'urgence", d.niveau_urgence));
	} else {
		rows.push(row('Type projet', d.projet_type || '—'));
	}
	rows.push(row('Nom', esc(d.client_nom)));
	rows.push(row('Courriel', `<a href="mailto:${esc(d.client_email)}">${esc(d.client_email)}</a>`));
	if (d.client_telephone) rows.push(row('Téléphone', `<a href="tel:${esc(d.client_telephone)}">${esc(d.client_telephone)}</a>`));
	if (d.client_adresse) rows.push(row('Adresse personnelle', esc(d.client_adresse)));
	if (d.projet_adresse) rows.push(row('Adresse projet', esc(d.projet_adresse)));
	rows.push(row('Description', `<pre style="white-space:pre-wrap;margin:0;font-family:inherit">${esc(d.projet_description)}</pre>`));
	if (d.notes_client) rows.push(row('Notes du client', esc(d.notes_client)));
	rows.push(row('Langue', esc(d.lang || 'fr')));
	rows.push(row('Reçue le', new Date().toLocaleString('fr-CA', { dateStyle: 'long', timeStyle: 'short' })));

	const adminLink = d.id ? `${urlOrigin}/mi/admin/soumissions/${d.id}` : null;

	return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f3f4f6">
<div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:24px auto;padding:24px;background:white;border-radius:12px;color:#0a0a0a">
<h1 style="font-size:22px;margin:0 0 8px;color:#0a0a0a">${isUrgence ? '🚨 Nouvelle URGENCE' : '📋 Nouveau lead'}</h1>
<p style="color:#666;font-size:13px;margin:0 0 20px">Mini Excavations Érable — Nouvelle demande reçue</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #eee;border-radius:8px;overflow:hidden">${rows.join('')}</table>
${adminLink ? `<p style="margin-top:24px"><a href="${esc(adminLink)}" style="display:inline-block;padding:10px 20px;background:#febd17;color:#000;text-decoration:none;border-radius:8px;font-weight:600">Ouvrir dans le tableau de bord →</a></p>` : ''}
<p style="font-size:12px;color:#999;margin-top:32px;border-top:1px solid #eee;padding-top:16px">Mini Excavations Érable Inc. — RBQ 5823-7736-01 — excavationserable.com</p>
</div></body></html>`;
}

function clientConfirmBody(d) {
	const lang = d.lang || 'fr';
	const isEn = lang === 'en';
	const isEs = lang === 'es';
	const greeting = isEn ? `Hello ${d.client_nom},` : isEs ? `Hola ${d.client_nom},` : `Bonjour ${d.client_nom},`;
	const intro = isEn
		? 'Thank you for contacting Mini Excavations Érable. We received your quote request and our team will review it shortly.'
		: isEs
			? 'Gracias por contactar a Mini Excavations Érable. Recibimos su solicitud y nuestro equipo la revisará pronto.'
			: "Merci d'avoir contacté Mini Excavations Érable. Nous avons reçu votre demande et notre équipe l'analysera sous peu.";
	const urgent = isEn ? 'For urgent matters, call us at' : isEs ? 'Para urgencias, llámenos al' : 'Pour une urgence, appelez-nous au';
	const summaryLabel = isEn ? 'Summary of what you sent:' : isEs ? 'Resumen de su solicitud:' : 'Récapitulatif de votre demande :';

	return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f3f4f6">
<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:24px auto;padding:32px;background:white;border-radius:12px;color:#0a0a0a">
<h1 style="font-size:22px;margin:0 0 16px;color:#0a0a0a">${esc(greeting)}</h1>
<p style="line-height:1.6;color:#374151">${esc(intro)}</p>
<div style="margin-top:24px;padding:16px;background:#fef3c7;border-left:3px solid #febd17;border-radius:6px">
<strong style="font-size:13px;color:#92400e;text-transform:uppercase;letter-spacing:0.5px">${esc(summaryLabel)}</strong>
<div style="margin-top:8px;font-size:14px;color:#0a0a0a">
${d.projet_type ? `<p style="margin:4px 0"><strong>${isEn ? 'Project type' : isEs ? 'Tipo' : 'Type'}:</strong> ${esc(d.projet_type)}</p>` : ''}
${d.projet_adresse ? `<p style="margin:4px 0"><strong>${isEn ? 'Address' : isEs ? 'Dirección' : 'Adresse'}:</strong> ${esc(d.projet_adresse)}</p>` : ''}
<p style="margin:4px 0;white-space:pre-wrap">${esc(d.projet_description)}</p>
</div>
</div>
<p style="margin-top:24px;font-size:14px;color:#374151">${esc(urgent)} <a href="tel:+15148309973" style="color:#c9920f;font-weight:600">(514) 830-9973</a>.</p>
<p style="font-size:12px;color:#9ca3af;margin-top:32px;border-top:1px solid #eee;padding-top:16px">Mini Excavations Érable Inc. — RBQ 5823-7736-01<br>excavationserable.com</p>
</div></body></html>`;
}

/** Send notification to admin AND confirmation copy to client.
 *  Returns { admin: {ok,error?}, client: {ok,error?} }. Best-effort: doesn't throw. */
export async function sendSoumissionEmails(soumission, urlOrigin) {
	const isUrgence = soumission.source === 'urgences-form';
	const adminSubject = isUrgence
		? `🚨 URGENCE — ${soumission.client_nom}${soumission.niveau_urgence ? ` (${soumission.niveau_urgence})` : ''}`
		: `Nouveau lead — ${soumission.client_nom}${soumission.projet_type ? ` (${soumission.projet_type})` : ''}`;

	const lang = soumission.lang || 'fr';
	const clientSubject =
		lang === 'en'
			? "We received your request — Mini Excavations Érable"
			: lang === 'es'
				? 'Recibimos su solicitud — Mini Excavations Érable'
				: 'Nous avons bien reçu votre demande — Mini Excavations Érable';

	const [admin, client] = await Promise.all([
		sendOne({
			from: FROM(),
			to: [ADMIN_EMAIL()],
			reply_to: soumission.client_email,
			subject: adminSubject,
			html: adminEmailBody(soumission, urlOrigin)
		}),
		soumission.client_email
			? sendOne({
					from: FROM(),
					to: [soumission.client_email],
					reply_to: ADMIN_EMAIL(),
					subject: clientSubject,
					html: clientConfirmBody(soumission)
				})
			: Promise.resolve({ ok: false, error: 'no client email' })
	]);

	return { admin, client };
}
