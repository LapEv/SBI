import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AnswerDepartment,
  AnswerDivision,
  Department,
  Division,
  StructureState,
} from './interfaces'
import {
  getDepartments,
  getDivisions,
  newDepartment,
  newDivision,
  deleteDivision,
  deleteDepartment,
} from 'api/structure'

const initialState: StructureState = {
  divisions: [],
  departaments: [],
  activeDivision: '',
  activeDepartment: '',
  isLoadingStructure: false,
}

export const structureSlise = createSlice({
  name: 'structure',
  initialState,
  reducers: {
    setActiveDivision(state, action) {
      state.activeDivision = action.payload
    },
    setActiveDepartment(state, action) {
      state.activeDepartment = action.payload
    },
  },

  // extraReducers: {
  //   [getDivisions.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<Division[]>
  //   ) => {
  //     state.isLoadingStructure = false
  //     state.error = ''
  //     state.divisions = action.payload
  //   },
  //   [getDivisions.pending.type]: state => {
  //     state.isLoadingStructure = true
  //   },
  //   [getDivisions.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingStructure = false
  //     state.error = action.payload
  //   },
  //   [getDepartments.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<Department[]>
  //   ) => {
  //     state.isLoadingStructure = false
  //     state.error = ''
  //     state.departaments = action.payload
  //   },
  //   [getDepartments.pending.type]: state => {
  //     state.isLoadingStructure = true
  //   },
  //   [getDepartments.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingStructure = false
  //     state.error = action.payload
  //   },
  //   [newDivision.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerDivision>
  //   ) => {
  //     state.isLoadingStructure = false
  //     state.error = ''
  //     state.divisions = action.payload.data
  //   },
  //   [newDivision.pending.type]: state => {
  //     state.isLoadingStructure = true
  //   },
  //   [newDivision.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingStructure = false
  //     state.error = action.payload
  //   },
  //   [newDepartment.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerDepartment>
  //   ) => {
  //     state.isLoadingStructure = false
  //     state.error = ''
  //     state.departaments = action.payload.data
  //   },
  //   [newDepartment.pending.type]: state => {
  //     state.isLoadingStructure = true
  //   },
  //   [newDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingStructure = false
  //     state.error = action.payload
  //   },
  //   [deleteDivision.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerDivision>
  //   ) => {
  //     state.isLoadingStructure = false
  //     state.error = ''
  //     state.divisions = action.payload.data
  //   },
  //   [deleteDivision.pending.type]: state => {
  //     state.isLoadingStructure = true
  //   },
  //   [deleteDivision.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingStructure = false
  //     state.error = action.payload
  //   },
  //   [deleteDepartment.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerDepartment>
  //   ) => {
  //     state.isLoadingStructure = false
  //     state.error = ''
  //     state.departaments = action.payload.data
  //   },
  //   [deleteDepartment.pending.type]: state => {
  //     state.isLoadingStructure = true
  //   },
  //   [deleteDepartment.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingStructure = false
  //     state.error = action.payload
  //   },
  // },
})

export const structureReducer = structureSlise.reducer
export const { setActiveDivision, setActiveDepartment } = structureSlise.actions
