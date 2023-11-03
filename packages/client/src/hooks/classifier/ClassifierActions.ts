import {
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
  deleteclassifierEquipment: (data: string[]) => void
  deleteClassifierModel: (data: string[]) => void
  deleteTypicalMalfunction: (data: string[]) => void
  changeClassifierEquipment: (
    newClassifierEquipment: ClassifierEquipment,
    id: string
  ) => void
  changeClassifierModel: (
    newClassifierModel: ClassifierModels,
    id: string
  ) => void
  changeTypicalMalfunction: (
    changeTypicalMalfunction: TypicalMalfunctions,
    id: string
  ) => void
  setActiveEquipment: (id: string) => void
  setActiveModel: (id: string) => void
}
