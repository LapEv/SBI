import { Roles, RolesGroup } from 'storeRoles/interfaces'

export interface RolesActions {
  getRoles: () => void
  getRolesGroup: () => void
  setActiveRolesGroup: (data: string) => void
  newRole: (data: Roles) => void
  newRolesGroup: (data: RolesGroup) => void
  deleteRoles: (data: string[]) => void
  deleteRolesGroup: (data: string[]) => void
  changeRolesGroup: (roles: string[], activeRolesGroup: string) => void
}
