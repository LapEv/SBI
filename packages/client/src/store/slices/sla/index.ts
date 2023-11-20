import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLA, OLA, AnswerSLA, AnswerOLA, SLAState } from './interfaces'
import {
  getSLA,
  getOLA,
  newSLA,
  newOLA,
  deleteSLA,
  deleteOLA,
  changeSLA,
  changeOLA,
} from 'api/sla'

const initialState: SLAState = {
  sla: [],
  ola: [],
  activeSLA: '',
  isLoadingRoles: false,
}

export const slaSlise = createSlice({
  name: 'sla',
  initialState,
  reducers: {
    setActiveSLA(state, action) {
      state.activeSLA = action.payload
    },
    // setActiveModel(state, action) {
    //   state.activeModel = action.payload
    // },
  },
  extraReducers: {
    [getSLA.fulfilled.type]: (state, action: PayloadAction<SLA[]>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.sla = action.payload
    },
    [getSLA.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newSLA.fulfilled.type]: (state, action: PayloadAction<AnswerSLA>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.sla = action.payload.data
    },
    [newSLA.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteSLA.fulfilled.type]: (state, action: PayloadAction<AnswerSLA>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.sla = action.payload.data
    },
    [deleteSLA.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [changeSLA.fulfilled.type]: (state, action: PayloadAction<AnswerSLA>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.sla = action.payload.data
    },
    [changeSLA.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [changeSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [getOLA.fulfilled.type]: (state, action: PayloadAction<OLA[]>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.ola = action.payload
    },
    [getOLA.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newOLA.fulfilled.type]: (state, action: PayloadAction<AnswerOLA>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.ola = action.payload.data
    },
    [newOLA.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteOLA.fulfilled.type]: (state, action: PayloadAction<AnswerOLA>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.ola = action.payload.data
    },
    [deleteOLA.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [changeOLA.fulfilled.type]: (state, action: PayloadAction<AnswerOLA>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.ola = action.payload.data
    },
    [changeOLA.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [changeOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
  },
})

export const slaReducer = slaSlise.reducer
export const { setActiveSLA } = slaSlise.actions
