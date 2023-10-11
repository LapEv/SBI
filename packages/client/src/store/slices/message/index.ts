import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  changeRolesGroup,
  deleteRoles,
  deleteRolesGroup,
  newRole,
  newRolesGroup,
} from 'api/roles'
import { deleteDivision, newDivision } from 'api/structure'
import { AnswerMessage, MessageState } from './interfaces'

const initialState: MessageState = {
  text: '',
  type: null,
  isLoadingMessage: false,
  error: '',
}

export const messageSlise = createSlice({
  name: 'message',
  initialState,
  reducers: {
    resetMessage(state) {
      state.text = ''
      state.type = null
    },
    setMessage(state, action) {
      state = action.payload.payload
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
  },
  extraReducers: {
    [newDivision.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newDivision.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newDivision.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },

    [deleteDivision.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteDivision.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteDivision.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newRole.fulfilled.type]: (state, action: PayloadAction<AnswerMessage>) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newRole.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newRole.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newRolesGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newRolesGroup.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newRolesGroup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteRoles.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteRoles.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteRoles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteRolesGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteRolesGroup.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteRolesGroup.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeRolesGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeRolesGroup.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeRolesGroup.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
  },
})

export const messageReducer = messageSlise.reducer
export const { setMessage, resetMessage } = messageSlise.actions
