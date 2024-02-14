import { htmlRegistration } from './HTMLtemplates/IncidentStatuses/registation'
import { MailData } from './interface'
import { mailConst } from '../const'

const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
export const mailer = async (data: MailData) => {
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
    from: EMAIL_USER,
    to: 'e.lapkin@sb-i.ru, e_lap@mail.ru',
    subject: `${mailConst.mailMessages.Incidents.titleRegistration} ${data.incident}`, // Subject line
    text: '',
    html: htmlRegistration(data),
  })
  console.log('info mail = ', info)
  return info
}
