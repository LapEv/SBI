import {
  ChangeClassifierEquipment,
  ChangeClassifierModel,
  ChangeTypicalMalfunction,
  ClassifierEquipment,
  ClassifierModels,
  TypicalMalfunctions,
} from 'store/slices/classifier/interfaces'

export interface ClassifierActions {
  getClassifierEquipments: () => void
  getClassifierModels: () => void
  getClassifierModelsById: (id_equipment: string) => void
  getTypicalMalfunctions: () => void
  getTypicalMalfunctionsById: (id_equipment: string) => void
  newClassifierEquipment: (data: ClassifierEquipment) => void
  newClassifierModel: (data: ClassifierModels) => void
  newTypicalMalfunction: (data: TypicalMalfunctions) => void
  deleteClassifierEquipment: (data: string[]) => void
  deleteClassifierModel: (data: string[]) => void
  deleteTypicalMalfunction: (data: string[]) => void
  changeClassifierEquipment: (data: ChangeClassifierEquipment) => void
  changeClassifierModel: (data: ChangeClassifierModel) => void
  changeTypicalMalfunction: (data: ChangeTypicalMalfunction) => void
  setActiveEquipment: (id: string) => void
  setActiveModel: (id: string) => void
}
