import { DataList } from 'components/CheckBoxGroup/interface'

export interface ClassifierEquipment {
  id?: string
  equipment: string
  active?: boolean
  ClassifierModels?: ClassifierModels[]
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
  isLoadingClassifier: boolean
  error?: string
}

export interface ChangeClassifierEquipment {
  equipment: string
  id: string
}

export interface ChangeClassifierModel {
  model: string
  id: string
  id_equipment: string
}

export interface ChangeTypicalMalfunction {
  typicalMalfunction: string
  id: string
}

export interface ShortTypicalMalfunctions {
  models: string[]
  id: string
}

export interface ChangeModelsInTypicalMalfunction {
  newTypicalMalfunction: ShortTypicalMalfunctions[]
  id_equipment: string
}
