import {
  SignUp,
  FileProps,
  Login,
  User,
  ChangePasswordProps,
  ChangeThemeProps,
  NewUser,
} from 'storeAuth/interfaces'
export interface AuthActions {
  signin: (authData: Login, callback: () => void) => void
  signup: (signUpData: SignUp, callback: () => void) => void
  signout: () => void
  changeProfile: (data: User) => void
  changeAvatar: (data: FileProps) => void
  changePassword: (data: ChangePasswordProps) => void
  changeThemeOnServer: (data: ChangeThemeProps) => void
  getUser: (id: string) => void
  getUsers: (data: User) => void
  checkUser: () => void
  updateUserData: (data: User) => void
  updateEditStatus: (data: string) => void
  addUser: (data: NewUser) => void
}
