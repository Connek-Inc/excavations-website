import { Resend } from 'resend';

let _resend: Resend | null = null;

function getResend() {
	if (_resend) return _resend;
	const key = process.env.RESEND;
	if (!key) {
		console.warn('[email] RESEND env var missing — emails will not send');
		return null;
	}
	_resend = new Resend(key);
	return _resend;
}

const FROM = process.env.EMAIL_FROM || 'Mini Excavations Érable <onboarding@resend.dev>';
const SITE_URL = process.env.ORIGIN || 'https://excavationserable.com';

export async function sendPasswordResetEmail(to: string, name: string, resetToken: string) {
	const r = getResend();
	if (!r) return;
	const link = `${SITE_URL}/compte/reset/${resetToken}`;
	try {
		await r.emails.send({
			from: FROM,
			to,
			subject: 'Réinitialisation de votre mot de passe',
			html: `
				<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0a0a">
					<h1 style="font-size:20px;margin:0 0 16px">Bonjour ${escapeHtml(name)},</h1>
					<p>Vous avez demandé à réinitialiser votre mot de passe sur le portail Mini Excavations Érable.</p>
					<p style="margin:24px 0">
						<a href="${link}" style="display:inline-block;padding:12px 20px;background:#febd17;color:#000;text-decoration:none;border-radius:8px;font-weight:600">
							Réinitialiser mon mot de passe
						</a>
					</p>
					<p style="font-size:13px;color:#666">Ce lien expire dans 1 heure. Si vous n'avez pas fait cette demande, ignorez ce courriel.</p>
					<p style="font-size:12px;color:#999;margin-top:32px;border-top:1px solid #eee;padding-top:16px">
						Mini Excavations Érable Inc. — RBQ 5823-7736-01
					</p>
				</div>
			`
		});
	} catch (err) {
		console.error('[email] sendPasswordResetEmail failed:', err);
	}
}

export async function sendNewSoumissionEmail(to: string, name: string, token: string) {
	const r = getResend();
	if (!r) return;
	const link = `${SITE_URL}/soumission/${token}`;
	try {
		await r.emails.send({
			from: FROM,
			to,
			subject: 'Votre demande de soumission a été reçue',
			html: `
				<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0a0a">
					<h1 style="font-size:20px;margin:0 0 16px">Bonjour ${escapeHtml(name)},</h1>
					<p>Nous avons bien reçu votre demande de soumission. Notre équipe l'analyse et vous enverra une offre détaillée rapidement.</p>
					<p style="margin:24px 0">
						<a href="${link}" style="display:inline-block;padding:12px 20px;background:#febd17;color:#000;text-decoration:none;border-radius:8px;font-weight:600">
							Voir ma soumission
						</a>
					</p>
					<p style="font-size:13px;color:#666">Conservez ce lien pour suivre votre dossier. Vous pouvez aussi vous connecter à votre compte avec votre courriel et le mot de passe que vous avez choisi.</p>
					<p style="font-size:12px;color:#999;margin-top:32px;border-top:1px solid #eee;padding-top:16px">
						Mini Excavations Érable Inc. — RBQ 5823-7736-01
					</p>
				</div>
			`
		});
	} catch (err) {
		console.error('[email] sendNewSoumissionEmail failed:', err);
	}
}

export async function sendOfferReadyEmail(to: string, name: string, token: string, total: number) {
	const r = getResend();
	if (!r) return;
	const link = `${SITE_URL}/soumission/${token}`;
	const totalFmt = new Intl.NumberFormat('fr-CA', {
		style: 'currency',
		currency: 'CAD'
	}).format(total);
	try {
		await r.emails.send({
			from: FROM,
			to,
			subject: 'Votre offre est prête',
			html: `
				<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0a0a0a">
					<h1 style="font-size:20px;margin:0 0 16px">Bonjour ${escapeHtml(name)},</h1>
					<p>Votre offre est prête. Total : <strong>${totalFmt}</strong>.</p>
					<p style="margin:24px 0">
						<a href="${link}" style="display:inline-block;padding:12px 20px;background:#febd17;color:#000;text-decoration:none;border-radius:8px;font-weight:600">
							Voir l'offre
						</a>
					</p>
					<p style="font-size:13px;color:#666">Vous pouvez accepter, contre-offrir ou nous contacter directement.</p>
					<p style="font-size:12px;color:#999;margin-top:32px;border-top:1px solid #eee;padding-top:16px">
						Mini Excavations Érable Inc. — RBQ 5823-7736-01
					</p>
				</div>
			`
		});
	} catch (err) {
		console.error('[email] sendOfferReadyEmail failed:', err);
	}
}

function escapeHtml(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}
