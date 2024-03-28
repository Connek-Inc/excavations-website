import { Resend } from 'resend'
import { RESEND, CONTACT_EMAIL } from '$env/static/private'



export const actions = {
	contact: async (event) => {

        const notifyOnEmail = async () => {
            const resend = new Resend(RESEND)

            const sendEmail = async () => {
                console.log('Running sending email')
                const data = await resend.emails.send({
                    from: 'Connek <team@connek.ca>',
                    to: [CONTACT_EMAIL],
                    subject: 'You have a new lead',
                    html: '<strong>Contact them fast!</strong>'
                })
                return data
            }

            const emailData = await sendEmail()
            return emailData
            }

        notifyOnEmail()

	}
};