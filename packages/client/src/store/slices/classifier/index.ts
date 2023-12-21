import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ClassifierEquipment,
  ClassifierModels,
  TypicalMalfunctions,
  AnswerClassifierEquipment,
  AnswerClassifierModels,
  AnswerTypicalMalfunctions,
  ClassifierState,
} from './interfaces'
import {
  getClassifierEquipments,
  getClassifierModels,
  getTypicalMalfunctions,
  newClassifierEquipment,
  newClassifierModel,
  newTypicalMalfunction,
  deleteClassifierEquipment,
  deleteClassifierModel,
  deleteTypicalMalfunction,
  changeClassifierEquipment,
  changeClassifierModel,
  changeTypicalMalfunction,
  getClassifierModelsById,
  getTypicalMalfunctionsById,
  changeModelsInTypicalMalfunction,
} from 'api/classifier'

const initialState: ClassifierState = {
  equipments: [],
  models: [],
  typicalMalfunctions: [],
  activeEquipment: '',
  activeModel: '',
  isLoadingClassifier: false,
}

export const classifierSlise = createSlice({
  name: 'classifier',
  initialState,
  reducers: {
    setActiveEquipment(state, action) {
      state.activeEquipment = action.payload
    },
    setActiveModel(state, action) {
      state.activeModel = action.payload
    },
  },
  extraReducers: {
    [getClassifierEquipments.fulfilled.type]: (
      state,
      action: PayloadAction<ClassifierEquipment[]>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = action.payload
    },
    [getClassifierEquipments.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [getClassifierEquipments.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [newClassifierEquipment.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClassifierEquipment>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = action.payload.data
    },
    [newClassifierEquipment.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [newClassifierEquipment.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [deleteClassifierEquipment.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClassifierEquipment>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = action.payload.data
    },
    [deleteClassifierEquipment.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [deleteClassifierEquipment.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [changeClassifierEquipment.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClassifierEquipment>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = action.payload.data
    },
    [changeClassifierEquipment.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [changeClassifierEquipment.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [getClassifierModels.fulfilled.type]: (
      state,
      action: PayloadAction<ClassifierModels[]>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.models = action.payload
    },
    [getClassifierModels.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [getClassifierModels.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [getClassifierModelsById.fulfilled.type]: (
      state,
      action: PayloadAction<ClassifierModels[]>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.models = action.payload
    },
    [getClassifierModelsById.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [getClassifierModelsById.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [newClassifierModel.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClassifierModels>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.models = action.payload.data
    },
    [newClassifierModel.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [newClassifierModel.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [deleteClassifierModel.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClassifierModels>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.models = action.payload.data
    },
    [deleteClassifierModel.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [deleteClassifierModel.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [changeClassifierModel.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerClassifierEquipment>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.equipments = action.payload.data
    },
    [changeClassifierModel.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [changeClassifierModel.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [getTypicalMalfunctions.fulfilled.type]: (
      state,
      action: PayloadAction<TypicalMalfunctions[]>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.typicalMalfunctions = action.payload
    },
    [getTypicalMalfunctions.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [getTypicalMalfunctions.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [getTypicalMalfunctionsById.fulfilled.type]: (
      state,
      action: PayloadAction<TypicalMalfunctions[]>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.typicalMalfunctions = action.payload
    },
    [getTypicalMalfunctionsById.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [getTypicalMalfunctionsById.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },

    [newTypicalMalfunction.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypicalMalfunctions>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.typicalMalfunctions = action.payload.data
    },
    [newTypicalMalfunction.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [newTypicalMalfunction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [deleteTypicalMalfunction.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypicalMalfunctions>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.typicalMalfunctions = action.payload.data
    },
    [deleteTypicalMalfunction.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [deleteTypicalMalfunction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [changeTypicalMalfunction.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypicalMalfunctions>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.typicalMalfunctions = action.payload.data
    },
    [changeTypicalMalfunction.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [changeTypicalMalfunction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
    [changeModelsInTypicalMalfunction.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypicalMalfunctions>
    ) => {
      state.isLoadingClassifier = false
      state.error = ''
      state.typicalMalfunctions = action.payload.data
    },
    [changeModelsInTypicalMalfunction.pending.type]: state => {
      state.isLoadingClassifier = true
    },
    [changeModelsInTypicalMalfunction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingClassifier = false
      state.error = action.payload
    },
  },
})

export const classifierReducer = classifierSlise.reducer
export const { setActiveEquipment, setActiveModel } = classifierSlise.actions
