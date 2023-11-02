import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { getError } from 'utils/getError'
import {
  ClassifierEquipment,
  ClassifierModels,
  TypicalMalfunctions,
  ChangeClassifierEquipment,
  ChangeClassifierModel,
  ChangeTypicalMalfunction,
} from 'store/slices/classifier/interfaces'

export const getClassifierEquipments = createAsyncThunk(
  'classifier/getClassifierEquipments',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ClassifierEquipment>(
        ApiEndPoints.Classifier.getClassifierEquipments
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по класиффикатору оборудования\n${getError(
          e
        )}`
      )
    }
  }
)

export const newClassifierEquipment = createAsyncThunk(
  'classifier/newClassifierEquipment',
  async (role: ClassifierEquipment, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.newClassifierEquipment,
        role
      )
      return {
        data,
        message: {
          text: 'Новый классификатор оборудования добавлен',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый классификатор оборудования!\n${getError(e)} `
      )
    }
  }
)

export const deleteclassifierEquipment = createAsyncThunk(
  'classifier/deleteclassifierEquipment',
  async (selectedclassifierEquipments: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.deleteclassifierEquipment,
        { selectedclassifierEquipments }
      )
      return {
        data,
        message: {
          text: 'Классификатор оборудования удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить классификатор оборудования!\n${getError(e)}`
      )
    }
  }
)

export const changeClassifierEquipment = createAsyncThunk(
  'classifier/changeClassifierEquipment',
  async (
    { newClassifierEquipment, id }: ChangeClassifierEquipment,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeClassifierEquipment,
        {
          newClassifierEquipment,
          id,
        }
      )
      return {
        data,
        message: {
          text: 'Классификатор оборудования изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить классификатор оборудования!\n${getError(e)}`
      )
    }
  }
)

export const getClassifierModels = createAsyncThunk(
  'classifier/getClassifierModels',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ClassifierEquipment>(
        ApiEndPoints.Classifier.getClassifierModels
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по списку моделей\n${getError(e)}`
      )
    }
  }
)

export const newClassifierModel = createAsyncThunk(
  'classifier/newClassifierModel',
  async (model: ClassifierModels, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.newClassifierEquipment,
        model
      )
      return {
        data,
        message: {
          text: 'Новый модель добавлена',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новую модель!\n${getError(e)} `
      )
    }
  }
)

export const deleteClassifierModel = createAsyncThunk(
  'classifier/deleteClassifierModel',
  async (selectedclassifierModels: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.deleteClassifierModel,
        { selectedclassifierModels }
      )
      return {
        data,
        message: {
          text: 'Модель удалена',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить модель!\n${getError(e)}`
      )
    }
  }
)

export const changeClassifierModel = createAsyncThunk(
  'classifier/changeClassifierModel',
  async ({ newClassifierModel, id }: ChangeClassifierModel, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeClassifierModel,
        {
          newClassifierModel,
          id,
        }
      )
      return {
        data,
        message: {
          text: 'Модель изменена!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить модель!\n${getError(e)}`
      )
    }
  }
)

export const getTypicalMalfunctions = createAsyncThunk(
  'classifier/getTypicalMalfunctions',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ClassifierEquipment>(
        ApiEndPoints.Classifier.getTypicalMalfunctions
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по списку типовых неисправностей\n${getError(
          e
        )}`
      )
    }
  }
)

export const newTypicalMalfunction = createAsyncThunk(
  'classifier/newTypicalMalfunction',
  async (role: TypicalMalfunctions, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.newTypicalMalfunction,
        role
      )
      return {
        data,
        message: {
          text: 'Новая типовая неисправность добавлена',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новую типовую неисправность!\n${getError(e)} `
      )
    }
  }
)

export const deleteTypicalMalfunction = createAsyncThunk(
  'classifier/deleteTypicalMalfunction',
  async (selectedtypicalMalfunctions: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.deleteTypicalMalfunction,
        { selectedtypicalMalfunctions }
      )
      return {
        data,
        message: {
          text: 'Типовая  неисправность удалена',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить тповая  неисправность!\n${getError(e)}`
      )
    }
  }
)

export const changeTypicalMalfunction = createAsyncThunk(
  'classifier/changeTypicalMalfunction',
  async ({ newTypicalMalfunction, id }: ChangeTypicalMalfunction, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeTypicalMalfunction,
        {
          newTypicalMalfunction,
          id,
        }
      )
      return {
        data,
        message: {
          text: 'Типовая неисправность изменена!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить типовую неисправность!\n${getError(e)}`
      )
    }
  }
)
