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
  deleteUser,
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
import {
  newClassifierEquipment,
  newClassifierModel,
  newTypicalMalfunction,
  deleteClassifierEquipment,
  deleteClassifierModel,
  deleteTypicalMalfunction,
  changeClassifierEquipment,
  changeClassifierModel,
  changeTypicalMalfunction,
  changeModelsInTypicalMalfunction,
} from 'api/classifier'
import {
  changeOLA,
  changeSLA,
  deleteOLA,
  deleteSLA,
  newOLA,
  newSLA,
} from 'api/sla'
import {
  changeClient,
  changeClientGroup,
  deleteClient,
  deleteClientGroup,
  newClient,
  newClientGroup,
} from 'api/clients'
import { changeContract, deleteContract, newContract } from 'api/contracts'
import { changeObject, deleteObjects, newObject } from 'api/objects'
import {
  changeINC,
  changeIncidentStatuses,
  deleteIncidentStatuses,
  newINC,
  newIncidentStatuses,
  newTypeOfWork,
  deleteTypesOfWork,
  changeTypesOfWork,
  changeExecutor,
  changeResponsible,
  changeUserClosingCheck,
  changeUserClosing,
  changeStatus,
  newTypeCompletedWork,
  deleteTypesCompletedWork,
  changeTypesCompletedWork,
} from 'api/incidents'
import { getFiles, uploadFiles } from 'api/files'

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
    [deleteUser.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteUser.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteUser.rejected.type]: (state, action: PayloadAction<string>) => {
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
    [newClassifierEquipment.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newClassifierEquipment.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newClassifierEquipment.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteClassifierEquipment.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteClassifierEquipment.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteClassifierEquipment.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeClassifierEquipment.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeClassifierEquipment.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeClassifierEquipment.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newClassifierModel.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newClassifierModel.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newClassifierModel.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteClassifierModel.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteClassifierModel.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteClassifierModel.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeClassifierModel.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeClassifierModel.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeClassifierModel.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newTypicalMalfunction.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newTypicalMalfunction.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newTypicalMalfunction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteTypicalMalfunction.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteTypicalMalfunction.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteTypicalMalfunction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeTypicalMalfunction.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeTypicalMalfunction.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeTypicalMalfunction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeModelsInTypicalMalfunction.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeModelsInTypicalMalfunction.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeModelsInTypicalMalfunction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newSLA.fulfilled.type]: (state, action: PayloadAction<AnswerMessage>) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newSLA.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteSLA.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteSLA.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeSLA.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeSLA.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeSLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newOLA.fulfilled.type]: (state, action: PayloadAction<AnswerMessage>) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newOLA.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteOLA.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteOLA.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeOLA.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeOLA.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeOLA.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newTypeOfWork.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newTypeOfWork.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newTypeOfWork.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteTypesOfWork.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteTypesOfWork.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteTypesOfWork.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeTypesOfWork.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeTypesOfWork.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeTypesOfWork.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },

    [newTypeCompletedWork.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newTypeCompletedWork.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newTypeCompletedWork.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteTypesCompletedWork.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteTypesCompletedWork.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteTypesCompletedWork.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeTypesCompletedWork.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeTypesCompletedWork.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeTypesCompletedWork.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },

    [newClientGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newClientGroup.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newClientGroup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteClientGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteClientGroup.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteClientGroup.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeClientGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeClientGroup.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeClientGroup.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newClient.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newClient.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newClient.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteClient.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteClient.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteClient.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeClient.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeClient.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeClient.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newContract.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newContract.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newContract.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteContract.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteContract.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteContract.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeContract.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeContract.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeContract.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newObject.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newObject.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newObject.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteObjects.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteObjects.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteObjects.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeObject.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeObject.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeObject.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [newINC.fulfilled.type]: (state, action: PayloadAction<AnswerMessage>) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newINC.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newINC.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeINC.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeINC.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeINC.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeExecutor.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeExecutor.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeExecutor.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeResponsible.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeResponsible.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeResponsible.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeStatus.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeStatus.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeStatus.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },

    [changeUserClosingCheck.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeUserClosingCheck.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeUserClosingCheck.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeUserClosing.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeUserClosing.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeUserClosing.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },

    [newIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [newIncidentStatuses.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [newIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [deleteIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [deleteIncidentStatuses.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [deleteIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [changeIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.error = ''
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [changeIncidentStatuses.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [changeIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },

    [getFiles.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [getFiles.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [getFiles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
    [uploadFiles.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerMessage>
    ) => {
      state.isLoadingMessage = false
      state.text = action.payload.message.text
      state.type = action.payload.message.type
    },
    [uploadFiles.pending.type]: state => {
      state.isLoadingMessage = true
    },
    [uploadFiles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingMessage = false
      state.type = 'error'
      state.text = action.payload
    },
  },
})

export const messageReducer = messageSlise.reducer
export const { setMessage, resetMessage } = messageSlise.actions
