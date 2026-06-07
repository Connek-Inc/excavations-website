// ╔════════════════════════════════════════════════════════════════════════════
// ║ Submission email templates — used by the /api/fallback/email endpoint.
// ║
// ║ This is the FALLBACK path: when connek-workers fails to deliver a
// ║ submission email after its retries, it POSTs the submission data here and
// ║ excavationserable.com re-sends it via its own Resend key. Keeping the
// ║ template here (not just relaying pre-rendered HTML) means the fallback can
// ║ render a clean email even if only the structured data survives.
// ╚════════════════════════════════════════════════════════════════════════════

/** Minimal HTML escape for interpolated values. */
function esc(value) {
	return String(value ?? '').replace(
		/[&<>"]/g,
		(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]
	);
}

/** Shared responsive shell so both variants look consistent. */
function shell(title, innerHtml) {
	return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.06);">
        <tr><td style="background:#0f766e;padding:20px 28px;">
          <span style="color:#ffffff;font-size:18px;font-weight:700;">Mini Excavations Érable</span>
        </td></tr>
        <tr><td style="padding:28px;">
          ${innerHtml}
        </td></tr>
        <tr><td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;">
          Mini Excavations Érable · (514) 830-9973 · Envoyé via Connek (livraison de secours)
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(href, label) {
	if (!href) return '';
	return `<p style="margin:24px 0;">
		<a href="${esc(href)}" style="background:#0f766e;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:600;display:inline-block;">${esc(label)}</a>
	</p>`;
}

function row(label, value) {
	if (value === undefined || value === null || value === '') return '';
	return `<tr>
		<td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;vertical-align:top;white-space:nowrap;">${esc(label)}</td>
		<td style="padding:6px 0;color:#111827;font-size:14px;">${esc(value)}</td>
	</tr>`;
}

/** Confirmation sent to the client who submitted the request. */
function clientHtml(d) {
	const name = d.client_first_name || d.client_nom || d.client_name || 'cher client';
	const tracking = d.tracking_url || (d.token ? `https://excavationserable.com/soumission/${d.token}` : '');
	const inner = `
		<h1 style="margin:0 0 8px;font-size:22px;">Nous avons bien reçu votre demande ✅</h1>
		<p style="margin:0 0 16px;font-size:15px;line-height:1.5;">Bonjour ${esc(name)}, merci pour votre soumission${d.reference ? ` (réf. <b>${esc(d.reference)}</b>)` : ''}. Notre équipe la traite et vous reviendra rapidement.</p>
		<table role="presentation" cellpadding="0" cellspacing="0">
			${row('Catégorie', d.category || d.projet_type)}
			${row('Description', d.project_description || d.projet_description)}
		</table>
		${btn(tracking, 'Suivre ma soumission')}
		<p style="margin:16px 0 0;color:#6b7280;font-size:13px;">Une question? Appelez-nous au (514) 830-9973.</p>`;
	return {
		subject: d.subject || `Nous avons reçu votre demande${d.reference ? ` — ${d.reference}` : ''}`,
		html: shell('Demande reçue', inner)
	};
}

/** Alert sent to the business owner about a new submission. */
function businessHtml(d) {
	const tracking = d.tracking_url || (d.token ? `https://excavationserable.com/soumission/${d.token}` : '');
	const inner = `
		<h1 style="margin:0 0 8px;font-size:22px;">Nouvelle soumission reçue</h1>
		<p style="margin:0 0 16px;font-size:15px;line-height:1.5;">${d.reference ? `Référence <b>${esc(d.reference)}</b>. ` : ''}Un client vient de soumettre une demande${d.business_name ? ` pour ${esc(d.business_name)}` : ''}.</p>
		<table role="presentation" cellpadding="0" cellspacing="0">
			${row('Client', d.client_first_name || d.client_nom || d.client_name)}
			${row('Courriel', d.client_email)}
			${row('Téléphone', d.client_phone || d.client_telephone)}
			${row('Adresse projet', d.project_address || d.projet_adresse)}
			${row('Catégorie', d.category || d.projet_type)}
			${row('Description', d.project_description || d.projet_description)}
		</table>
		${btn(tracking, 'Ouvrir la soumission')}`;
	return {
		subject: d.subject || `Nouvelle soumission${d.reference ? ` — ${d.reference}` : ''}`,
		html: shell('Nouvelle soumission', inner)
	};
}

/**
 * Render a submission email for the fallback sender.
 * @param {string} kind  'submission_client' | 'submission_business'
 * @param {object} data  structured submission fields from connek-ai
 * @returns {{subject: string, html: string}}
 */
export function renderSubmission(kind, data = {}) {
	if (kind === 'submission_business') return businessHtml(data);
	return clientHtml(data); // default to the client confirmation
}
