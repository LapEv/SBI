import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GetUser,
  updateProfile,
  ChangeAvatar,
  CheckUser,
  GetActiveUsers,
  getUserStatus,
  updateUser,
  GetFieldEngineers,
  GetDispatchers,
} from 'api/user'
import { signin, signout, signup } from 'api/user'
import {
  AnswerUser,
  AuthState,
  ICheckUser,
  User,
  UserStatus,
} from './interfaces'

const initialState: AuthState = {
  user: {},
  userData: {},
  users: [],
  userStatus: [],
  fieldEngineers: [],
  dispatchers: [],
  userByDepartment: [],
  admin: false,
  superAdmin: false,
  isLoadingAuth: false,
}

export const authSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserData(state, action) {
      state.userData = action.payload
    },
    clearUser(state) {
      state.user = {}
    },
  },
  extraReducers: {
    [signin.fulfilled.type]: (state, action: PayloadAction<ICheckUser>) => {
      state.isLoadingAuth = false
      state.error = ''
      const { user } = action.payload
      state.user = user
      state.userData = user
      localStorage.setItem('theme', user.theme ?? 'light')
      state.admin =
        (user.rolesGroup?.includes('ADMIN') ||
          user.rolesGroup?.includes('SUPERADMIN')) ??
        false
      state.superAdmin = user.rolesGroup?.includes('SUPERADMIN') ?? false
    },
    [signin.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [signin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [signup.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = action.payload
      state.userData = action.payload
    },
    [signup.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [signup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    [signout.fulfilled.type]: (state, action: PayloadAction<User>) => {
      /* eslint-enable @typescript-eslint/no-unused-vars */
      state.isLoadingAuth = false
      state.error = ''
      state.user = {}
      state.userData = {}
    },
    [signout.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [signout.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [GetUser.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.userData = action.payload
      localStorage.setItem('theme', action.payload.theme ?? 'light')
    },
    [GetUser.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [GetUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [GetFieldEngineers.fulfilled.type]: (
      state,
      action: PayloadAction<User[]>
    ) => {
      state.isLoadingAuth = false
      state.error = ''
      state.fieldEngineers = action.payload
    },
    [GetFieldEngineers.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [GetFieldEngineers.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [GetDispatchers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.dispatchers = action.payload
    },
    [GetDispatchers.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [GetDispatchers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [GetActiveUsers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.users = action.payload
    },
    [GetActiveUsers.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [GetActiveUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [CheckUser.fulfilled.type]: (state, action: PayloadAction<ICheckUser>) => {
      state.isLoadingAuth = false
      state.error = ''
      const { user } = action.payload
      state.user = user
      state.userData = user
      localStorage.setItem('theme', user.theme ?? 'light')
      state.admin =
        (user.rolesGroup?.includes('ADMIN') ||
          user.rolesGroup?.includes('SUPERADMIN')) ??
        false
      state.superAdmin = user.rolesGroup?.includes('SUPERADMIN') ?? false
    },
    [CheckUser.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [CheckUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [updateProfile.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = action.payload
    },
    [updateProfile.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [updateProfile.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [ChangeAvatar.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = action.payload
    },
    [ChangeAvatar.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [ChangeAvatar.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [getUserStatus.fulfilled.type]: (
      state,
      action: PayloadAction<UserStatus[]>
    ) => {
      state.isLoadingAuth = false
      state.error = ''
      state.userStatus = action.payload
    },
    [getUserStatus.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [getUserStatus.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<AnswerUser>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.users = action.payload.data
    },
    [updateUser.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [updateUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
  },
})

export const authReducer = authSlise.reducer
// export const { updateUserData, updateEditStatus } = authSlise.actions
export const { updateUserData, clearUser } = authSlise.actions
