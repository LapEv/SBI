import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Department, Division } from './interfaces'
import {
  getDepartments,
  getDivisions,
  newDepartment,
  newDivision,
  deleteDivision,
} from 'api/structure'
import { setMessage } from '../message/message'
import { useMessage } from 'hooks/message/useMessage'
import { useAppDispatch } from 'store/hooks'
import { useDispatch } from 'react-redux'
// import { messageReducer, messageSlise, setMessage } from '../message/message'

export type StructureState = {
  divisions: Division[]
  departaments: Department[]
  activeDivision: string
  isLoadingStructure: boolean
  error?: string
  // message: {
  //   text: string
  //   type: string | null
  // }
}

const initialState: StructureState = {
  divisions: [],
  departaments: [],
  activeDivision: '',
  // message: {
  //   text: '',
  //   type: null,
  // },
  isLoadingStructure: false,
}

interface AnswerDivision {
  data: Division[]
  message: {
    text: string
    type: string | null
  }
  type: string
}

interface AnswerDepartment {
  data: Department[]
  message: {
    text: string
    type: string | null
  }
  type: string
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
      action: PayloadAction<AnswerDivision>
    ) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = action.payload.data
      console.log('action.payload.message = ', action.payload.message)
      // messageSlise.actions.setMessage({
      //   payload: action.payload.message,
      //   type: 'message/setMessage',
      // })
      // setMessage({
      //   payload: action.payload.message,
      //   type: 'message/setMessage',
      // })
      // state.message = action.payload.message
      const dispatch = useDispatch()
      dispatch(setMessage(action.payload.message))
    },
    [newDivision.pending.type]: state => {
      state.isLoadingStructure = true
    },
    [newDivision.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingStructure = false
      state.error = action.payload
      // messageSlise.actions.setMessage({ type: 'error', text: action.payload })
      // state.message = { type: 'error', text: action.payload }
    },
    [newDepartment.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerDepartment>
    ) => {
      state.isLoadingStructure = false
      state.error = ''
      state.departaments = action.payload.data
      // messageSlise.actions.setMessage(action.payload.message)
      // state.message = action.payload.message
    },
    [newDepartment.pending.type]: state => {
      state.isLoadingStructure = true
    },
    [newDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingStructure = false
      state.error = action.payload
      // state.message = { type: 'error', text: action.payload }
      // messageSlise.actions.setMessage({ type: 'error', text: action.payload })
    },
    [deleteDivision.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerDivision>
    ) => {
      state.isLoadingStructure = false
      state.error = ''
      state.divisions = action.payload.data
      // messageSlise.actions.setMessage({
      //   payload: action.payload.message,
      //   type: 'message/setMessage',
      // })
      // setMessage({
      //   payload: action.payload.message,
      //   type: 'message/setMessage',
      // })
      setMessage
      // state.message = action.payload.message
    },
    [deleteDivision.pending.type]: state => {
      state.isLoadingStructure = true
    },
    [deleteDivision.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingStructure = false
      state.error = action.payload
      // state.message = { type: 'error', text: action.payload }
      // messageSlise.actions.setMessage({ type: 'error', text: action.payload })
    },
  },
})

export const structureReducer = structureSlise.reducer
export const { setActiveDivision } = structureSlise.actions
