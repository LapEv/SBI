import { ChangeContract, Contracts } from 'store/slices/contracts/interfaces'

export interface ContractsActions {
  getContracts: () => void
  getContractsByClientID: (id_client: string) => void
  newContract: (data: Contracts) => void
  deleteContract: (data: string[]) => void
  changeContract: (data: ChangeContract) => void
  setActiveContract: (id: string) => void
}
