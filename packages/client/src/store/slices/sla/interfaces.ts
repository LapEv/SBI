import { DataList } from 'components/CheckBoxGroup/interface'

export interface SLA {
  id?: string
  sla: string
  active?: boolean
}
export interface OLA {
  id?: string
  ola: string
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
