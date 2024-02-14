import { MailData } from '/Mailer/interface'
import { mailConst } from '../../../const'

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
}: MailData) => {
  const message = `
  <html>
    <head>
      <base target="_top">
    </head>
    <body>
    <div
    style="width: 500px; height: auto;padding: 30px; font-size: 16px; font-weight: 100;color: #000000;">
    <div
      style="width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 16px;font-weight: 700;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.addRequest
      }<p style="width: 75%; margin-left: 10px; font-size: 14px;">${incident}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.status
      }<p style=" width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${status}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.client
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${client}</p>
    </div>
    ${
      clientINC
        ? `<div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${mailConst.mailMessages.Incidents.clientINC}<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${clientINC}</p>
    </div>`
        : ''
    }
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.timeRegistration
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${timeRegistration}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.timeSLA
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${timeSLA}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.object
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${object}</p>
    </div>
    ${
      objectClientID
        ? `<div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${mailConst.mailMessages.Incidents.objectClientID}<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${objectClientID}</p>
    </div>`
        : ''
    }
    ${
      objectClientName
        ? `<div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${mailConst.mailMessages.Incidents.objectClientName}<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${objectClientName}</p>
    </div>`
        : ''
    }
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.address
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${address}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.equipment
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${equipment}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.model
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${model}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.malfunction
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${malfunction}</p>
    </div>

    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.description
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${description}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.applicant
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${applicant}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.applicantContacts
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${applicantContacts}</p>
    </div>
    <div
    style="padding: 2px; padding-left: 0px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 12px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${
        mailConst.mailMessages.Incidents.userAccepted
      }<p style="width: 80%; margin: 0;margin-left: 10px; font-size: 13px;">${userAccepted}</p>
    </div>
  <div
      style="width: 80%; margin-top: 30px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 8px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${mailConst.mailMessages.footer}
    </div>
  </div>
    </body>
  </html>`
  return message
}
