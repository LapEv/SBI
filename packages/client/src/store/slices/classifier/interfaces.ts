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
  id_model: string
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
  newClassifierEquipment: ClassifierEquipment
  id: string
}

export interface ChangeClassifierModel {
  newClassifierModel: ClassifierModels
  id: string
}

export interface ChangeTypicalMalfunction {
  newTypicalMalfunction: TypicalMalfunctions
  id: string
}
