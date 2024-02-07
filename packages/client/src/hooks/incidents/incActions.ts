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
} from 'store/slices/incidents/interfaces'

export interface INCActions {
  getINC: () => void
  getIncidentStatuses: () => void
  getTypesOfWork: () => void
  newINC: (data: AddINC) => void
  newIncidentStatuses: (data: AddINCStatuses) => void
  newTypesOfWork: (data: AddTypesOfWork) => void
  deleteIncidentStatuses: (data: string[]) => void
  deleteTypesOfWork: (data: string[]) => void
  changeINC: (data: ChangeINC) => void
  changeExecutor: (data: ChangeExecutor) => void
  changeResponsible: (data: ChangeResponsible) => void
  changeStatus: (data: ChangeStatus) => void
  changeUserClosingCheck: (data: ChangeClosingCheck) => void
  changeUserClosing: (data: ChangeClosing) => void
  changeIncidentStatuses: (data: ChangeINCStatuses) => void
  changeTypesOfWork: (data: ChangeTypesOfWork) => void
  setActiveINC: (id: string) => void
}
