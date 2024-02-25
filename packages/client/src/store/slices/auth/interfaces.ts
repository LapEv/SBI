import { FilterListData } from '../incidents/interfaces'

export interface User {
  id?: string
  username?: string
  firstName?: string
  lastName?: string
  middleName?: string
  shortName?: string
  phone?: string
  email?: string
  avatar?: string
  password?: string
  theme?: string
  post?: string
  token?: string
  department?: string
  id_division?: string
  id_department?: string
  rolesGroup?: string
  status?: string
}

export interface ICheckUser {
  user: User
  filterData: FilterListData
  token: string
}

export interface Users {
  data: {
    id?: string
    username?: string
    firstName?: string
    lastName?: string
    middleName?: string
    shortName?: string
    phone?: string
    email?: string
    avatar?: string
    password?: string
    theme?: string
    post?: string
    token?: string
    department?: string
    id_division?: string
    id_department?: string
    rolesGroup?: string[]
  }[]
}

export interface SignUp {
  username: string
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
}

export interface Login {
  username: string
  password: string
}

export interface ChangePasswordProps {
  oldPassword: string
  newPassword: string
  id: string
}
export interface ChangeThemeProps {
  id: number | string | null | undefined
  theme: string
}
export interface FileProps {
  data: string | ArrayBuffer | null
  info: File | undefined
}

export interface UserStatus {
  category: string
  categoryName: string
  id: string
}

export interface AnswerUser {
  data: User[]
  type: string
}

export type AuthState = {
  user: User
  userData: User
  users: User[]
  userStatus: UserStatus[]
  fieldEngineers: User[]
  dispatchers: User[]
  userByDepartment: User[]
  admin: boolean
  superAdmin: boolean
  isLoadingAuth: boolean
  error?: string
}

export interface UserForINC {
  id: string
  username: string
  firstName: string
  lastName: string
  middleName: string
  shortName: string
  active: boolean
}
