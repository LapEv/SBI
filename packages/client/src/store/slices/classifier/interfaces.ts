export interface ClassifierEquipment {
  id?: string
  equipment: string
  active?: boolean
}
export interface ClassifierModels {
  id?: string
  model: string
  id_equipment: string
  active?: boolean
  selectedTypicalMalfunctions?: string[]
}

export interface TypicalMalfunctions {
  id?: string
  typicalMalfunction: string
  models: string[]
  id_equipment: string
  active?: boolean
}

export interface AnswerClassifierEquipment {
  data: ClassifierEquipment[]
  type: string
}

export interface AnswerClassifierModels {
  data: ClassifierModels[]
  type: string
}

export interface AnswerTypicalMalfunctions {
  data: TypicalMalfunctions[]
  type: string
}

export type ClassifierState = {
  equipments: ClassifierEquipment[]
  models: ClassifierModels[]
  typicalMalfunctions: TypicalMalfunctions[]
  activeEquipment: string
  activeModel: string
  isLoadingRoles: boolean
  error?: string
}

export interface ChangeClassifierEquipment {
  equipment: string
  id: string
}

export interface ChangeClassifierModel {
  model: string
  id: string
}

export interface ChangeTypicalMalfunction {
  typicalMalfunction: string
  id: string
}
