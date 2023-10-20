import { useSelector } from 'react-redux'
import {
  GetUser,
  GetActiveUsers,
  ChangeProfile,
  ChangeAvatar,
  changePassword,
  ChangeTheme,
  CheckUser,
  getUserStatus,
  deleteUsers,
  updateUser,
} from 'api/user'
import { signin, signout, signup } from 'api/user'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { updateUserData } from 'store/slices/auth'
import { AuthActions } from './authActions'
import { AuthState } from 'storeAuth/interfaces'

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
      signup(signUpData) {
        dispatch(signup(signUpData))
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
        dispatch(changePassword(data))
      },
      changeThemeOnServer(data) {
        dispatch(ChangeTheme(data))
      },
      getUser(id) {
        dispatch(GetUser(id))
      },
      getActiveUsers(data) {
        dispatch(GetActiveUsers(data))
      },
      checkUser() {
        dispatch(CheckUser())
      },
      updateUserData(data) {
        dispatch(updateUserData(data))
      },
      // updateEditStatus(data) {
      //   dispatch(updateEditStatus(data))
      // },
      getUserStatus() {
        dispatch(getUserStatus())
      },
      deleteUsers(id) {
        dispatch(deleteUsers(id))
      },
      updateUser(data) {
        dispatch(updateUser(data))
      },
    },
  ]
}
