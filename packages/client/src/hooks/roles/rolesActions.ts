import { Roles, RolesGroup } from 'storeRoles/interfaces'

export interface RolesActions {
  getRoles: () => void
  getRolesGroup: () => void
  setActiveRolesGroup: (data: string) => void
  newRole: (data: Roles) => void
  newRoleGroup: (data: RolesGroup) => void
}
