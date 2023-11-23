import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { getError } from 'utils/getError'
import { SLA, OLA, ChangeSLA, ChangeOLA } from 'store/slices/sla/interfaces'

export const getSLA = createAsyncThunk('sla/getSLA', async (_, thunkAPI) => {
  try {
    const { data } = await authhost.get<SLA>(ApiEndPoints.SLA.getSLA)
    return data
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return thunkAPI.rejectWithValue(
      `Не удалось получить данные по SLA\n${getError(e)}`
    )
  }
})

export const newSLA = createAsyncThunk(
  'sla/newSLA',
  async (sla: SLA, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.newSLA, sla)
      return {
        data,
        message: {
          text: 'Новый SLA добавлен',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый SLA\n${getError(e)} `
      )
    }
  }
)

export const deleteSLA = createAsyncThunk(
  'sla/deleteSLA',
  async (selectedSLA: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.deleteSLA, {
        selectedSLA,
      })
      return {
        data,
        message: {
          text: 'SLA удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(`Не удалось удалить SLA!\n${getError(e)}`)
    }
  }
)

export const changeSLA = createAsyncThunk(
  'sla/changeSLA',
  async ({ sla, id, time, timeStart, timeEnd }: ChangeSLA, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.changeSLA, {
        sla,
        id,
        time,
        timeStart,
        timeEnd,
      })
      return {
        data,
        message: {
          text: 'SLA изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить SLA!\n${getError(e)}`
      )
    }
  }
)

export const getOLA = createAsyncThunk('sla/getOLA', async (_, thunkAPI) => {
  try {
    const { data } = await authhost.get<OLA>(ApiEndPoints.SLA.getOLA)
    return data
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return thunkAPI.rejectWithValue(
      `Не удалось получить данные по OLA\n${getError(e)}`
    )
  }
})

export const newOLA = createAsyncThunk(
  'sla/newOLA',
  async (ola: OLA, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.newOLA, ola)
      return {
        data,
        message: {
          text: 'Новый OLA добавлен',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый OLA\n${getError(e)} `
      )
    }
  }
)

export const deleteOLA = createAsyncThunk(
  'sla/deleteOLA',
  async (selectedOLA: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.deleteOLA, {
        selectedOLA,
      })
      return {
        data,
        message: {
          text: 'OLA удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(`Не удалось удалить OLA!\n${getError(e)}`)
    }
  }
)

export const changeOLA = createAsyncThunk(
  'sla/changeOLA',
  async ({ ola, id, time, timeStart, timeEnd }: ChangeOLA, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.changeOLA, {
        ola,
        id,
        time,
        timeStart,
        timeEnd,
      })
      return {
        data,
        message: {
          text: 'OLA изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить OLA!\n${getError(e)}`
      )
    }
  }
)
