import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Department, Division } from './interfaces'
import { getDepartments, getDivisions, newDivision } from 'api/structure'

export type StructureState = {
  divisions: Division[]
  departaments: Department[]
  isLoading: boolean
  error?: string
}

const initialState: StructureState = {
  divisions: [],
  departaments: [],
  isLoading: false,
}

export const structureSlise = createSlice({
  name: 'structure',
  initialState,
  reducers: {},
  extraReducers: {
    [getDivisions.fulfilled.type]: (
      state,
      action: PayloadAction<Division[]>
    ) => {
      state.isLoading = false
      state.error = ''
      state.divisions = action.payload
    },
    [getDivisions.pending.type]: state => {
      state.isLoading = true
    },
    [getDivisions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getDepartments.fulfilled.type]: (
      state,
      action: PayloadAction<Department[]>
    ) => {
      state.isLoading = false
      state.error = ''
      state.departaments = action.payload
    },
    [getDepartments.pending.type]: state => {
      state.isLoading = true
    },
    [getDepartments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [newDivision.fulfilled.type]: (
      state,
      action: PayloadAction<Division[]>
    ) => {
      state.isLoading = false
      state.error = ''
      state.divisions = action.payload
    },
    [newDivision.pending.type]: state => {
      state.isLoading = true
    },
    [newDivision.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const structureReducer = structureSlise.reducer
