import {
  SignUp,
  FileProps,
  Login,
  User,
  ChangePasswordProps,
  ChangeThemeProps,
} from 'storeAuth/interfaces'
export interface AuthActions {
  signin: (authData: Login, callback: () => void) => void
  signup: (signUpData: SignUp) => void
  signout: () => void
  changeProfile: (data: User) => void
  changeAvatar: (data: FileProps) => void
  changePassword: (data: ChangePasswordProps) => void
  changeThemeOnServer: (data: ChangeThemeProps) => void
  getUser: (id: string) => void
  getActiveUsers: (data: User) => void
  checkUser: () => void
  updateUserData: (data: User) => void
  updateEditStatus: (data: string) => void
  getUserStatus: () => void
  deleteUsers: (id: string[]) => void
  updateUser: (data: User) => void
}
