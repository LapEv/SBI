import { ClassifierEquipment } from '../classifier/interfaces'
import { Clients } from '../clients/interfaces'
import { Objects } from '../objects/interfaces'
import { SLA } from '../sla/interfaces'

export interface Contracts {
  id?: string
  contract: string
  number: string
  date: string
  sla?: string[]
  equipment?: string[]
  model?: string[]
  objects?: string[]
  id_client: string
  active?: boolean
  SLAs?: SLA[] | []
  ClassifierEquipment?: ClassifierEquipment[] | []
  Objects?: Objects[] | []
  Client?: Clients[] | []
}

export interface IContractData {
  id?: string
  contract: string
  number: string
  date: string
  // sla?: string[]
  // equipment?: string[]
  // objects?: string[]
  id_client: string
  // SLAs?: SLA[] | []
  // ClassifierEquipment?: ClassifierEquipment[] | []
  // Objects?: Objects[] | []
}

export interface AnswerContracts {
  data: Contracts[]
  type: string
}

export type ContractsState = {
  contracts: Contracts[]
  activeContract: string
  isLoadingContracts: boolean
  error?: string
}

export interface ChangeContract {
  id?: string
  contract?: string
  number: string
  date: string
  sla?: string[]
  equipment?: string[]
  model?: string[]
  objects?: string[]
}
export interface NewContractName {
  contract: string
  id: string
}

// export interface IServiceListData {
//   sla?: string
//   ola?: string
//   id?: string
//   time: string
//   timeStart: string
//   timeEnd: string
// }

// export interface ServiceListItem {
//   item: {
//     sla?: string
//     ola?: string
//     id?: string
//     time: string
//     timeStart: string
//     timeEnd: string
//   }[]
// }

// export interface SLAValues {
//   list: {
//     name: string
//     label: string
//     value: string
//     validation: object
//     disabled: boolean
//     type: string
//   }[]
// }
