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
      return {
        data,
        message: { text: 'Новая роль добавлена', type: 'success' },
      }
    } catch (e: any) {
      console.log('у = ', e)
      return thunkAPI.rejectWithValue(
        `Не удалось создать новую роль!\n${e.response.data.error[1].original.detail} `
      )
    }
  }
)

export const deleteRoles = createAsyncThunk(
  'role/deleteRoles',
  async (value: string[], thunkAPI) => {
    try {
      const { data } = await authhost.delete(ApiEndPoints.Roles.deleteRoles, {
        data: value,
      })
      return {
        data,
        message: { text: 'Роли удалены', type: 'success' },
      }
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось удалить роли!')
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

export const deleteRoleGroup = createAsyncThunk(
  'role/deleteRoleGroup',
  async (roleGroup: RolesGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Roles.newRoleGroup,
        roleGroup
      )
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось удалить группу ролей!')
    }
  }
)
