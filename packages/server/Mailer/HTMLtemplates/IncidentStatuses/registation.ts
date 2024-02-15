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
    style="width: auto; height: auto; padding: 10px; font-size: 11px; font-weight: 100;font-family: 'Calibri', sans-serif;color: #000000;">
    <div style="display: flex; font-size: 14px; font-weight: 700;">
      <div style="width: auto">
        ${mailConst.mailMessages.Incidents.addRequest}
      </div>
      <div>${incident}</div>
    </div>
  </div>
  <div style="display: flex;">
    <div
      style="width: 200px; display: flex; flex-direction: column; font-size: 12px; font-weight: 100; margin-top: 10px;  height: auto; padding: 10px;">
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.status}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.client}
      </div>
      ${
        clientINC
          ? `
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.clientINC}
      </div>`
          : ``
      }
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.timeRegistration}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.timeSLA}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.object}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.address}
      </div>
      ${
        objectClientID
          ? `
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.objectClientID}
      </div>`
          : ``
      }
      ${
        objectClientName
          ? `
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.objectClientName}
      </div>`
          : ``
      }
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.equipment}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.model}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.malfunction}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.description}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.applicant}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.applicantContacts}
      </div>
      <div style="width: auto; font-weight: 700">
        ${mailConst.mailMessages.Incidents.userAccepted}
      </div>
    </div>
    <div
      style="width: auto; display: flex; flex-direction: column; font-size: 12px; font-weight: 100; margin-top: 10px;  height: auto; padding: 10px;">
      <div style=" margin-left: 10px">${status}</div>
      <div style=" margin-left: 10px">${client}</div>
      ${clientINC ? `<div style=" margin-left: 10px">${clientINC}</div>` : ``}
      <div style=" margin-left: 10px">${timeRegistration}</div>
      <div style=" margin-left: 10px">${timeSLA}</div>
      <div style=" margin-left: 10px">${object}</div>
      <div style=" margin-left: 10px">${address}</div>
      ${
        objectClientID
          ? `<div style=" margin-left: 10px">${objectClientID}</div>`
          : ``
      }
      ${
        objectClientName
          ? `<div style=" margin-left: 10px">${objectClientName}</div>`
          : ``
      }
      <div style=" margin-left: 10px">${equipment}</div>
      <div style=" margin-left: 10px">${model}</div>
      <div style=" margin-left: 10px">${malfunction}</div>
      <div style=" margin-left: 10px">${description}</div>
      <div style=" margin-left: 10px">${applicant}</div>
      <div style=" margin-left: 10px">${applicantContacts}</div>
      <div style=" margin-left: 10px">${userAccepted}</div>
    </div>
  </div>
</body>

</html>`
  return message
}
