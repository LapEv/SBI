import { DataList } from 'components/CheckBoxGroup/interface'
import {
  ChangeClassifierEquipment,
  ChangeClassifierModel,
  ChangeTypicalMalfunction,
  ClassifierEquipment,
  ClassifierModels,
  ChangeModelsInTypicalMalfunction,
  AddTypicalMalfunctions,
} from 'store/slices/classifier/interfaces'

export interface ClassifierActions {
  getClassifierEquipments: () => void
  getClassifierModels: () => void
  getClassifierModelsById: (id_equipment: string) => void
  getTypicalMalfunctions: () => void
  getTypicalMalfunctionsById: (id_equipment: string) => void
  newClassifierEquipment: (data: ClassifierEquipment) => void
  newClassifierModel: (data: ClassifierModels) => void
  newTypicalMalfunction: (data: AddTypicalMalfunctions) => void
  deleteClassifierEquipment: (data: string[]) => void
  deleteClassifierModel: (data: string[]) => void
  deleteTypicalMalfunction: (data: string[]) => void
  changeClassifierEquipment: (data: ChangeClassifierEquipment) => void
  changeClassifierModel: (data: ChangeClassifierModel) => void
  changeTypicalMalfunction: (data: ChangeTypicalMalfunction) => void
  changeModelsInTypicalMalfunction: ({
    id_equipment,
    newTypicalMalfunction,
  }: ChangeModelsInTypicalMalfunction) => void
  setActiveEquipment: (id: string) => void
  setActiveModel: (id: string) => void
}
