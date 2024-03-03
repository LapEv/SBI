import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  Roles,
  RolesGroup,
  СhangeRolesGroup,
} from 'store/slices/roles/interfaces'
import { getError } from 'utils/getError'

export const getRoles = createAsyncThunk(
  'user/getRoles',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Roles>(ApiEndPoints.Roles.getRoles)
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по ролям\n${getError(e)}`
      )
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по группам ролей\n${getError(e)}`
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новую роль!\n${getError(e)} `
      )
    }
  }
)

export const deleteRoles = createAsyncThunk(
  'role/deleteRoles',
  async (selectedRoles: string[], thunkAPI) => {
    try {
      const { data } = await authhost.delete(ApiEndPoints.Roles.deleteRoles, {
        data: selectedRoles,
      })
      return {
        data,
        message: { text: 'Роли удалены', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить роли!\n${getError(e)}`
      )
    }
  }
)

export const newRolesGroup = createAsyncThunk(
  'role/newRolesGroup',
  async (rolesGroup: RolesGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Roles.newRolesGroup,
        rolesGroup
      )
      return {
        data,
        message: { text: 'Новая группа ролей добавлена', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новую группу ролей\n${getError(e)}`
      )
    }
  }
)

export const deleteRolesGroup = createAsyncThunk(
  'role/deleteRolesGroup',
  async (selectedRoleGroup: string[], thunkAPI) => {
    try {
      const { data } = await authhost.delete(
        ApiEndPoints.Roles.deleteRolesGroup,
        { data: selectedRoleGroup }
      )
      return {
        data,
        message: { text: 'Группа ролей удалена!', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить группу ролей!\n${getError(e)}`
      )
    }
  }
)

export const changeRolesGroup = createAsyncThunk(
  'role/changeRolesGroup',
  async ({ roles, activeRolesGroup }: СhangeRolesGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Roles.changeRolesGroup,
        {
          roles,
          activeRolesGroup,
        }
      )
      return {
        data,
        message: { text: 'Группа ролей изменена!', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить группу ролей!\n${getError(e)}`
      )
    }
  }
)
