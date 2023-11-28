export interface Objects {
  id?: string
  object: string
  id_client: string
  id_address: string
  id_region: string
  internalClientID?: string
  internalClientName?: string
  active?: boolean
  Client?: {
    client: string
  }
  Address?: {
    address: string
  }
  Region?: {
    region: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface AnswerObjects {
  data: Objects[]
  type: string
}

export type ObjectsState = {
  objects: Objects[]
  activeObject: string
  isLoadingRoles: boolean
  error?: string
}

export interface ChangeObject {
  id?: string
  object: string
  id_address: string
  id_region: string
  id_client: string
  internalClientID?: string
  internalClientName?: string
}
// export interface IServiceList {
//   name: string
//   label: string
// }
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
