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
  TypesOfWork,
  AddTypesOfWork,
  ChangeTypesOfWork,
  ChangeExecutor,
  ChangeResponsible,
  ChangeClosingCheck,
  ChangeClosing,
  ChangeStatus,
  TypesCompletedWork,
  AddTypesCompletedWork,
  ChangeTypesCompletedWork,
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

export const changeExecutor = createAsyncThunk(
  'incidents/changeExecutor',
  async (
    { id, id_incExecutor, incident, executor, userID }: ChangeExecutor,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeExecutor, {
        id,
        id_incExecutor,
        incident,
        executor,
        userID,
      })
      return {
        data,
        message: {
          text: id_incExecutor.length
            ? `${incident}: Назначен исполнитель "${executor}"`
            : `${incident}: Удален исполнитель!`,
          type: id_incExecutor.length ? 'success' : 'info',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось назначить исполнителя!\n${getError(e)}`
      )
    }
  }
)

export const changeResponsible = createAsyncThunk(
  'incidents/changeResponsible',
  async (
    { id, id_incResponsible, incident, responsible, userID }: ChangeResponsible,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeResponsible, {
        id,
        id_incResponsible,
        incident,
        responsible,
        userID,
      })
      return {
        data,
        message: {
          text: id_incResponsible.length
            ? `${incident}: Назначен ответственный "${responsible}"`
            : `${incident}: Удален ответственный!`,
          type: id_incResponsible.length ? 'success' : 'info',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось назначить ответственного!\n${getError(e)}`
      )
    }
  }
)

export const changeStatus = createAsyncThunk(
  'incidents/changeStatus',
  async (
    {
      id,
      id_incStatus,
      incident,
      status,
      userID,
      timeSLA,
      commentCloseCheck,
      spaceParts,
    }: ChangeStatus,
    thunkAPI
  ) => {
    try {
      console.log('changeStatus')
      console.log('id = ', id)
      console.log('id_incStatus = ', id_incStatus)
      console.log('incident = ', incident)
      const { data } = await authhost.post(ApiEndPoints.INC.changeStatus, {
        id,
        id_incStatus,
        incident,
        status,
        userID,
        timeSLA,
        commentCloseCheck,
        spaceParts,
      })
      console.log('data = ', data)
      return {
        data,
        message: {
          text: `${incident}: Назначен статус "${status}"`,
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось назначить ответственного!\n${getError(e)}`
      )
    }
  }
)

export const changeUserClosingCheck = createAsyncThunk(
  'incidents/changeUserClosingCheck',
  async ({ id, id_incClosingCheck }: ChangeClosingCheck, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.changeUserClosingCheck,
        {
          id,
          id_incClosingCheck,
        }
      )
      return {
        data,
        message: {
          text: `Назначен ответственный за выполнение!`,
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось назначить ответственного за выполнение!\n${getError(e)}`
      )
    }
  }
)

export const changeUserClosing = createAsyncThunk(
  'incidents/changeUserClosing',
  async ({ id, id_incClosing }: ChangeClosing, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.changeUserClosingCheck,
        {
          id,
          id_incClosing,
        }
      )
      return {
        data,
        message: {
          text: `Назначен ответственный за закрытие!`,
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось назначить ответственного за закрытие!\n${getError(e)}`
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

export const getTypesOfWork = createAsyncThunk(
  'incidents/getTypesOfWork',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<TypesOfWork>(
        ApiEndPoints.INC.getTypesOfWork
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по типам работ\n${getError(e)}`
      )
    }
  }
)

export const newTypeOfWork = createAsyncThunk(
  'incidents/newTypeOfWork',
  async (typeOfWork: AddTypesOfWork, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.newTypeOfWork,
        typeOfWork
      )
      return {
        data,
        message: {
          text: 'Новый тип работ добавлен',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый тип работ\n${getError(e)} `
      )
    }
  }
)

export const deleteTypesOfWork = createAsyncThunk(
  'incidents/deleteTypesOfWork',
  async (selectedTypesOfWork: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.deleteTypesOfWork, {
        selectedTypesOfWork,
      })
      return {
        data,
        message: {
          text: 'Типы работ удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить типы работ!\n${getError(e)}`
      )
    }
  }
)

export const changeTypesOfWork = createAsyncThunk(
  'incidents/changeTypesOfWork',
  async ({ typeOfWork, id }: ChangeTypesOfWork, thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.INC.changeTypesOfWork, {
        typeOfWork,
        id,
      })
      return {
        data,
        message: {
          text: 'Тип работ изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить тип работ!\n${getError(e)}`
      )
    }
  }
)

export const getTypesCompletedWork = createAsyncThunk(
  'incidents/getTypesCompletedWork',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<TypesCompletedWork>(
        ApiEndPoints.INC.getTypesCompletedWork
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по типам выполненных работ\n${getError(e)}`
      )
    }
  }
)

export const newTypeCompletedWork = createAsyncThunk(
  'incidents/newTypeCompletedWork',
  async (typeCompletedWork: AddTypesCompletedWork, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.newTypeCompletedWork,
        typeCompletedWork
      )
      return {
        data,
        message: {
          text: 'Новый тип выполненных работ добавлен',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый тип выполненных работ\n${getError(e)} `
      )
    }
  }
)

export const deleteTypesCompletedWork = createAsyncThunk(
  'incidents/deleteTypesCompletedWork',
  async (selectedTypeCompletedWork: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.deleteTypesCompletedWork,
        {
          selectedTypeCompletedWork,
        }
      )
      return {
        data,
        message: {
          text: 'Типы выполненных работ удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить типы выполненных работ!\n${getError(e)}`
      )
    }
  }
)

export const changeTypesCompletedWork = createAsyncThunk(
  'incidents/changeTypesCompletedWork',
  async ({ typeCompletedWork, id }: ChangeTypesCompletedWork, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.INC.changeTypesCompletedWork,
        {
          typeCompletedWork,
          id,
        }
      )
      return {
        data,
        message: {
          text: 'Тип выполненных работ изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить тип выполненных работ!\n${getError(e)}`
      )
    }
  }
)
