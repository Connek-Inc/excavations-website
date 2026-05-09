import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { contacts } from '$lib/server/db/schema';
import { formatBookedTimes } from '$lib/lib-utils';

export const POST: RequestHandler = async (event: RequestEvent) => {
	try {
		const body = await event.request.json();
		const { formData } = body;

		if (!formData) {
			return json({ success: false, error: 'No form data' }, { status: 400 });
		}

		const ipAddress = event.getClientAddress();
		const userAgent = event.request.headers.get('user-agent') ?? null;

		let preferredDate: Date | null = null;
		if (formData.bookedTimes?.[0]) {
			const first = formData.bookedTimes[0];
			const parsed = new Date(typeof first === 'string' ? first : first?.date || '');
			if (!isNaN(parsed.getTime())) preferredDate = parsed;
		}

		// 1. Save to DB
		try {
			await db.insert(contacts).values({
				name: String(formData.name || 'Anonyme').slice(0, 100),
				email: String(formData.email || '').slice(0, 255),
				phone: formData.phone ? String(formData.phone).slice(0, 50) : null,
				subject: formData.subject ? String(formData.subject).slice(0, 200) : null,
				message: String(formData.messageText || formData.message || ''),
				serviceType: formData.serviceType ? String(formData.serviceType).slice(0, 100) : null,
				preferredDate,
				language: formData.language ? String(formData.language).slice(0, 5) : 'fr',
				source: formData.source || 'website',
				ipAddress,
				userAgent: userAgent?.slice(0, 500) || null,
				status: 'new'
			});
		} catch (dbErr) {
			console.error('[contact] DB insert failed:', dbErr);
		}

		// 2. Send email notification via Web3Forms (if access key configured)
		const web3FormsKey = process.env.WEB3FORMS_KEY;
		if (web3FormsKey) {
			try {
				const bookedTimes = formatBookedTimes(formData.bookedTimes || [], 'fr');
				await fetch('https://api.web3forms.com/submit', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
					body: JSON.stringify({
						access_key: web3FormsKey,
						subject: `Nouveau lead: ${formData.name || 'Sans nom'} - Mini Excavations Érable`,
						from_name: formData.name || 'Anonyme',
						replyto: formData.email,
						name: formData.name,
						email: formData.email,
						phone: formData.phone,
						message: formData.messageText || formData.message,
						preferred_dates: bookedTimes || 'Non spécifié',
						language: formData.language || 'fr',
						admin_link: 'https://excavationserable.com/mi/admin/contacts'
					})
				});
			} catch (emailErr) {
				console.error('[contact] Email send failed:', emailErr);
			}
		}

		return json({ success: true });
	} catch (error: any) {
		console.error('[contact] GLOBAL ERROR:', error);
		return json(
			{ success: false, error: error?.message || 'Server error' },
			{ status: 500 }
		);
	}
};
