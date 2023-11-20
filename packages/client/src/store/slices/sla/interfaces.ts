import { DataList } from 'components/CheckBoxGroup/interface'

export interface SLA {
  id?: string
  sla: string
  time: string
  timeStart: string
  timeEnd: string
  active?: boolean
}
export interface OLA {
  id?: string
  ola: string
  time: string
  timeStart: string
  timeEnd: string
  active?: boolean
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
  isLoadingRoles: boolean
  error?: string
}

export interface ChangeSLA {
  sla: string
  id: string
}
export interface ChangeOLA {
  ola: string
  id: string
}
