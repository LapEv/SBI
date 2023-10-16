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
  UserStatus,
} from 'storeAuth/interfaces'
import { authhost, host, ApiEndPoints } from './config'
import { getError } from 'utils/getError'

export const signin = createAsyncThunk(
  'user/login',
  async (loginData: Login, thunkAPI) => {
    try {
      const { data } = await host.post(ApiEndPoints.User.Login, loginData)
      localStorage.setItem('token', data.token)
      const { id } = jwt_decode(data.token) as JwtPayload
      return {
        ...data,
        id,
        message: {
          text: 'Успешный вход в систему!',
          type: 'success',
        },
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось авторизоваться\n${getError(e)}`
      )
    }
  }
)

export const signup = createAsyncThunk(
  'user/setUser',
  async (signUpData: SignUp, thunkAPI) => {
    try {
      const { data } = await host.post(ApiEndPoints.User.SetUser, signUpData)
      return {
        data,
        message: {
          text: 'Пользователь зарегистрирован успешно!',
          type: 'success',
        },
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось зарегистрироваться!\n${getError(e)}`
      )
    }
  }
)

export const signout = createAsyncThunk('user/signout', async (_, thunkAPI) => {
  try {
    localStorage.removeItem('token')
    return {
      message: {
        text: 'Пользователь вышел из системы!',
        type: 'success',
      },
    }
  } catch (e: any) {
    return thunkAPI.rejectWithValue(`Не удалось выйти!\n${getError(e)}`)
  }
})

export const GetUser = createAsyncThunk(
  'user/getUserInfo',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await authhost.post<User>(ApiEndPoints.User.UserInfo, {
        id,
      })
      return data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные пользователя!\n${getError(e)}`
      )
    }
  }
)

export const GetUsers = createAsyncThunk(
  'user/getUsers',
  async (dataFind: User, thunkAPI) => {
    try {
      const { data } = await authhost.post<User[]>(
        ApiEndPoints.User.GetUsers,
        dataFind
      )
      return data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные пользователей!\n${getError(e)}`
      )
    }
  }
)

export const CheckUser = createAsyncThunk(
  'user/checkUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<User>(ApiEndPoints.User.CheckUser)
      const { id } = jwt_decode(data.token as string) as JwtPayload
      return { ...data, id }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные пользователя: \n${getError(e)}`
      )
    }
  }
)

export const ChangeProfile = createAsyncThunk(
  'user/changeProfile',
  async (newProfile: User, thunkAPI) => {
    try {
      const { data } = await authhost.put<User[]>(
        ApiEndPoints.User.UpdateProfile,
        newProfile
      )
      return {
        data,
        message: {
          text: 'Данные пользователя успешно изменены!',
          type: 'success',
        },
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось обновить данные пользователя!\n${getError(e)}`
      )
    }
  }
)

export const ChangeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (newAvatar: FileProps, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const formData = new FormData()
      formData.append('avatar', newAvatar.info as Blob)
      const { data } = await authhost.put<User[]>(
        ApiEndPoints.User.UpdateProfileAvatar,
        formData,
        config
      )
      return {
        data,
        message: {
          text: 'Новая аватарка успешно сохранена!',
          type: 'success',
        },
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось обновить аватар пользователя! \n${getError(e)}`
      )
    }
  }
)

export const ChangePassword = createAsyncThunk(
  'user/changePassword',
  async (value: ChangePasswordProps, thunkAPI) => {
    try {
      const { data } = await authhost.put<User[]>(
        ApiEndPoints.User.UpdatePassword,
        value
      )
      return {
        data,
        message: {
          text: 'Пароль успешно изменен!',
          type: 'success',
        },
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось обновить пароль! \n${getError(e)}`
      )
    }
  }
)

export const ChangeTheme = createAsyncThunk(
  'user/changeTheme',
  async (value: ChangeThemeProps, thunkAPI) => {
    try {
      const { data } = await authhost.post<ChangeThemeProps>(
        ApiEndPoints.User.ChangeTheme,
        value
      )
      return data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось обновить данные темы! \n${getError(e)}`
      )
    }
  }
)

export const getUserStatus = createAsyncThunk(
  'user/getUserStatus',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<UserStatus[]>(
        ApiEndPoints.User.GetUserStatus
      )
      return data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось получить статусы пользователей!\n${getError(e)}`
      )
    }
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: string, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.updateDivision,
        id
      )
      return {
        data,
        message: { text: 'Пользователь перемещен в архив', type: 'success' },
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось переместить пользователя в архив!\n${getError(e)}`
      )
    }
  }
)
