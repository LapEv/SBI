import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Objects, AnswerObjects, ObjectsState } from './interfaces'
import { changeObject, deleteObjects, getObjects, newObject } from 'api/objects'

const initialState: ObjectsState = {
  objects: [],
  activeObject: '',
  isLoadingRoles: false,
}

export const objectsSlise = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    setActiveObject(state, action) {
      state.activeObject = action.payload
    },
  },
  extraReducers: {
    [getObjects.fulfilled.type]: (state, action: PayloadAction<Objects[]>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.objects = action.payload
    },
    [getObjects.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getObjects.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newObject.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerObjects>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.objects = action.payload.data
    },
    [newObject.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newObject.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteObjects.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerObjects>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.objects = action.payload.data
    },
    [deleteObjects.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteObjects.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [changeObject.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerObjects>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.objects = action.payload.data
    },
    [changeObject.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [changeObject.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
  },
})

export const objectsReducer = objectsSlise.reducer
export const { setActiveObject } = objectsSlise.actions
