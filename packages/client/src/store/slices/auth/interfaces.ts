export interface User {
  id?: string
  username?: string
  firstName?: string
  lastName?: string
  middleName?: string
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
  roles?: string[]
  roleGroup?: string
}

export interface Users {
  data: {
    id?: string
    username?: string
    firstName?: string
    lastName?: string
    middleName?: string
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
    roles?: string[]
    roleGroup?: string[]
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
