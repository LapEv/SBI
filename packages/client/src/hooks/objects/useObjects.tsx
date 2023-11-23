import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { ContractsActions } from './objectsActions'
import { ContractsState } from 'store/slices/contracts/interfaces'
import { changeObject, deleteObjects, getObjects, newObject } from 'api/objects'
import { setActiveObject } from 'store/slices/objects'

export function useContracts(): [ContractsState, ContractsActions] {
  const contracts = useSelector((state: RootState) => state.contracts)
  const dispatch = useAppDispatch()

  return [
    contracts,
    {
      getObjects() {
        dispatch(getObjects())
      },
      newObject(data) {
        dispatch(newObject(data))
      },
      deleteObjects(data) {
        dispatch(deleteObjects(data))
      },
      changeObject(data) {
        dispatch(changeObject(data))
      },
      setActiveObject(id) {
        dispatch(setActiveObject(id))
      },
    },
  ]
}
