import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { getError } from 'utils/getError'
import {
  SLA,
  OLA,
  ChangeSLA,
  ChangeOLA,
  TypesSLA,
  ChangeTypesSLA,
  AddSLA,
  AddOLA,
  AddTypesSLA,
} from 'store/slices/sla/interfaces'

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
  async (sla: AddSLA, thunkAPI) => {
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
  async (
    { sla, id, time, timeStart, timeEnd, id_typeSLA }: ChangeSLA,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.changeSLA, {
        sla,
        id,
        time,
        timeStart,
        timeEnd,
        id_typeSLA,
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
  async (ola: AddOLA, thunkAPI) => {
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
  async (
    { ola, id, time, timeStart, timeEnd, id_typeSLA }: ChangeOLA,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.changeOLA, {
        ola,
        id,
        time,
        timeStart,
        timeEnd,
        id_typeSLA,
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

export const getTypesSLA = createAsyncThunk(
  'sla/getTypesSLA',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<TypesSLA>(
        ApiEndPoints.SLA.getTypesSLA
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по типам SLA\n${getError(e)}`
      )
    }
  }
)

export const newTypesSLA = createAsyncThunk(
  'sla/newTypesSLA',
  async (typeSLA: AddTypesSLA, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.SLA.newTypesSLA,
        typeSLA
      )
      return {
        data,
        message: {
          text: 'Новый тип SLA добавлен',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый тип SLA\n${getError(e)} `
      )
    }
  }
)

export const deleteTypesSLA = createAsyncThunk(
  'sla/deleteTypesSLA',
  async (selectedtypesSLA: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.deleteTypesSLA, {
        selectedtypesSLA,
      })
      return {
        data,
        message: {
          text: 'Типы SLA удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить типы SLA!\n${getError(e)}`
      )
    }
  }
)

export const changeTypesSLA = createAsyncThunk(
  'sla/changeTypesSLA',
  async ({ typeSLA, id }: ChangeTypesSLA, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.SLA.changeTypesSLA, {
        typeSLA,
        id,
      })
      return {
        data,
        message: {
          text: 'Тип SLA изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить тип SLA!\n${getError(e)}`
      )
    }
  }
)
