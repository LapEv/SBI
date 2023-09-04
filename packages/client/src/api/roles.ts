import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, host, ApiEndPoints } from './config'
import { Roles } from 'store/slices/roles/interfaces'

export const getRoles = createAsyncThunk(
  'user/getRoles',
  async (_, thunkAPI) => {
    try {
      console.log('getRoles')
      const { data } = await authhost.get<Roles>(ApiEndPoints.Roles.getRoles)
      console.log('getRoles data = ', data)
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить данные по ролям')
    }
  }
)

export const getRolesGroup = createAsyncThunk(
  'user/getRolesGroup',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Roles>(
        ApiEndPoints.Roles.getRolesGroup
      )
      console.log('getRolesGroup data = ', data)
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'Не удалось получить данные по группам ролей'
      )
    }
  }
)
