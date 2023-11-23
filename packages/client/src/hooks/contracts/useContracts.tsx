import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { ContractsActions } from './contractsActions'
import {
  changeContract,
  deleteContract,
  getContracts,
  newContract,
} from 'api/contracts'
import { ContractsState } from 'store/slices/contracts/interfaces'
import { setActiveContract } from 'store/slices/contracts'

export function useContracts(): [ContractsState, ContractsActions] {
  const contracts = useSelector((state: RootState) => state.contracts)
  const dispatch = useAppDispatch()

  return [
    contracts,
    {
      getContracts() {
        dispatch(getContracts())
      },
      newContract(data) {
        dispatch(newContract(data))
      },
      deleteContract(data) {
        dispatch(deleteContract(data))
      },
      changeContract(data) {
        dispatch(changeContract(data))
      },
      setActiveContract(id) {
        dispatch(setActiveContract(id))
      },
    },
  ]
}
