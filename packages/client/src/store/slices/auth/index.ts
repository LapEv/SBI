import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GetUser,
  ChangeProfile,
  ChangeAvatar,
  CheckUser,
  GetUsers,
} from 'api/user'
import { signin, signout, signup } from 'api/user'
import { Nullable } from 'utils/nullableType'
import { User } from './interfaces'

export type AuthState = {
  user: Nullable<User>
  userData: Nullable<User>
  users: User[]
  admin: boolean
  superAdmin: boolean
  editStatus: string
  isLoadingAuth: boolean
  error?: string
}

const initialState: AuthState = {
  user: null,
  userData: null,
  users: [],
  admin: false,
  superAdmin: false,
  editStatus: 'info',
  isLoadingAuth: false,
}

export const authSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserData(state, action) {
      state.userData = action.payload
    },
    updateEditStatus(state, action) {
      state.editStatus = action.payload
    },
  },
  extraReducers: {
    [signin.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = action.payload
      state.userData = action.payload
      state.admin =
        (state.user.roles?.includes('ADMIN') ||
          state.user.roles?.includes('SUPERADMIN')) ??
        false
      state.superAdmin = state.user.roles?.includes('SUPERADMIN') ?? false
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
    [signout.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = null
      state.userData = null
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
    [GetUsers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.users = action.payload
    },
    [GetUsers.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [GetUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },

    [CheckUser.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = action.payload
      state.userData = action.payload
      localStorage.setItem('theme', action.payload.theme ?? 'light')
      state.admin =
        (state.user.roles?.includes('ADMIN') ||
          state.user.roles?.includes('SUPERADMIN')) ??
        false
      state.superAdmin = state.user.roles?.includes('SUPERADMIN') ?? false
    },
    [CheckUser.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [CheckUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingAuth = false
      state.error = action.payload
    },
    [ChangeProfile.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = action.payload
    },
    [ChangeProfile.pending.type]: state => {
      state.isLoadingAuth = true
    },
    [ChangeProfile.rejected.type]: (state, action: PayloadAction<string>) => {
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
  },
})

export const authReducer = authSlise.reducer
export const { updateUserData, updateEditStatus } = authSlise.actions
