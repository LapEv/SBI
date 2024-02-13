import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnswerUploaded, Files, FilesState } from './interfaces'
import { getFiles, uploadFiles } from 'api/files'

const initialState: FilesState = {
  files: [],
  uploadedFiles: [],
  isLoadingFiles: false,
}

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    resetUploadFiles(state) {
      console.log('reset')
      state.uploadedFiles = []
    },
  },
  extraReducers: {
    [getFiles.fulfilled.type]: (state, action: PayloadAction<Files[]>) => {
      state.isLoadingFiles = false
      state.error = ''
      state.files = action.payload
    },
    [getFiles.pending.type]: state => {
      state.isLoadingFiles = true
    },
    [getFiles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingFiles = false
      state.error = action.payload
    },
    [uploadFiles.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerUploaded>
    ) => {
      state.isLoadingFiles = false
      state.error = ''
      state.uploadedFiles = action.payload.data
    },
    [uploadFiles.pending.type]: state => {
      state.isLoadingFiles = true
    },
    [uploadFiles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingFiles = false
      state.error = action.payload
    },
  },
})

export const filesReducer = filesSlice.reducer
export const { resetUploadFiles } = filesSlice.actions
