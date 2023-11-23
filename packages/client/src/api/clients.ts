import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { getError } from 'utils/getError'
import {
  Clients,
  ClientsGroup,
  ChangeClient,
  ChangeClientsGroup,
} from 'store/slices/clients/interfaces'

export const getClientGroups = createAsyncThunk(
  'client/getClientGroups',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<ClientsGroup>(
        ApiEndPoints.Clients.getClientGroups
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по группе клиентов\n${getError(e)}`
      )
    }
  }
)

export const newClientGroup = createAsyncThunk(
  'client/newClientGroup',
  async (clientGroup: ClientsGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Clients.newClientGroup,
        clientGroup
      )
      return {
        data,
        message: {
          text: 'Новая группа клиентов добавлена!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новую группу клиентов\n${getError(e)} `
      )
    }
  }
)

export const deleteClientGroup = createAsyncThunk(
  'client/deleteClientGroup',
  async (selectedClientsGroup: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Clients.deleteClientGroup,
        {
          selectedClientsGroup,
        }
      )
      return {
        data,
        message: {
          text: 'Группа клиентов удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить группу клиентов!\n${getError(e)}`
      )
    }
  }
)

export const changeClientGroup = createAsyncThunk(
  'client/changeClientGroup',
  async ({ groupName, clients, id }: ChangeClientsGroup, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Clients.changeClientGroup,
        {
          groupName,
          clients,
          id,
        }
      )
      return {
        data,
        message: {
          text: 'Группа клиентов изменена!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить группу клиентов!\n${getError(e)}`
      )
    }
  }
)

export const getClients = createAsyncThunk(
  'client/getClients',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Clients>(
        ApiEndPoints.Clients.getClients
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по клиентам\n${getError(e)}`
      )
    }
  }
)

export const newClient = createAsyncThunk(
  'client/newClient',
  async (client: Clients, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Clients.newClient,
        client
      )
      return {
        data,
        message: {
          text: 'Новый клиент добавлен',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать нового клиента\n${getError(e)} `
      )
    }
  }
)

export const deleteClient = createAsyncThunk(
  'client/deleteClient',
  async (selectedClients: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Clients.deleteClient, {
        selectedClients,
      })
      return {
        data,
        message: {
          text: 'Клиенты удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить клиентов!\n${getError(e)}`
      )
    }
  }
)

export const changeClient = createAsyncThunk(
  'client/changeClient',
  async (
    { client, legalName, contracts, contacts, comments, id }: ChangeClient,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(ApiEndPoints.Clients.changeClient, {
        client,
        legalName,
        contracts,
        contacts,
        comments,
        id,
      })
      return {
        data,
        message: {
          text: 'Клиент изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить клиента!\n${getError(e)}`
      )
    }
  }
)
