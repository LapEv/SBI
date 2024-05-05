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
  signin: (authData: Login) => void
  signup: (signUpData: SignUp) => void
  newUser: (newUserData: NewUser) => void
  signout: () => void
  updateProfile: (data: User) => void
  changeAvatar: (data: FileProps) => void
  changePassword: (data: ChangePasswordProps) => void
  changeThemeOnServer: (data: ChangeThemeProps) => void
  getUserInfo: (id: string) => void
  getFieldEngineers: () => void
  getDispatchers: () => void
  getActiveUsers: (data: User) => void
  checkUser: () => void
  updateUserData: (data: User) => void
  getUserStatus: () => void
  deleteUser: (id: string, reasonOfDelete: string) => void
  updateUser: (data: User) => void
  setActiveUserInfo: (id: string) => void
}
