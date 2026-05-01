import { Resend } from 'resend';
import { RESEND } from '$env/static/private';
import type { RequestEvent, RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { formatBookedTimes } from '$lib/lib-utils';
import { db } from '$lib/server/db';
import { contacts } from '$lib/server/db/schema';

export const POST: RequestHandler = async (event: RequestEvent) => {
	try {
		const body = await event.request.json();
		const { formData } = body;

		if (!formData) {
			return json({ success: false, error: 'No form data received' }, { status: 400 });
		}

		const bookedTimes = formatBookedTimes(formData.bookedTimes || [], 'fr');
		const ipAddress = event.getClientAddress();
		const userAgent = event.request.headers.get('user-agent') ?? null;

		let preferredDate: Date | null = null;
		if (formData.bookedTimes?.[0]) {
			const first = formData.bookedTimes[0];
			const parsed = new Date(first);
			if (!isNaN(parsed.getTime())) preferredDate = parsed;
		}

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
				source: 'website',
				ipAddress,
				userAgent,
				status: 'new'
			});
		} catch (dbErr) {
			console.error('[contact] DB insert failed:', dbErr);
		}

		if (RESEND && RESEND !== 're_your_api_key_here') {
			try {
				const resend = new Resend(RESEND);
				const recipient = 'miniexcavationerables@gmail.com';
				const cc = 'edoarvega@gmail.com';

				const email_body = `<h1>¡Hola Mini Excavations Érable!</h1>
                    <p>Has recibido una nueva solicitud de información de un cliente potencial.</p>
                    <p><strong>Nombre del Cliente:</strong> ${formData.name || 'N/A'}</p>
                    <p><strong>Número de Teléfono:</strong> ${formData.phone || 'N/A'}</p>
                    <p><strong>Correo Electrónico:</strong> ${formData.email || 'N/A'}</p>
                    <p><strong>Descripción del Problema/Reparación Solicitada:</strong><br>
                    ${formData.messageText || 'Sin mensaje'}</p>
                    <p><strong>Preferencia de Contacto:</strong></p>
                    <ul>
                        <li><strong>Fecha(s):</strong> ${bookedTimes || 'No se seleccionaron fechas'}</li>
                    </ul>
                    <p>El contacto también ha sido enregistré en el panel de control: <a href="https://miniexcavationserable.com/mi/admin">Voir le panel</a></p>`;

				const { error: sendError } = await resend.emails.send({
					from: 'Connek <team@connek.ca>',
					to: [recipient],
					cc: [cc],
					subject: `Nuevo cliente: ${formData.name || 'Sin nombre'} - Excavations Erable`,
					html: email_body
				});

				if (sendError) {
					console.error('[contact] Resend error:', sendError);
				}
			} catch (mailErr) {
				console.error('[contact] Email send failed:', mailErr);
			}
		}

		return json({ success: true });
	} catch (error: any) {
		console.error('[contact] GLOBAL ERROR:', error);
		return json(
			{ success: false, error: error?.message || 'Server internal error' },
			{ status: 500 }
		);
	}
};
