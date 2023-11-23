import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Contracts, AnswerContracts, ContractsState } from './interfaces'
import {
  changeContract,
  deleteContract,
  getContracts,
  newContract,
} from 'api/contracts'

const initialState: ContractsState = {
  contracts: [],
  activeContract: '',
  isLoadingRoles: false,
}

export const contractsSlise = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setActiveContract(state, action) {
      state.activeContract = action.payload
    },
  },
  extraReducers: {
    [getContracts.fulfilled.type]: (
      state,
      action: PayloadAction<Contracts[]>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.contracts = action.payload
    },
    [getContracts.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getContracts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newContract.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerContracts>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.contracts = action.payload.data
    },
    [newContract.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newContract.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteContract.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerContracts>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.contracts = action.payload.data
    },
    [deleteContract.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteContract.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [changeContract.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerContracts>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.contracts = action.payload.data
    },
    [changeContract.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [changeContract.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
  },
})

export const contractsReducer = contractsSlise.reducer
export const { setActiveContract } = contractsSlise.actions
