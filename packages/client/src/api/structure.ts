import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { Department, Division } from 'store/slices/structure/interfaces'

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
  async (division: Division, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.newDivision,
        division
      )
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать новый дивизион')
    }
  }
)

export const newDepartment = createAsyncThunk(
  'structure/newDepartment',
  async (department: Department, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Structure.newDepartment,
        department
      )
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось создать новый департамент')
    }
  }
)
