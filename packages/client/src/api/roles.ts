import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { Roles, RolesGroup } from 'store/slices/roles/interfaces'

export const getRoles = createAsyncThunk(
  'user/getRoles',
  async (_, thunkAPI) => {
    try {
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
      const { data } = await authhost.get<RolesGroup>(
        ApiEndPoints.Roles.getRolesGroup
      )
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'Не удалось получить данные по группам ролей'
      )
    }
  }
)

export const newRole = createAsyncThunk(
  'role/newRole',
  async (role: Roles, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Roles.newRole, role)
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать новую роль')
    }
  }
)

export const newRoleGroup = createAsyncThunk(
  'role/newRoleGroup',
  async (roleGroup: RolesGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Roles.newRoleGroup,
        roleGroup
      )
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать новую группу ролей')
    }
  }
)
