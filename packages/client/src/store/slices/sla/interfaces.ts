export interface SLA {
  id: string
  sla: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeSLA: string
  active: boolean
  TypesSLA: TypesSLA
}

export interface AddSLA {
  sla: string
  time: string
  timeStart: string
  timeEnd: string
}

export interface OLA {
  id: string
  ola: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeSLA: string
  active: boolean
  TypesSLA: TypesSLA
}

export interface AddOLA {
  ola: string
  time: string
  timeStart: string
  timeEnd: string
}

export interface TypesSLA {
  id: string
  typeSLA: string
  active?: boolean
}

export interface AddTypesSLA {
  typeSLA: string
}

export interface AnswerSLA {
  data: SLA[]
  type: string
}

export interface AnswerOLA {
  data: OLA[]
  type: string
}

export interface AnswerTypesSLA {
  data: TypesSLA[]
  type: string
}

export type SLAState = {
  sla: SLA[]
  ola: OLA[]
  typesSLA: TypesSLA[]
  activeSLA: string
  activeList: string
  isLoadingRoles: boolean
  error?: string
}

export interface ChangeSLA {
  sla: string
  id?: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeSLA: string
}
export interface ChangeOLA {
  ola: string
  id?: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeSLA: string
}

export interface ChangeTypesSLA {
  typeSLA: string
  id?: string
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
  id_typeSLA: string
  TypesSLA: TypesSLA
}

export interface SLAList {
  sla?: string
  ola?: string
  id?: string
  time: string
  timeStart: string
  timeEnd: string
  id_typeSLA: string
  TypesSLA: TypesSLA
}

export interface ServiceListItem {
  item: {
    sla?: string
    ola?: string
    id?: string
    time: string
    timeStart: string
    timeEnd: string
    id_typeSLA: string
  }[]
}

export interface SLAValues {
  list: {
    name: string
    label: string
    value: string | TypesSLA
    validation: object
    disabled: boolean
    type: string
  }[]
}
