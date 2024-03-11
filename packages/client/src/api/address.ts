import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { getError } from 'utils/getError'
import {
  Addresses,
  Regions,
  СhangeAddress,
  СhangeRegion,
} from 'store/slices/addresses/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getAddresses = createAsyncThunk(
  'addresses/getAddresses',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Addresses>(
        ApiEndPoints.Addresses.getAddresses
      )
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по адресам: \n${
            error.response?.data.message ?? error.response?.data
          }`
        )
      } else {
        console.error(error)
      }
    }
  }
)

export const newAddress = createAsyncThunk(
  'addresses/newAddress',
  async (address: Addresses, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Addresses.newAddress,
        address
      )
      return {
        data,
        message: { text: 'Новый адрес добавлен', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый адрес!\n${getError(e)} `
      )
    }
  }
)

export const deleteAddress = createAsyncThunk(
  'addresses/deleteAddress',
  async (selectedAddresses: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Addresses.deleteAddress,
        { selectedAddresses }
      )
      return {
        data,
        message: { text: 'Адреса удалены', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить адреса!\n${getError(e)}`
      )
    }
  }
)

export const changeAddress = createAsyncThunk(
  'addresses/changeAddress',
  async ({ newAddress, id }: СhangeAddress, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Addresses.changeAddress,
        {
          newAddress,
          id,
        }
      )
      return {
        data,
        message: { text: 'Адрес изменен!', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить адрес!\n${getError(e)}`
      )
    }
  }
)

export const getRegions = createAsyncThunk(
  'addresses/getRegions',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Regions>(
        ApiEndPoints.Addresses.getRegions
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по регионам\n${getError(e)}`
      )
    }
  }
)

export const newRegion = createAsyncThunk(
  'addresses/newRegion',
  async (region: Regions, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Addresses.newRegion,
        region
      )
      return {
        data,
        message: { text: 'Новый регион добавлен', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый регион!\n${getError(e)} `
      )
    }
  }
)

export const deleteRegion = createAsyncThunk(
  'addresses/deleteRegion',
  async (selectedRegions: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Addresses.deleteRegion,
        { selectedRegions }
      )
      return {
        data,
        message: { text: 'Регионы удалены', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить регионы!\n${getError(e)}`
      )
    }
  }
)

export const changeRegion = createAsyncThunk(
  'addresses/changeRegion',
  async ({ newRegion, id }: СhangeRegion, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Addresses.changeRegion,
        {
          newRegion,
          id,
        }
      )
      return {
        data,
        message: { text: 'Регион изменен!', type: 'success' },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить регион!\n${getError(e)}`
      )
    }
  }
)
