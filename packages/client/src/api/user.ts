import { JwtPayload } from 'jsonwebtoken'
import { createAsyncThunk } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode'
import {
  Login,
  SignUp,
  User,
  ChangePasswordProps,
  ChangeThemeProps,
  FileProps,
} from 'storeAuth/interfaces'
import { authhost, host, ApiEndPoints } from './config'

export const signin = createAsyncThunk(
  'user/login',
  async (loginData: Login, thunkAPI) => {
    try {
      const { data } = await host.post(ApiEndPoints.User.Login, loginData)
      localStorage.setItem('token', data.token)
      const { id } = jwt_decode(data.token) as JwtPayload
      return { ...data, id }
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось авторизоваться')
    }
  }
)

export const signup = createAsyncThunk(
  'user/setUser',
  async (signUpData: SignUp, thunkAPI) => {
    try {
      const { data } = await host.post(ApiEndPoints.User.SetUser, signUpData)
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось зарегистрироваться!')
    }
  }
)

export const signout = createAsyncThunk('user/signout', async (_, thunkAPI) => {
  try {
    localStorage.removeItem('token')
    return null
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось выйти')
  }
})

export const GetUser = createAsyncThunk(
  'user/getUserInfo',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<User>(ApiEndPoints.User.UserInfo)
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить данные пользователя')
    }
  }
)

export const CheckUser = createAsyncThunk(
  'user/checkUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<User>(ApiEndPoints.User.CheckUser)
      console.log('data = ', data)
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить данные пользователя')
    }
  }
)

export const ChangeProfile = createAsyncThunk(
  'user/changeProfile',
  async (data: User, thunkAPI) => {
    try {
      const response = await authhost.put<User[]>(
        ApiEndPoints.User.UpdateProfile,
        data
      )
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось обновить данные пользователя')
    }
  }
)

export const ChangeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (data: FileProps, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const formData = new FormData()
      formData.append('avatar', data.info as Blob)
      const response = await authhost.put<User[]>(
        ApiEndPoints.User.UpdateProfileAvatar,
        formData,
        config
      )
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось обновить аватар пользователя')
    }
  }
)

export const ChangePassword = createAsyncThunk(
  'user/changePassword',
  async (data: ChangePasswordProps, thunkAPI) => {
    try {
      const response = await authhost.put<User[]>(
        ApiEndPoints.User.UpdatePassword,
        data
      )
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось обновить пароль')
    }
  }
)

export const ChangeTheme = createAsyncThunk(
  'user/changeTheme',
  async (data: ChangeThemeProps, thunkAPI) => {
    try {
      const response = await authhost.post<ChangeThemeProps>(
        ApiEndPoints.User.ChangeTheme,
        data
      )
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось обновить данные темы')
    }
  }
)
