import {
  AddINC,
  AddINCStatuses,
  AddTypesOfWork,
  ChangeClosing,
  ChangeClosingCheck,
  ChangeExecutor,
  ChangeINC,
  ChangeINCStatuses,
  ChangeResponsible,
  ChangeTypesOfWork,
  ChangeStatus,
  AddTypesCompletedWork,
  ChangeTypesCompletedWork,
} from 'store/slices/incidents/interfaces'

export interface INCActions {
  getINC: () => void
  getIncidentStatuses: () => void
  getTypesOfWork: () => void
  getTypesCompletedWork: () => void
  newINC: (data: AddINC) => void
  newIncidentStatuses: (data: AddINCStatuses) => void
  newTypesOfWork: (data: AddTypesOfWork) => void
  newTypeCompletedWork: (data: AddTypesCompletedWork) => void
  deleteIncidentStatuses: (data: string[]) => void
  deleteTypesOfWork: (data: string[]) => void
  deleteTypesCompletedWork: (data: string[]) => void
  changeINC: (data: ChangeINC) => void
  changeExecutor: (data: ChangeExecutor) => void
  changeResponsible: (data: ChangeResponsible) => void
  changeStatus: (data: ChangeStatus) => void
  changeUserClosingCheck: (data: ChangeClosingCheck) => void
  changeUserClosing: (data: ChangeClosing) => void
  changeIncidentStatuses: (data: ChangeINCStatuses) => void
  changeTypesOfWork: (data: ChangeTypesOfWork) => void
  changeTypesCompletedWork: (data: ChangeTypesCompletedWork) => void
  setActiveINC: (id: string) => void
}
