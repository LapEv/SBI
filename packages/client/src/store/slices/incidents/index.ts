import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  INC,
  INCStatuses,
  AnswerINC,
  AnswerINCStatuses,
  INCState,
} from './interfaces'
import {
  getINC,
  getIncidentStatuses,
  newINC,
  newIncidentStatuses,
  deleteIncidentStatuses,
  changeINC,
  changeIncidentStatuses,
} from 'api/incidents'

const initialState: INCState = {
  incidents: [],
  incStatuses: [],
  activeINC: '',
  isLoadingINC: false,
}

export const incidentsSlise = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setActiveINC(state, action) {
      state.activeINC = action.payload
    },
  },
  extraReducers: {
    [getINC.fulfilled.type]: (state, action: PayloadAction<INC[]>) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = action.payload
    },
    [getINC.pending.type]: state => {
      state.isLoadingINC = true
    },
    [getINC.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [newINC.fulfilled.type]: (state, action: PayloadAction<AnswerINC>) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = action.payload.data
    },
    [newINC.pending.type]: state => {
      state.isLoadingINC = true
    },
    [newINC.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeINC.fulfilled.type]: (state, action: PayloadAction<AnswerINC>) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = action.payload.data
    },
    [changeINC.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeINC.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [getIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<INCStatuses[]>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = action.payload
    },
    [getIncidentStatuses.pending.type]: state => {
      state.isLoadingINC = true
    },
    [getIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [newIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINCStatuses>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = action.payload.data
    },
    [newIncidentStatuses.pending.type]: state => {
      state.isLoadingINC = true
    },
    [newIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [deleteIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINCStatuses>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = action.payload.data
    },
    [deleteIncidentStatuses.pending.type]: state => {
      state.isLoadingINC = true
    },
    [deleteIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINCStatuses>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = action.payload.data
    },
    [changeIncidentStatuses.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
  },
})

export const incidentsReducer = incidentsSlise.reducer
export const { setActiveINC } = incidentsSlise.actions
