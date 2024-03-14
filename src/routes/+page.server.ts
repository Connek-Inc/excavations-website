import { Resend } from 'resend';
import { RESEND } from '$env/static/private';


export const actions: Actions = { 

    sendContactForm: async (event) => {

        if (event.request.method == 'POST') {
    
            const resend = new Resend(RESEND);
            const recipient = 'miniexcavationerables@gmail.com'

            console.log(recipient)

            // const sendEmail = async () => {
            //     console.log('Running sending email')
            //     const data = await resend.emails.send({
            //         from: 'Connek <team@connek.ca>',
            //         to: [recipient],
            //         subject: 'You have a new lead',
            //         html: '<strong>Contact them fast!</strong>',
            //     })
            //     return data
            // }

            // const emailData = await sendEmail()
            // return emailData

        }

    }

}