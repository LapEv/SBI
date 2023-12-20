import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Contracts, AnswerContracts, ContractsState } from './interfaces'
import {
  changeContract,
  deleteContract,
  getContracts,
  getContractsByClientID,
  newContract,
} from 'api/contracts'

const initialState: ContractsState = {
  contracts: [],
  activeContract: '',
  isLoadingContracts: false,
}

export const contractsSlise = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setActiveContract(state, action) {
      state.activeContract = action.payload
    },
    resetContracts(state) {
      state.contracts = []
    },
  },
  extraReducers: {
    [getContracts.fulfilled.type]: (
      state,
      action: PayloadAction<Contracts[]>
    ) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = action.payload
    },
    [getContracts.pending.type]: state => {
      state.isLoadingContracts = true
    },
    [getContracts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingContracts = false
      state.error = action.payload
    },
    [getContractsByClientID.fulfilled.type]: (
      state,
      action: PayloadAction<Contracts[]>
    ) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = action.payload
    },
    [getContractsByClientID.pending.type]: state => {
      state.isLoadingContracts = true
    },
    [getContractsByClientID.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingContracts = false
      state.error = action.payload
    },
    [newContract.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerContracts>
    ) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = action.payload.data
    },
    [newContract.pending.type]: state => {
      state.isLoadingContracts = true
    },
    [newContract.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingContracts = false
      state.error = action.payload
    },
    [deleteContract.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerContracts>
    ) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = action.payload.data
    },
    [deleteContract.pending.type]: state => {
      state.isLoadingContracts = true
    },
    [deleteContract.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingContracts = false
      state.error = action.payload
    },
    [changeContract.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerContracts>
    ) => {
      state.isLoadingContracts = false
      state.error = ''
      state.contracts = action.payload.data
    },
    [changeContract.pending.type]: state => {
      state.isLoadingContracts = true
    },
    [changeContract.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingContracts = false
      state.error = action.payload
    },
  },
})

export const contractsReducer = contractsSlise.reducer
export const { setActiveContract, resetContracts } = contractsSlise.actions
