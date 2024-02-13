const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
export const mailer = async () => {
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

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: EMAIL_USER, // sender address
    to: 'e_lap@mail.ru', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  })
  console.log('info mail = ', info)
  return info
}
