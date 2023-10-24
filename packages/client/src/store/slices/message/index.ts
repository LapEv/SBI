import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  changeRolesGroup,
  deleteRoles,
  deleteRolesGroup,
  newRole,
  newRolesGroup,
} from 'api/roles'
import {
  deleteDepartment,
  deleteDivision,
  newDepartment,
  newDivision,
} from 'api/structure'
import { AnswerMessage, MessageState } from './interfaces'
import {
  ChangeAvatar,
  changePassword,
  updateProfile,
  deleteUsers,
  signin,
  signout,
  signup,
  updateUser,
} from 'api/user'
import {
  changeAddress,
  changeRegion,
  deleteAddress,
  deleteRegion,
  newAddress,
  newRegion,
} from 'api/address'

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
      state.text = action.payload.text
      state.type = action.payload.type
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
    [newDepartment.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newDepartment.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newDepartment.rejected.type]: (state, action: PayloadAction<string>) => {
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
    [deleteDepartment.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteDepartment.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteDepartment.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
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
    [signin.fulfilled.type]: (state, action: PayloadAction<AnswerMessage>) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [signin.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [signin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [signup.fulfilled.type]: (state, action: PayloadAction<AnswerMessage>) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [signup.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [signup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [signout.fulfilled.type]: (state, action: PayloadAction<AnswerMessage>) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [signout.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [signout.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [updateProfile.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [updateProfile.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [updateProfile.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [ChangeAvatar.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [ChangeAvatar.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [ChangeAvatar.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changePassword.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changePassword.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changePassword.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteUsers.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteUsers.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [updateUser.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [updateUser.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [updateUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newAddress.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newAddress.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newAddress.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteAddress.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteAddress.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteAddress.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeAddress.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeAddress.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeAddress.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newRegion.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newRegion.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newRegion.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteRegion.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteRegion.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteRegion.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeRegion.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeRegion.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeRegion.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
  },
})

export const messageReducer = messageSlise.reducer
export const { setMessage, resetMessage } = messageSlise.actions
