import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { SLAState } from 'store/slices/sla/interfaces'
import { SLAActions } from './slaActions'
import {
  getSLA,
  getOLA,
  newSLA,
  newOLA,
  deleteSLA,
  deleteOLA,
  changeSLA,
  changeOLA,
  getTypesSLA,
  changeTypesSLA,
  deleteTypesSLA,
  newTypesSLA,
} from 'api/sla'
import { setActiveList, setActiveSLA } from 'store/slices/sla'

export function useSLA(): [SLAState, SLAActions] {
  const sla = useSelector((state: RootState) => state.sla)
  const dispatch = useAppDispatch()

  return [
    sla,
    {
      getSLA() {
        dispatch(getSLA())
      },
      getOLA() {
        dispatch(getOLA())
      },
      getTypesSLA() {
        dispatch(getTypesSLA())
      },
      newSLA(data) {
        dispatch(newSLA(data))
      },
      newOLA(data) {
        dispatch(newOLA(data))
      },
      newTypesSLA(data) {
        dispatch(newTypesSLA(data))
      },
      deleteSLA(data) {
        dispatch(deleteSLA(data))
      },
      deleteOLA(data) {
        dispatch(deleteOLA(data))
      },
      deleteTypesSLA(data) {
        dispatch(deleteTypesSLA(data))
      },
      changeSLA(data) {
        dispatch(changeSLA(data))
      },
      changeOLA(data) {
        dispatch(changeOLA(data))
      },
      changeTypesSLA(data) {
        dispatch(changeTypesSLA(data))
      },
      setActiveSLA(id) {
        dispatch(setActiveSLA(id))
      },
      setActiveList(id) {
        dispatch(setActiveList(id))
      },
    },
  ]
}
