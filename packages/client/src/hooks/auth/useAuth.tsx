import { useSelector } from 'react-redux'
import {
  GetUser,
  GetUsers,
  ChangeProfile,
  ChangeAvatar,
  ChangePassword,
  ChangeTheme,
  CheckUser,
} from 'api/user'
import { signin, signout, signup } from 'api/user'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { AuthState, updateEditStatus, updateUserData } from 'store/slices/auth'
import { AuthActions } from './authActions'

export function useAuth(): [AuthState, AuthActions] {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  return [
    auth,
    {
      signin(authData, callback) {
        dispatch(signin(authData))
        callback()
      },
      signup(signUpData, callback) {
        dispatch(signup(signUpData))
        callback()
      },
      signout() {
        dispatch(signout())
      },
      changeProfile(data) {
        dispatch(ChangeProfile(data))
      },
      changeAvatar(data) {
        dispatch(ChangeAvatar(data))
      },
      changePassword(data) {
        dispatch(ChangePassword(data))
      },
      changeThemeOnServer(data) {
        dispatch(ChangeTheme(data))
      },
      getUser(id) {
        dispatch(GetUser(id))
      },
      getUsers(data) {
        dispatch(GetUsers(data))
      },
      checkUser() {
        dispatch(CheckUser())
      },
      updateUserData(data) {
        dispatch(updateUserData(data))
      },
      updateEditStatus(data) {
        dispatch(updateEditStatus(data))
      },
    },
  ]
}
