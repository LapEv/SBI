import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  SLA,
  OLA,
  AnswerSLA,
  AnswerOLA,
  SLAState,
  TypesSLA,
  AnswerTypesSLA,
} from './interfaces'
import {
  getSLA,
  getOLA,
  newSLA,
  newOLA,
  deleteSLA,
  deleteOLA,
  changeSLA,
  changeOLA,
  getTypesSLA,
  newTypesSLA,
  deleteTypesSLA,
  changeTypesSLA,
} from 'api/sla'

const initialState: SLAState = {
  sla: [],
  ola: [],
  typesSLA: [],
  activeSLA: '',
  activeList: '',
  isLoadingSLA: false,
}

export const slaSlise = createSlice({
  name: 'sla',
  initialState,
  reducers: {
    setActiveSLA(state, action) {
      state.activeSLA = action.payload
    },
    setActiveList(state, action) {
      state.activeList = action.payload
    },
  },
  extraReducers: {
    [getSLA.fulfilled.type]: (state, action: PayloadAction<SLA[]>) => {
      state.isLoadingSLA = false
      state.error = ''
      state.sla = action.payload
    },
    [getSLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [getSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [newSLA.fulfilled.type]: (state, action: PayloadAction<AnswerSLA>) => {
      state.isLoadingSLA = false
      state.error = ''
      state.sla = action.payload.data
    },
    [newSLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [newSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [deleteSLA.fulfilled.type]: (state, action: PayloadAction<AnswerSLA>) => {
      state.isLoadingSLA = false
      state.error = ''
      state.sla = action.payload.data
    },
    [deleteSLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [deleteSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [changeSLA.fulfilled.type]: (state, action: PayloadAction<AnswerSLA>) => {
      state.isLoadingSLA = false
      state.error = ''
      state.sla = action.payload.data
    },
    [changeSLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [changeSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [getOLA.fulfilled.type]: (state, action: PayloadAction<OLA[]>) => {
      state.isLoadingSLA = false
      state.error = ''
      state.ola = action.payload
    },
    [getOLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [getOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [newOLA.fulfilled.type]: (state, action: PayloadAction<AnswerOLA>) => {
      state.isLoadingSLA = false
      state.error = ''
      state.ola = action.payload.data
    },
    [newOLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [newOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [deleteOLA.fulfilled.type]: (state, action: PayloadAction<AnswerOLA>) => {
      state.isLoadingSLA = false
      state.error = ''
      state.ola = action.payload.data
    },
    [deleteOLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [deleteOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [changeOLA.fulfilled.type]: (state, action: PayloadAction<AnswerOLA>) => {
      state.isLoadingSLA = false
      state.error = ''
      state.ola = action.payload.data
    },
    [changeOLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [changeOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [getTypesSLA.fulfilled.type]: (
      state,
      action: PayloadAction<TypesSLA[]>
    ) => {
      state.isLoadingSLA = false
      state.error = ''
      state.typesSLA = action.payload
    },
    [getTypesSLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [getTypesSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [newTypesSLA.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypesSLA>
    ) => {
      state.isLoadingSLA = false
      state.error = ''
      state.typesSLA = action.payload.data
    },
    [newTypesSLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [newTypesSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [deleteTypesSLA.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypesSLA>
    ) => {
      state.isLoadingSLA = false
      state.error = ''
      state.typesSLA = action.payload.data
    },
    [deleteTypesSLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [deleteTypesSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [changeTypesSLA.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypesSLA>
    ) => {
      state.isLoadingSLA = false
      state.error = ''
      state.typesSLA = action.payload.data
    },
    [changeTypesSLA.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [changeTypesSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
  },
})

export const slaReducer = slaSlise.reducer
export const { setActiveSLA, setActiveList } = slaSlise.actions
