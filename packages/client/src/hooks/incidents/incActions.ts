import {
  AddINC,
  AddINCStatuses,
  ChangeINC,
  ChangeINCStatuses,
} from 'store/slices/incidents/interfaces'

export interface INCActions {
  getINC: () => void
  getIncidentStatuses: () => void
  newINC: (data: AddINC) => void
  newIncidentStatuses: (data: AddINCStatuses) => void
  deleteIncidentStatuses: (data: string[]) => void
  changeINC: (data: ChangeINC) => void
  changeIncidentStatuses: (data: ChangeINCStatuses) => void
  setActiveINC: (id: string) => void
}
