import { htmlRegistration } from './HTMLtemplates/IncidentStatuses/registation'
import { MailData } from './interface'
import { mailConst } from '../const'

const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
export const mailer = async (data: MailData) => {
  console.log('env = ', process.env)
  const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env
  console.log('EMAIL_USER = ', EMAIL_USER)
  console.log('EMAIL_PASSWORD = ', EMAIL_PASSWORD)
  console.log('EMAIL_HOST = ', EMAIL_HOST)
  console.log('EMAIL_PORT = ', EMAIL_PORT)
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  })
  console.log('transporter  = ', transporter)
  const info = await transporter.sendMail({
    from: EMAIL_USER,
    to: 'e.lapkin@sb-i.ru, e_lap@mail.ru',
    subject: `${mailConst.mailMessages.Incidents.titleRegistration} ${data.incident}`,
    text: '',
    html: htmlRegistration(data),
  })
  console.log('info mail = ', info)
  return info
}
