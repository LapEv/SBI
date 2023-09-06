import { Nullable } from 'utils/nullableType'

type NullableString = Nullable<string>

export interface User {
  id?: number
  username?: NullableString
  firstName?: NullableString
  lastName?: NullableString
  phone?: NullableString
  email?: NullableString
  avatar?: NullableString
  password?: NullableString
  theme?: NullableString
  token?: string
  department?: NullableString
  id_division?: NullableString
  id_department?: NullableString
}
export interface SignUp {
  username: NullableString
  firstName: NullableString
  lastName: NullableString
  phone: NullableString
  email: NullableString
  password: NullableString
}

export interface Login {
  username: string
  password: string
}

export interface ChangePasswordProps {
  oldPassword: string
  newPassword: string
}

export interface ChangeThemeProps {
  id: number | string | null | undefined
  theme: string
}
export interface FileProps {
  data: string | ArrayBuffer | null
  info: File | undefined
}
