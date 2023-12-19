import {
  AddINC,
  AddINCStatuses,
  AddTypesOfWork,
  ChangeINC,
  ChangeINCStatuses,
  ChangeTypesOfWork,
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
  changeIncidentStatuses: (data: ChangeINCStatuses) => void
  changeTypesOfWork: (data: ChangeTypesOfWork) => void
  setActiveINC: (id: string) => void
}
