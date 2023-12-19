import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { INCActions } from './incActions'
import { INCState } from 'store/slices/incidents/interfaces'
import {
  changeINC,
  changeIncidentStatuses,
  changeTypesOfWork,
  deleteIncidentStatuses,
  deleteTypesOfWork,
  getINC,
  getIncidentStatuses,
  getTypesOfWork,
  newINC,
  newIncidentStatuses,
  newTypeOfWork,
} from 'api/incidents'
import { setActiveINC } from 'store/slices/incidents'

export function useIncidents(): [INCState, INCActions] {
  const incidents = useSelector((state: RootState) => state.incidents)
  const dispatch = useAppDispatch()

  return [
    incidents,
    {
      getINC() {
        dispatch(getINC())
      },
      getIncidentStatuses() {
        dispatch(getIncidentStatuses())
      },
      getTypesOfWork() {
        dispatch(getTypesOfWork())
      },
      newINC(data) {
        dispatch(newINC(data))
      },
      newIncidentStatuses(data) {
        dispatch(newIncidentStatuses(data))
      },
      newTypesOfWork(data) {
        dispatch(newTypeOfWork(data))
      },
      deleteIncidentStatuses(data) {
        dispatch(deleteIncidentStatuses(data))
      },
      changeINC(data) {
        dispatch(changeINC(data))
      },
      deleteTypesOfWork(data) {
        dispatch(deleteTypesOfWork(data))
      },
      changeIncidentStatuses(data) {
        dispatch(changeIncidentStatuses(data))
      },
      changeTypesOfWork(data) {
        dispatch(changeTypesOfWork(data))
      },
      setActiveINC(id) {
        dispatch(setActiveINC(id))
      },
    },
  ]
}
