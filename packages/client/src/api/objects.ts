import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { getError } from 'utils/getError'
import { ChangeObject, Objects } from 'store/slices/objects/interfaces'

export const getObjects = createAsyncThunk(
  'objects/getObjects',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Objects>(
        ApiEndPoints.Objects.getObjects
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по объектам\n${getError(e)}`
      )
    }
  }
)

export const newObject = createAsyncThunk(
  'objects/newObject',
  async (object: Objects, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Objects.newObject,
        object
      )
      return {
        data,
        message: {
          text: 'Новый объект добавлен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый объект\n${getError(e)} `
      )
    }
  }
)

export const deleteObjects = createAsyncThunk(
  'objects/deleteObjects',
  async (selectedObjects: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Objects.deleteObjects, {
        selectedObjects,
      })
      return {
        data,
        message: {
          text: 'Объекты удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить объект!\n${getError(e)}`
      )
    }
  }
)

export const changeObject = createAsyncThunk(
  'objects/changeObject',
  async (
    {
      object,
      id_address,
      id_region,
      id_client,
      internalClientID,
      internalClientName,
      id,
    }: ChangeObject,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Objects.changeObject, {
        object,
        id_address,
        id_region,
        id_client,
        internalClientID,
        internalClientName,
        id,
      })
      return {
        data,
        message: {
          text: 'Объект изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить объект!\n${getError(e)}`
      )
    }
  }
)
