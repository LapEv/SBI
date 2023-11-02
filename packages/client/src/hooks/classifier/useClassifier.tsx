import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { ClassifierActions } from './ClassifierActions'
import {
  getClassifierEquipments,
  getClassifierModels,
  getTypicalMalfunctions,
  newClassifierEquipment,
  newClassifierModel,
  newTypicalMalfunction,
  deleteclassifierEquipment,
  deleteClassifierModel,
  deleteTypicalMalfunction,
  changeClassifierEquipment,
  changeClassifierModel,
  changeTypicalMalfunction,
} from 'api/classifier'
import { ClassifierState } from 'store/slices/classifier/interfaces'

export function useClassifier(): [ClassifierState, ClassifierActions] {
  const classifier = useSelector((state: RootState) => state.classifier)
  const dispatch = useAppDispatch()

  return [
    classifier,
    {
      getClassifierEquipments() {
        dispatch(getClassifierEquipments())
      },
      getClassifierModels() {
        dispatch(getClassifierModels())
      },
      getTypicalMalfunctions() {
        dispatch(getTypicalMalfunctions())
      },
      newClassifierEquipment(data) {
        dispatch(newClassifierEquipment(data))
      },
      newClassifierModel(data) {
        dispatch(newClassifierModel(data))
      },
      newTypicalMalfunction(data) {
        dispatch(newTypicalMalfunction(data))
      },
      deleteclassifierEquipment(data) {
        dispatch(deleteclassifierEquipment(data))
      },
      deleteClassifierModel(data) {
        dispatch(deleteClassifierModel(data))
      },
      deleteTypicalMalfunction(data) {
        dispatch(deleteTypicalMalfunction(data))
      },
      changeClassifierEquipment(newClassifierEquipment, id) {
        dispatch(changeClassifierEquipment({ newClassifierEquipment, id }))
      },
      changeClassifierModel(newClassifierModel, id) {
        dispatch(changeClassifierModel({ newClassifierModel, id }))
      },
      changeTypicalMalfunction(newTypicalMalfunction, id) {
        dispatch(changeTypicalMalfunction({ newTypicalMalfunction, id }))
      },
    },
  ]
}
