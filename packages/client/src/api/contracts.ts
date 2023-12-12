import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints } from './config'
import { getError } from 'utils/getError'
import {
  ChangeContract,
  Contracts,
  NewContractName,
} from 'store/slices/contracts/interfaces'

export const getContracts = createAsyncThunk(
  'contracts/getContracts',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Contracts>(
        ApiEndPoints.Contracts.getContracts
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по контрактам\n${getError(e)}`
      )
    }
  }
)

export const getContractsByClientID = createAsyncThunk(
  'contracts/getContractsByClientID',
  async (id_client: string, thunkAPI) => {
    try {
      const { data } = await authhost.post<Contracts>(
        ApiEndPoints.Contracts.getContractsByClientID,
        { id_client }
      )
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по контрактам ID клиента\n${getError(e)}`
      )
    }
  }
)

export const newContract = createAsyncThunk(
  'contracts/newContract',
  async (contract: Contracts, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contracts.newContract,
        contract
      )
      return {
        data,
        message: {
          text: 'Новый контракт добавлен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый контракт\n${getError(e)} `
      )
    }
  }
)

export const newContractName = createAsyncThunk(
  'contracts/newContractName',
  async ({ contract, id }: NewContractName, thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contracts.newContractName,
        {
          contract,
          id,
        }
      )
      return {
        data,
        message: {
          text: 'Наименование контракта изменено!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось создать новый контракт\n${getError(e)} `
      )
    }
  }
)

export const deleteContract = createAsyncThunk(
  'contracts/deleteContract',
  async (selectedContracts: string[], thunkAPI) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contracts.deleteContract,
        {
          selectedContracts,
        }
      )
      return {
        data,
        message: {
          text: 'Контракты удалены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось удалить контракты!\n${getError(e)}`
      )
    }
  }
)

export const changeContract = createAsyncThunk(
  'contracts/changeContract',
  async (
    { number, date, sla, equipment, objects, id }: ChangeContract,
    thunkAPI
  ) => {
    try {
      const { data } = await authhost.post(
        ApiEndPoints.Contracts.changeContract,
        {
          number,
          date,
          sla,
          equipment,
          objects,
          id,
        }
      )
      console.log('data = ', data)
      return {
        data,
        message: {
          text: 'Контракт изменен!',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось изменить контракт!\n${getError(e)}`
      )
    }
  }
)
