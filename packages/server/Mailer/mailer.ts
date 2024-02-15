import { htmlRegistration } from './HTMLtemplates/IncidentStatuses/registation'
import { MailData } from './interface'
import { mailConst } from '../const'

const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
export const mailer = async (data: MailData) => {
  console.log('data.mailTo = ', data.mailTo)
  const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  })
  const info = await transporter.sendMail({
    from: `"Уведомление службы поддержки СБИ" <${EMAIL_USER}>`,
    to: `${mailConst.ourMail}, ${data.mailTo}`,
    subject: `${mailConst.mailMessages.Incidents.titleRegistration} ${data.incident}`,
    text: '',
    html: htmlRegistration(data),
  })
  return info
}
