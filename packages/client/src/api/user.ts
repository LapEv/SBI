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
  'user/signin',
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
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
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    /* eslint-enable @typescript-eslint/no-explicit-any */
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные пользователя!\n${getError(e)}`
      )
    }
  }
)

export const GetActiveUsers = createAsyncThunk(
  'user/getActiveUsers',
  async (dataFind: User, thunkAPI) => {
    try {
      const { data } = await authhost.post<User[]>(
        ApiEndPoints.User.GetUsers,
        dataFind
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные пользователей!\n${getError(e)}`
      )
    }
  }
)

export const GetDispatchers = createAsyncThunk(
  'user/getDispatchers',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.post<User>(
        ApiEndPoints.User.GetDispatchers
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные пользователей по департаменту!\n${getError(
          e
        )}`
      )
    }
  }
)

export const GetFieldEngineers = createAsyncThunk(
  'user/getFieldEngineers',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.post<User>(
        ApiEndPoints.User.GetFieldEngineers
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные пользователей по департаменту!\n${getError(
          e
        )}`
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные пользователя: \n${getError(e)}`
      )
    }
  }
)

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось обновить аватар пользователя! \n${getError(e)}`
      )
    }
  }
)

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (value: ChangePasswordProps, thunkAPI) => {
    console.log('value = ', value)
    try {
      const { data } = await authhost.post<User[]>(
        ApiEndPoints.User.ChangePassword,
        value
      )
      return {
        data,
        message: {
          text: 'Пароль успешно изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить пароль! \n${getError(e)}`
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить статусы пользователей!\n${getError(e)}`
      )
    }
  }
)

interface delData {
  id: string
  reasonOfDelete: string
}

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ id, reasonOfDelete }: delData, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.User.DeleteUser, {
        id,
        reasonOfDelete,
      })
      return {
        data,
        message: { text: 'Пользователь перемещен в архив', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось переместить пользователя в архив!\n${getError(e)}`
      )
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: User, thunkAPI) => {
    try {
      const id = userData.id
      const { data } = await authhost.post(ApiEndPoints.User.UpdateUser, {
        id,
        userData,
      })
      return {
        data,
        message: { text: 'Данные пользователя обновлены', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось обновить данные пользователя!\n${getError(e)}`
      )
    }
  }
)
