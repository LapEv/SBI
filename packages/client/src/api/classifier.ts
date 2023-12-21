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
  ChangeModelsInTypicalMalfunction,
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
  async (equipment: ClassifierEquipment, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.newClassifierEquipment,
        equipment
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

export const deleteClassifierEquipment = createAsyncThunk(
  'classifier/deleteClassifierEquipment',
  async (selectedClassifierEquipments: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.deleteClassifierEquipment,
        { selectedClassifierEquipments }
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
  async ({ equipment, id }: ChangeClassifierEquipment, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeClassifierEquipment,
        { equipment, id }
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

export const getClassifierModelsById = createAsyncThunk(
  'classifier/getClassifierModelsById',
  async (id_equipment: string, thunkAPI) => {
    try {
      const { data } = await authhost.post<ClassifierModels>(
        ApiEndPoints.Classifier.getClassifierModelsById,
        { id_equipment }
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
        ApiEndPoints.Classifier.newClassifierModel,
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
  async (selectedClassifierModels: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.deleteClassifierModel,
        { selectedClassifierModels }
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
  async (
    { model, id, selectedTypicalMalfunction }: ChangeClassifierModel,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeClassifierModel,
        { model, id, selectedTypicalMalfunction }
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

export const getTypicalMalfunctionsById = createAsyncThunk(
  'classifier/getTypicalMalfunctionsById',
  async (id_equipment: string, thunkAPI) => {
    try {
      const { data } = await authhost.post<TypicalMalfunctions>(
        ApiEndPoints.Classifier.getTypicalMalfunctionsById,
        { id_equipment }
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
  async (newTypicalMalfunction: TypicalMalfunctions, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.newTypicalMalfunction,
        newTypicalMalfunction
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
  async ({ typicalMalfunction, id }: ChangeTypicalMalfunction, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeTypicalMalfunction,
        { typicalMalfunction, id }
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

export const changeModelsInTypicalMalfunction = createAsyncThunk(
  'classifier/changeModelsInTypicalMalfunction',
  async (
    { id_equipment, newTypicalMalfunction }: ChangeModelsInTypicalMalfunction,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Classifier.changeModelsInTypicalMalfunction,
        { id_equipment, newTypicalMalfunction }
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
        `Не удалось изменить типовую неисправность!\n${getError(e)}`
      )
    }
  }
)
