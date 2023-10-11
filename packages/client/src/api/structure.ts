import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import {
  Department,
  Division,
  NewDepartment,
  NewDivision,
} from 'store/slices/structure/interfaces'
import { getError } from 'utils/getError'

export const getDivisions = createAsyncThunk(
  'structure/getDivisions',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Division>(
        ApiEndPoints.Structure.getDivisions
      )
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'Не удалось получить данные по дивизионам'
      )
    }
  }
)

export const getDepartments = createAsyncThunk(
  'structure/getRolesGroup',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Department>(
        ApiEndPoints.Structure.getDepartments
      )
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'Не удалось получить данные по департаментам'
      )
    }
  }
)

export const newDivision = createAsyncThunk(
  'structure/newDivision',
  async ({ division, divisionName }: NewDivision, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Structure.newDivision, {
        division,
        divisionName,
      })
      return {
        data,
        message: { text: 'Новый дивизион добавлен!', type: 'success' },
      }
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать новый дивизион')
    }
  }
)

export const newDepartment = createAsyncThunk(
  'structure/newDepartment',
  async ({ department, division }: NewDepartment, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.newDepartment,
        { department, division }
      )
      return {
        data,
        message: { text: 'Новый отдел добавлен!', type: 'success' },
      }
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать новый департамент')
    }
  }
)

export const deleteDivision = createAsyncThunk(
  'role/deleteDivision',
  async (selectedDivisions: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.updateDivision,
        { selectedDivisions }
      )
      return {
        data,
        message: { text: 'Дивизионы перемещены в архив', type: 'success' },
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось удалить роли!\n${getError(e)}`
      )
    }
  }
)
