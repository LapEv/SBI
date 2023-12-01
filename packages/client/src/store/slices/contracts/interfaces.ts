export interface Contracts {
  id?: string
  contract: string
  number: string
  date: string
  sla?: string[]
  equipment?: string[]
  objects?: string[]
  id_client: string
  active?: boolean
}

export interface AnswerContracts {
  data: Contracts[]
  type: string
}

export type ContractsState = {
  contracts: Contracts[]
  activeContract: string
  isLoadingRoles: boolean
  error?: string
}

export interface ChangeContract {
  id?: string
  contract: string
  number: string
  date: string
  sla?: string[]
  equipment?: string[]
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
