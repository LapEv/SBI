import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnswerFiles, Files, FilesState } from './interfaces'
import { getFiles, uploadFiles } from 'api/files'

const initialState: FilesState = {
  files: [],
  isLoadingSLA: false,
}

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: {
    [getFiles.fulfilled.type]: (state, action: PayloadAction<Files[]>) => {
      state.isLoadingSLA = false
      state.error = ''
      state.files = action.payload
    },
    [getFiles.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [getFiles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
    [uploadFiles.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerFiles>
    ) => {
      state.isLoadingSLA = false
      state.error = ''
      state.files = action.payload.data
    },
    [uploadFiles.pending.type]: state => {
      state.isLoadingSLA = true
    },
    [uploadFiles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingSLA = false
      state.error = action.payload
    },
  },
})

export const filesReducer = filesSlice.reducer
