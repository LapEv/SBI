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
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по дивизионам!\n${getError(e)}`
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
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по департаментам!\n${getError(e)}`
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
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось создать дивизион!\n${getError(e)}`
      )
    }
  }
)

export const newDepartment = createAsyncThunk(
  'structure/newDepartment',
  async (
    { department, departmentName, division, id_division }: NewDepartment,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.newDepartment,
        { department, departmentName, division, id_division }
      )
      return {
        data,
        message: { text: 'Новый отдел добавлен!', type: 'success' },
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый отдел!\n${getError(e)}`
      )
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
        `Не удалось удалить дивизион!\n${getError(e)}`
      )
    }
  }
)

export const deleteDepartment = createAsyncThunk(
  'role/deleteDepartment',
  async (selectedDepartments: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.updateDepartment,
        { selectedDepartments }
      )
      return {
        data,
        message: { text: 'Отделы перемещены в архив', type: 'success' },
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось удалить отдел!\n${getError(e)}`
      )
    }
  }
)
