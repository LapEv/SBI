import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Clients,
  ClientsGroup,
  AnswerClients,
  AnswerClientsGroup,
  ClientsState,
} from './interfaces'
import {
  getClientGroups,
  newClientGroup,
  deleteClientGroup,
  changeClientGroup,
  getClients,
  newClient,
  deleteClient,
  changeClient,
} from 'api/clients'

const initialState: ClientsState = {
  clients: [],
  clientsGroup: [],
  activeClient: '',
  isLoadingRoles: false,
}

export const clientsSlise = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setActiveClient(state, action) {
      state.activeClient = action.payload
    },
  },
  extraReducers: {
    [getClientGroups.fulfilled.type]: (
      state,
      action: PayloadAction<ClientsGroup[]>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.clientsGroup = action.payload
    },
    [getClientGroups.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getClientGroups.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newClientGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClientsGroup>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.clientsGroup = action.payload.data
    },
    [newClientGroup.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newClientGroup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteClientGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClientsGroup>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.clientsGroup = action.payload.data
    },
    [deleteClientGroup.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteClientGroup.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [changeClientGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClientsGroup>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.clientsGroup = action.payload.data
    },
    [changeClientGroup.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [changeClientGroup.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [getClients.fulfilled.type]: (state, action: PayloadAction<Clients[]>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.clients = action.payload
    },
    [getClients.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getClients.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newClient.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClients>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.clients = action.payload.data
    },
    [newClient.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newClient.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteClient.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClients>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.clients = action.payload.data
    },
    [deleteClient.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteClient.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [changeClient.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClients>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.clients = action.payload.data
    },
    [changeClient.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [changeClient.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
  },
})

export const clientsReducer = clientsSlise.reducer
export const { setActiveClient } = clientsSlise.actions
