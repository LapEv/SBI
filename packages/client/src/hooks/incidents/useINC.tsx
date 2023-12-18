import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { INCActions } from './incActions'
import { INCState } from 'store/slices/incidents/interfaces'
import {
  changeINC,
  changeIncidentStatuses,
  deleteIncidentStatuses,
  getINC,
  getIncidentStatuses,
  newINC,
  newIncidentStatuses,
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
      newINC(data) {
        dispatch(newINC(data))
      },
      newIncidentStatuses(data) {
        dispatch(newIncidentStatuses(data))
      },
      deleteIncidentStatuses(data) {
        dispatch(deleteIncidentStatuses(data))
      },
      changeINC(data) {
        dispatch(changeINC(data))
      },
      changeIncidentStatuses(data) {
        dispatch(changeIncidentStatuses(data))
      },
      setActiveINC(id) {
        dispatch(setActiveINC(id))
      },
    },
  ]
}
