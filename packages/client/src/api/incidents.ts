import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { getError } from 'utils/getError'
import {
  AddINC,
  INC,
  ChangeINC,
  INCStatuses,
  AddINCStatuses,
  ChangeINCStatuses,
} from 'store/slices/incidents/interfaces'

export const getINC = createAsyncThunk(
  'incidents/getINC',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<INC>(ApiEndPoints.INC.getINC)
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по инцидентам\n${getError(e)}`
      )
    }
  }
)

export const newINC = createAsyncThunk(
  'incidents/newINC',
  async (inc: AddINC, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.newINC, inc)
      return {
        data,
        message: {
          text: 'Новый инцидент добавлен',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый инцидент\n${getError(e)} `
      )
    }
  }
)

export const changeINC = createAsyncThunk(
  'incidents/changeINC',
  async (
    {
      id,
      numberINC,
      incident,
      clientINC,
      timeRegistration,
      timeInWork,
      timeSLA,
      timeCloseCheck,
      timeClose,
      executor,
      responsible,
      description,
      comment,
      report,
      spaceParts,
      act,
    }: ChangeINC,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeINC, {
        id,
        numberINC,
        incident,
        clientINC,
        timeRegistration,
        timeInWork,
        timeSLA,
        timeCloseCheck,
        timeClose,
        executor,
        responsible,
        description,
        comment,
        report,
        spaceParts,
        act,
      })
      return {
        data,
        message: {
          text: 'Инцидент изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить инцидент!\n${getError(e)}`
      )
    }
  }
)

export const getIncidentStatuses = createAsyncThunk(
  'incidents/getIncidentStatuses',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<INCStatuses>(
        ApiEndPoints.INC.getIncidentStatuses
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по статусам инцидентов\n${getError(e)}`
      )
    }
  }
)

export const newIncidentStatuses = createAsyncThunk(
  'incidents/newIncidentStatuses',
  async (statusINC: AddINCStatuses, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.newIncidentStatuses,
        statusINC
      )
      return {
        data,
        message: {
          text: 'Новый статус инцидента добавлен',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый статус инцидента\n${getError(e)} `
      )
    }
  }
)

export const deleteIncidentStatuses = createAsyncThunk(
  'incidents/deleteIncidentStatuses',
  async (selectedINCStatuses: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.deleteIncidentStatuses,
        {
          selectedINCStatuses,
        }
      )
      return {
        data,
        message: {
          text: 'Статус инцидента удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить статус инцидента!\n${getError(e)}`
      )
    }
  }
)

export const changeIncidentStatuses = createAsyncThunk(
  'incidents/changeIncidentStatuses',
  async ({ statusINC, id }: ChangeINCStatuses, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.changeIncidentStatuses,
        {
          statusINC,
          id,
        }
      )
      return {
        data,
        message: {
          text: 'Статус инцидента изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить статус инцидента!\n${getError(e)}`
      )
    }
  }
)
