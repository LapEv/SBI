import { Nullable } from 'utils/nullableType'

type NullableString = Nullable<string>

export interface Roles {
  id: number
  role: NullableString
  nameRole: NullableString
}

export interface RolesGroup {
  group: NullableString
  roles: string[]
}
