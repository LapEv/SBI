import { BaseSyntheticEvent, SyntheticEvent } from 'react'

export interface INC {
  id: string
  numberINC: string
  incident: string
  clientINC: string
  timeRegistration: string
  timeInWork: string
  timeSLA: string
  timeCloseCheck: string
  timeClose: string
  executor: string
  responsible: string
  description: string
  comment: string
  report: string
  spaceParts: string
  act: string
  active: boolean
  INCStatuses?: INCStatuses
}

export interface AddINC {
  numberINC: string
  incident: string
  clientINC: string
  timeRegistration: string
  timeInWork: string
  timeSLA: string
  timeCloseCheck: string
  timeClose: string
  executor: string
  responsible: string
  description: string
  comment: string
  report: string
  spaceParts: string
  act: string
  statusINC: string
}

export interface INCStatuses {
  id: string
  statusINC: string
  active?: boolean
}

export interface AddINCStatuses {
  statusINC: string
}

export interface AnswerINC {
  data: INC[]
  type: string
}

export interface AnswerINCStatuses {
  data: INCStatuses[]
  type: string
}

export type INCState = {
  incidents: INC[]
  incStatuses: INCStatuses[]
  activeINC: string
  isLoadingINC: boolean
  error?: string
}

export interface ChangeINC {
  id?: string
  numberINC: string
  incident: string
  clientINC: string
  timeRegistration: string
  timeInWork: string
  timeSLA: string
  timeCloseCheck: string
  timeClose: string
  executor: string
  responsible: string
  description: string
  comment: string
  report: string
  spaceParts: string
  act: string
}

export interface ChangeINCStatuses {
  statusINC: string
  id?: string
}

export interface IServiceList {
  name: string
  label: string
}

// export interface IServiceListData {
//   sla?: string
//   ola?: string
//   id?: string
//   time: string
//   timeStart: string
//   timeEnd: string
//   id_typeSLA: string
//   TypesSLA: TypesSLA
// }

// export interface SLAList {
//   sla?: string
//   ola?: string
//   id?: string
//   time: string
//   timeStart: string
//   timeEnd: string
//   id_typeSLA: string
//   TypesSLA: TypesSLA
// }

// export interface ServiceListItem {
//   item: {
//     sla?: string
//     ola?: string
//     id?: string
//     time: string
//     timeStart: string
//     timeEnd: string
//     id_typeSLA: string
//   }[]
// }

// export interface INCValues {
//   list: {
//     name: string
//     label: string
//     value: string | TypesSLA
//     validation: object
//     disabled: boolean
//     type: string
//     required: boolean
//   }[]
// }

// export interface AddValuesAddContract {
//   listAddContract: {
//     name: string
//     label: string
//     value: string
//     validation: object
//     type: string
//     required?: boolean
//   }[]
// }
