import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Addresses,
  Regions,
  AnswerAddresses,
  AnswerRegions,
  AddressesState,
} from './interfaces'
import {
  getAddresses,
  newAddress,
  deleteAddress,
  changeAddress,
  getRegions,
  newRegion,
  deleteRegion,
  changeRegion,
} from 'api/address'

const initialState: AddressesState = {
  addresses: [],
  regions: [],
  isLoadingRoles: false,
}

export const addressesSlise = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addAddress(state, action) {
      state.addresses.push(action.payload)
    },
  },
  extraReducers: {
    [getAddresses.fulfilled.type]: (
      state,
      action: PayloadAction<Addresses[]>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.addresses = action.payload
    },
    [getAddresses.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getAddresses.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newAddress.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerAddresses>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.addresses = action.payload.data
    },
    [newAddress.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newAddress.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteAddress.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerAddresses>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.addresses = action.payload.data
    },
    [deleteAddress.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteAddress.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [changeAddress.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerAddresses>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.addresses = action.payload.data
    },
    [changeAddress.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [changeAddress.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [getRegions.fulfilled.type]: (state, action: PayloadAction<Regions[]>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.regions = action.payload
    },
    [getRegions.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getRegions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newRegion.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerRegions>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.regions = action.payload.data
    },
    [newRegion.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newRegion.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteRegion.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerRegions>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.regions = action.payload.data
    },
    [deleteRegion.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteRegion.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [changeRegion.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerRegions>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.regions = action.payload.data
    },
    [changeRegion.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [changeRegion.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
  },
})

export const addressesReducer = addressesSlise.reducer
export const { addAddress } = addressesSlise.actions
