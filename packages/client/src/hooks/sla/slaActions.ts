import {
  AddOLA,
  AddSLA,
  AddTypesSLA,
  ChangeOLA,
  ChangeSLA,
  ChangeTypesSLA,
} from 'store/slices/sla/interfaces'

export interface SLAActions {
  getSLA: () => void
  getOLA: () => void
  getTypesSLA: () => void
  newSLA: (data: AddSLA) => void
  newOLA: (data: AddOLA) => void
  newTypesSLA: (data: AddTypesSLA) => void
  deleteSLA: (data: string[]) => void
  deleteOLA: (data: string[]) => void
  deleteTypesSLA: (data: string[]) => void
  changeSLA: (data: ChangeSLA) => void
  changeOLA: (data: ChangeOLA) => void
  changeTypesSLA: (data: ChangeTypesSLA) => void
  setActiveSLA: (id: string) => void
  setActiveList: (id: string) => void
}
