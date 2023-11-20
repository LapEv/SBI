import { ChangeOLA, ChangeSLA, OLA, SLA } from 'store/slices/sla/interfaces'

export interface SLAActions {
  getSLA: () => void
  getOLA: () => void
  newSLA: (data: SLA) => void
  newOLA: (data: OLA) => void
  deleteSLA: (data: string[]) => void
  deleteOLA: (data: string[]) => void
  changeSLA: (data: ChangeSLA) => void
  changeOLA: (data: ChangeOLA) => void
  setActiveSLA: (id: string) => void
}
