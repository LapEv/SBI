import { Nullable } from 'utils/nullableType'

type NullableString = Nullable<string>

export interface Roles {
  id: string
  role: NullableString
  nameRole: NullableString
}

export interface RolesGroup {
  group: NullableString
  roles: RolesGroupObject[]
  id: string
  groupName: NullableString
}

export interface RolesGroupObject {
  nameRole: NullableString
  id: string
  role: NullableString
}

export interface СhangeRolesGroup {
  roles: Roles[]
  activeRolesGroup: string
}
