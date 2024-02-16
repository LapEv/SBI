import { mailConst } from '../../../const'
import { MailDataRegInc } from '/Mailer/interface'

export const htmlRegistration = ({
  incident,
  status,
  clientINC,
  timeRegistration,
  timeSLA,
  client,
  object,
  objectClientID,
  objectClientName,
  address,
  equipment,
  model,
  malfunction,
  description,
  applicant,
  applicantContacts,
  userAccepted,
}: MailDataRegInc) => {
  console.log('clientINC = ', clientINC)
  const message = `
  <html>

  <head>
    <base target="_top">
  </head>
  
  <body>
    <div
      style="width: auto; height: auto; padding: 10px; font-size: 11px; font-weight: 100;font-family: 'Calibri', sans-serif;color: #000000;">
      <div style="display: flex; font-size: 14px; font-weight: 700;">
        ${mailConst.mailMessages.Incidents.addRequest} ${incident}
      </div>
      <div style="margin-top: 10px; font-size: 13px">
        <b style="font-size: 12px;">${
          mailConst.mailMessages.Incidents.status
        }</b> ${status}<br>
        <b>${mailConst.mailMessages.Incidents.client}</b> ${client}<br>
        ${
          clientINC
            ? `<b>${mailConst.mailMessages.Incidents.clientINC}</b> ${clientINC}<br>`
            : ``
        }
        <b>${
          mailConst.mailMessages.Incidents.timeRegistration
        }</b> ${timeRegistration}<br>
        <b>${mailConst.mailMessages.Incidents.timeSLA}</b> ${timeSLA}<br>
        <b>${mailConst.mailMessages.Incidents.address}</b> ${object}<br>
        <b>${mailConst.mailMessages.Incidents.address}</b> ${address}<br>
        ${
          objectClientID
            ? `<b>${mailConst.mailMessages.Incidents.objectClientID}</b> ${objectClientID}<br>`
            : ``
        }
        ${
          objectClientName
            ? `<b>${mailConst.mailMessages.Incidents.objectClientName}</b> ${objectClientName}<br>`
            : ``
        }
        <b>${mailConst.mailMessages.Incidents.equipment}</b> ${equipment}<br>
        <b>${mailConst.mailMessages.Incidents.model}</b> ${model}<br>
        <b>${
          mailConst.mailMessages.Incidents.malfunction
        }</b> ${malfunction}<br>
        <b>${
          mailConst.mailMessages.Incidents.description
        }</b> ${description}<br>
        <b>${mailConst.mailMessages.Incidents.applicant}</b> ${applicant}<br>
        <b>${
          mailConst.mailMessages.Incidents.applicantContacts
        }</b> ${applicantContacts}<br>
        <b>${
          mailConst.mailMessages.Incidents.userAccepted
        }</b> ${userAccepted}<br>
      </div>
      <div style="margin-top: 10px; font-size: 9px">
      ========================
      <br>
      <br>
        Это письмо сформировано автоматически, отвечать на него не нужно. Если Вы получили это сообщение по ошибке,
        пожалуйста, сообщите об этом на адрес ${
          mailConst.ourMail
        } и удалите это сообщение.
      </div>
    </div>
  </body>
  
  </html>`
  return message
}
