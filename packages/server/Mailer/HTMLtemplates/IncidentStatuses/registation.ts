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
    <table
    style="width: auto; height: auto; padding: 10px; font-size: 11px; font-weight: 100;font-family: 'Calibri', sans-serif;color: #000000;">
    <tr style="font-size: 14px; font-weight: 700;">
      <td style="width: 40%">
        ${mailConst.mailMessages.Incidents.addRequest}
      </td>
      <td>${incident}</td>
    </tr>
    <table style="width: auto; font-size: 12px; font-weight: 100; margin-top: 10px;  height: auto; padding: 10px;">
      <tr>
        <td style="font-weight: 700; vertical-align: top">
        ${mailConst.mailMessages.Incidents.status}
        </td>
        <td>${status}</td>
      </tr>
      <tr>
        <td style="font-weight: 700; vertical-align: top">
        ${mailConst.mailMessages.Incidents.client}
        </td>
        <td style="margin-left: 10px">${client}</td>
      </tr>
      {${clientINC} && 
        <tr>
          <td style="font-weight: 700; vertical-align: top">
          ${mailConst.mailMessages.Incidents.clientINC}
          </td>
          <td style="margin-left: 10px">${clientINC}</td>
        </tr>
      }
      <tr>
        <td style="font-weight: 700; vertical-align: top">
          Описание:
        </td>
        <td style="margin-left: 10px">Плохо пропечатывается этикткаПлохо пропечатывается этикткаПлохо пропечатывается
          этикткаПлохо пропечатывается этикткаПлохо пропечатывается этикткаПлохо пропечатывается этикткаПлохо
          пропечатывается этикткаПлохо пропечатывается этикткаПлохо пропечатывается этикткаПлохо пропечатывается
          этикткаПлохо пропечатывается этикткаПлохо пропечатывается этикткаПлохо пропечатывается этикткаПлохо
          пропечатывается этикткаПлохо пропечатывается этикткаПлохо пропечатывается этикткаПлохо пропечатывается
          этикткаПлохо пропечатывается этиктка</td>
      </tr>

    </table>
  </table>
  <div
      style="width: 80%; margin-top: 30px; width: 100%;height: auto;display: flex;justify-content: flex-start;align-items: flex-start;font-size: 8px;font-weight: 100;font-family: 'Calibri';color: #000000;margin-left: 10px">
      ${mailConst.mailMessages.footer}
    </div>
  </div>
    </body>
  </html>`
  return message
}
