import { createSlice } from '@reduxjs/toolkit'
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
import { signin, signup } from 'api/user'
import { AuthState, ICheckUser, User, UserStatus } from './interfaces'

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
  isLoadingAuth: true,
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
    signout(state) {
      localStorage.removeItem('token')
      state.error = ''
      state.user = {}
      state.userData = {}
    },
  },
  extraReducers: builder => {
    builder.addCase(signin.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      const { user } = payload as ICheckUser
      state.user = user
      state.userData = user
      localStorage.setItem('theme', user.theme ?? 'light')
      state.admin =
        (user.rolesGroup?.includes('ADMIN') ||
          user.rolesGroup?.includes('SUPERADMIN')) ??
        false
      state.superAdmin = user.rolesGroup?.includes('SUPERADMIN') ?? false
    })
    builder.addCase(signin.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(signin.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = payload as User
      state.userData = payload as User
    })
    builder.addCase(signup.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(signup.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(GetUser.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = payload as User
      localStorage.setItem('theme', payload?.theme ?? 'light')
    })
    builder.addCase(GetUser.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(GetUser.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(GetFieldEngineers.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.fieldEngineers = payload as User[]
    })
    builder.addCase(GetFieldEngineers.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(GetFieldEngineers.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(GetDispatchers.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.dispatchers = payload as User[]
    })
    builder.addCase(GetDispatchers.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(GetDispatchers.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(GetActiveUsers.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.users = payload as User[]
    })
    builder.addCase(GetActiveUsers.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(GetActiveUsers.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(CheckUser.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      const { user } = payload as ICheckUser
      console.log('user = ', user)
      if (user) {
        state.user = user
        state.userData = user
        localStorage.setItem('theme', user.theme ?? 'light')
        state.admin =
          (user.rolesGroup?.includes('ADMIN') ||
            user.rolesGroup?.includes('SUPERADMIN')) ??
          false
        state.superAdmin = user.rolesGroup?.includes('SUPERADMIN') ?? false
      } else {
        localStorage.setItem('theme', 'light')
      }
    })
    builder.addCase(CheckUser.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(CheckUser.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = payload as User
    })
    builder.addCase(updateProfile.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(ChangeAvatar.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.user = payload as User
    })
    builder.addCase(ChangeAvatar.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(ChangeAvatar.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(getUserStatus.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.userStatus = payload as UserStatus[]
    })
    builder.addCase(getUserStatus.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(getUserStatus.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = ''
      state.users = payload?.data as User[]
    })
    builder.addCase(updateUser.pending, state => {
      state.isLoadingAuth = true
    })
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoadingAuth = false
      state.error = payload as string
    })
  },
})

export const authReducer = authSlise.reducer
export const { updateUserData, clearUser, signout } = authSlise.actions
