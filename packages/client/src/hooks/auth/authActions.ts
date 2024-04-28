import {
  SignUp,
  FileProps,
  Login,
  User,
  ChangePasswordProps,
  ChangeThemeProps,
} from 'storeAuth/interfaces'
export interface AuthActions {
  signin: (authData: Login) => void
  signup: (signUpData: SignUp) => void
  signout: () => void
  updateProfile: (data: User) => void
  changeAvatar: (data: FileProps) => void
  changePassword: (data: ChangePasswordProps) => void
  changeThemeOnServer: (data: ChangeThemeProps) => void
  getUser: (id: string) => void
  getFieldEngineers: () => void
  getDispatchers: () => void
  getActiveUsers: (data: User) => void
  checkUser: () => void
  updateUserData: (data: User) => void
  getUserStatus: () => void
  deleteUser: (id: string, reasonOfDelete: string) => void
  updateUser: (data: User) => void
}
