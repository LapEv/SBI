import { TypesOfWork } from '../incidents/interfaces'

export interface SLA {
  id: string
  sla: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
  active: boolean
  TypesOfWork: TypesOfWork
}

export interface AddSLA {
  sla: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
}

export interface OLA {
  id: string
  ola: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
  active: boolean
  TypesOfWork: TypesOfWork
}

export interface AddOLA {
  ola: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
}

export interface AnswerSLA {
  data: SLA[]
  type: string
}

export interface AnswerOLA {
  data: OLA[]
  type: string
}

export type SLAState = {
  sla: SLA[]
  ola: OLA[]
  activeSLA: string
  activeList: string
  isLoadingSLA: boolean
  error?: string
}

export interface ChangeSLA {
  sla: string
  id?: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
}
export interface ChangeOLA {
  ola: string
  id?: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
}

export interface IServiceList {
  name: string
  label: string
}
export interface IServiceListData {
  sla?: string
  ola?: string
  id?: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
  TypesOfWork: TypesOfWork
}

export interface SLAList {
  sla?: string
  ola?: string
  id?: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeOfWork: string
  TypesOfWork: TypesOfWork
}

export interface ServiceListItem {
  item: {
    sla?: string
    ola?: string
    id?: string
    time: string
    timeStart: string
    timeEnd: string
    id_typeOfWork: string
  }[]
}

export interface SLAValues {
  list: {
    name: string
    label: string
    value: string | TypesOfWork
    validation: object
    disabled: boolean
    type: string
    required: boolean
  }[]
}

export interface AddValuesAddContract {
  listAddContract: {
    name: string
    label: string
    value: string
    validation: object
    type: string
    required?: boolean
  }[]
}
