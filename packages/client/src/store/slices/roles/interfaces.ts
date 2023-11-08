export interface Roles {
  id: string
  role: string
  nameRole: string
  createdAt?: string
  updatedAt?: string
}

export interface RolesGroup {
  group: string
  roles: string[]
  id: string
  groupName: string
}

// export interface RolesGroupObject {
//   nameRole: string
//   id: string
//   role: string
// }

export interface СhangeRolesGroup {
  roles: Roles[]
  activeRolesGroup: string
}

export interface AnswerRole {
  data: Roles[]
  type: string
}

export interface AnswerRolesGroup {
  data: RolesGroup[]
  type: string
}

export type RolesState = {
  roles: Roles[]
  rolesGroup: RolesGroup[]
  activeRolesGroup: string
  isLoadingRoles: boolean
  error?: string
}
