import { useSelector } from 'react-redux'
import {
  GetUser,
  GetActiveUsers,
  GetFieldEngineers,
  updateProfile,
  ChangeAvatar,
  changePassword,
  ChangeTheme,
  CheckUser,
  getUserStatus,
  deleteUser,
  updateUser,
  GetDispatchers,
} from 'api/user'
import { signin, signup } from 'api/user'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { signout, updateUserData } from 'store/slices/auth'
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
      updateProfile(data) {
        dispatch(updateProfile(data))
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
      getFieldEngineers() {
        dispatch(GetFieldEngineers())
      },
      getDispatchers() {
        dispatch(GetDispatchers())
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
      deleteUser(id, reasonOfDelete) {
        dispatch(deleteUser({ id, reasonOfDelete }))
      },
      updateUser(data) {
        dispatch(updateUser(data))
      },
    },
  ]
}
