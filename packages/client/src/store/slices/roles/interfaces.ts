export interface Roles {
  id: string
  role: string
  nameRole: string
  createdAt?: string
  updatedAt?: string
}

export interface RolesGroup {
  group: string
  roles: RolesGroupObject[]
  id: string
  groupName: string
}

export interface RolesGroupObject {
  nameRole: string
  id: string
  role: string
}

export interface СhangeRolesGroup {
  roles: string[]
  activeRolesGroup: string
}
