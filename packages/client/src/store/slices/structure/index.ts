import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Department, Division } from './interfaces'
import { getDepartments, getDivisions, newDivision } from 'api/structure'

export type StructureState = {
  divisions: Division[]
  departaments: Department[]
  activeDivision: string
  isLoadingStructure: boolean
  error?: string
}

const initialState: StructureState = {
  divisions: [],
  departaments: [],
  activeDivision: '',
  isLoadingStructure: false,
}

export const structureSlise = createSlice({
  name: 'structure',
  initialState,
  reducers: {
    setActiveDivision(state, action) {
      state.activeDivision = action.payload
    },
  },

  extraReducers: {
    [getDivisions.fulfilled.type]: (
      state,
      action: PayloadAction<Division[]>
    ) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = action.payload
    },
    [getDivisions.pending.type]: state => {
      state.isLoadingStructure = true
    },
    [getDivisions.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingStructure = false
      state.error = action.payload
    },
    [getDepartments.fulfilled.type]: (
      state,
      action: PayloadAction<Department[]>
    ) => {
      state.isLoadingStructure = false
      state.error = ''
      state.departaments = action.payload
    },
    [getDepartments.pending.type]: state => {
      state.isLoadingStructure = true
    },
    [getDepartments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingStructure = false
      state.error = action.payload
    },
    [newDivision.fulfilled.type]: (
      state,
      action: PayloadAction<Division[]>
    ) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = action.payload
    },
    [newDivision.pending.type]: state => {
      state.isLoadingStructure = true
    },
    [newDivision.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingStructure = false
      state.error = action.payload
    },
  },
})

export const structureReducer = structureSlise.reducer
export const { setActiveDivision } = structureSlise.actions
