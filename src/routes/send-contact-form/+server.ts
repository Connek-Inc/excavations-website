import { Resend } from 'resend';
import { RESEND } from '$env/static/private';
import type { RequestEvent, RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { formatBookedTimes } from '$lib/utils';



export const POST: RequestHandler = async (event: RequestEvent) => {

    const resend = new Resend(RESEND);
    const recipient = 'miniexcavationerables@gmail.com'
    const cc = 'edoarvega@gmail.com'

    const { formData } = await event.request.json()
    
    console.log('FORMDATA', formData)
    
    // console.log('TIPOO', formData.formData)
    // console.log('TIPOO', typeof(formData.formData))

    const bookedTimes = formatBookedTimes(formData.bookedTimes)

    // console.log(bookedTimes)

    const email_body = `<h1>¡Hola Mini Excavations Érable!</h1>

        <p>Has recibido una nueva solicitud de información de un cliente potencial interesado en los servicios de Mini Excavaciones Érable. A continuación, encontrarás los detalles de su solicitud para un seguimiento oportuno:</p>
        
        <p><strong>Nombre del Cliente:</strong> ${formData.name}</p>
        <p><strong>Número de Teléfono:</strong> ${formData.phone}</p>
        <p><strong>Correo Electrónico:</strong> ${formData.email}</p>
        <p><strong>Descripción del Problema/Reparación Solicitada:</strong><br>
        ${formData.messageText}</p>
        <p><strong>Preferencia de Contacto:</strong></p>
        <ul>
            <li><strong>Fecha(s):</strong> ${bookedTimes}</li>
        </ul>
        
        <p>Por favor, asegúrate de contactar al cliente en el momento sugerido para proporcionarle más información sobre cómo podemos asistirle con sus necesidades de mini excavaciones. ¡Gracias por atender prontamente esta nueva oportunidad de negocio!</p>
        
        <p class="footer">Saludos cordiales,<br>
        El equipo de Connek</p>`



    const sendEmail = async () => {
        console.log('Running sending email')
        const data = await resend.emails.send({
            from: 'Connek <team@connek.ca>',
            to: [recipient],
            cc: [cc],
            subject: 'Tienes un nuevo cliente - Excavations Erable',
            html: email_body
        })
        return data
    }


    const emailData = await sendEmail()
    // console.log('EMMAIL DATA', emailData)
    

    return json(emailData)
    // return json({})



}