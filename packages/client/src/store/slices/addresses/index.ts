import { AddAddress } from './../../../pages/Clients/Modals/AddAddress'
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
  isLoadingAddress: false,
}

export const addressesSlise = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addAddress(state, action) {
      state.addresses.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(getAddresses.fulfilled, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = ''
      state.addresses = payload as Addresses[]
    })
    builder.addCase(getAddresses.pending, state => {
      state.isLoadingAddress = true
    })
    builder.addCase(getAddresses.rejected, (state, { payload }) => {
      state.isLoadingAddress = false
      state.error = payload as string
    })

    // [getAddresses.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<Addresses[]>
    // ) => {
    //   state.isLoadingAddress = false
    //   state.error = ''
    //   state.addresses = action.payload
    // },
    // [getAddresses.pending.type]: state => {
    //   state.isLoadingAddress = true
    // },
    // [getAddresses.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoadingAddress = false
    //   state.error = action.payload
    // },
    // [newAddress.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<AnswerAddresses>
    // ) => {
    //   state.isLoadingAddress = false
    //   state.error = ''
    //   state.addresses = action.payload.data
    // },
    // [newAddress.pending.type]: state => {
    //   state.isLoadingAddress = true
    // },
    // [newAddress.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoadingAddress = false
    //   state.error = action.payload
    // },
    // [deleteAddress.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<AnswerAddresses>
    // ) => {
    //   state.isLoadingAddress = false
    //   state.error = ''
    //   state.addresses = action.payload.data
    // },
    // [deleteAddress.pending.type]: state => {
    //   state.isLoadingAddress = true
    // },
    // [deleteAddress.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoadingAddress = false
    //   state.error = action.payload
    // },
    // [changeAddress.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<AnswerAddresses>
    // ) => {
    //   state.isLoadingAddress = false
    //   state.error = ''
    //   state.addresses = action.payload.data
    // },
    // [changeAddress.pending.type]: state => {
    //   state.isLoadingAddress = true
    // },
    // [changeAddress.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoadingAddress = false
    //   state.error = action.payload
    // },
    // [getRegions.fulfilled.type]: (state, action: PayloadAction<Regions[]>) => {
    //   state.isLoadingAddress = false
    //   state.error = ''
    //   state.regions = action.payload
    // },
    // [getRegions.pending.type]: state => {
    //   state.isLoadingAddress = true
    // },
    // [getRegions.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoadingAddress = false
    //   state.error = action.payload
    // },
    // [newRegion.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<AnswerRegions>
    // ) => {
    //   state.isLoadingAddress = false
    //   state.error = ''
    //   state.regions = action.payload.data
    // },
    // [newRegion.pending.type]: state => {
    //   state.isLoadingAddress = true
    // },
    // [newRegion.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoadingAddress = false
    //   state.error = action.payload
    // },
    // [deleteRegion.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<AnswerRegions>
    // ) => {
    //   state.isLoadingAddress = false
    //   state.error = ''
    //   state.regions = action.payload.data
    // },
    // [deleteRegion.pending.type]: state => {
    //   state.isLoadingAddress = true
    // },
    // [deleteRegion.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoadingAddress = false
    //   state.error = action.payload
    // },
    // [changeRegion.fulfilled.type]: (
    //   state,
    //   action: PayloadAction<AnswerRegions>
    // ) => {
    //   state.isLoadingAddress = false
    //   state.error = ''
    //   state.regions = action.payload.data
    // },
    // [changeRegion.pending.type]: state => {
    //   state.isLoadingAddress = true
    // },
    // [changeRegion.rejected.type]: (state, action: PayloadAction<string>) => {
    //   state.isLoadingAddress = false
    //   state.error = action.payload
    // },
  },
})

export const addressesReducer = addressesSlise.reducer
export const { addAddress } = addressesSlise.actions
