import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  INC,
  INCStatuses,
  AnswerINC,
  AnswerINCStatuses,
  TypesOfWork,
  AnswerTypesOfWork,
  INCState,
} from './interfaces'
import {
  getINC,
  getIncidentStatuses,
  newINC,
  newIncidentStatuses,
  deleteIncidentStatuses,
  changeINC,
  changeIncidentStatuses,
  getTypesOfWork,
  newTypeOfWork,
  deleteTypesOfWork,
  changeTypesOfWork,
  changeExecutor,
  changeResponsible,
  changeUserClosingCheck,
  changeUserClosing,
  changeStatus,
} from 'api/incidents'
import { convertDateToStringFromDB } from 'utils/convertDate'

const initialState: INCState = {
  incidents: [],
  incStatuses: [],
  typesOfWork: [],
  activeINC: '',
  isLoadingINC: false,
}

const createINCData = (data: INC[]) => {
  return data.map(item => {
    return {
      ...item,
      status: item.IncindentStatus?.statusINC as string,
      client: item.Client?.client as string,
      contract: item.Contract?.contract as string,
      object: item.Object?.object as string,
      address: item.Object?.Address?.address as string,
      coordinates: item.Object?.Address?.coordinates as string,
      region: item.Object?.Region?.region as string,
      sla: item.SLA?.sla as string,
      typeOfWork: item.TypesOfWork?.typeOfWork as string,
      userAccepted: item.User?.shortName as string,
      executor: item.UserExecutor?.shortName as string,
      responsible: item.UserResponsible?.shortName as string,
      userClosingCheck: item.UserClosingCheck?.shortName as string,
      userClosing: item.UserClosing?.shortName as string,
      equipment: item.ClassifierEquipment?.equipment as string,
      model: item.ClassifierModel?.model as string,
      typicalMalfunction: item.TypicalMalfunction?.typicalMalfunction as string,
      logs: item.IncidentLogs,
      timeSLA: convertDateToStringFromDB(item.timeSLA) as string,
      timeRegistration: convertDateToStringFromDB(
        item.timeRegistration
      ) as string,
      timeInWork: convertDateToStringFromDB(item.timeInWork) as string,
      timeCloseCheck: convertDateToStringFromDB(item.timeCloseCheck) as string,
      timeClose: convertDateToStringFromDB(item.timeClose) as string,
    }
  })
}

export const incidentsSlise = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setActiveINC(state, action) {
      state.activeINC = action.payload
    },
  },
  extraReducers: {
    [getINC.fulfilled.type]: (state, action: PayloadAction<INC[]>) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(action.payload)
    },
    [getINC.pending.type]: state => {
      state.isLoadingINC = true
    },
    [getINC.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [newINC.fulfilled.type]: (state, action: PayloadAction<AnswerINC>) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(action.payload.data)
    },
    [newINC.pending.type]: state => {
      state.isLoadingINC = true
    },
    [newINC.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeINC.fulfilled.type]: (state, action: PayloadAction<AnswerINC>) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(action.payload.data)
    },
    [changeExecutor.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeExecutor.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeExecutor.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINC>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(action.payload.data)
    },
    [changeResponsible.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeResponsible.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeResponsible.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINC>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(action.payload.data)
    },
    [changeStatus.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeStatus.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeStatus.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINC>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(action.payload.data)
    },
    [changeUserClosingCheck.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeUserClosingCheck.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeUserClosingCheck.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINC>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(action.payload.data)
    },
    [changeUserClosing.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeUserClosing.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeUserClosing.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINC>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incidents = createINCData(action.payload.data)
    },
    [changeINC.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeINC.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [getIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<INCStatuses[]>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = action.payload
    },
    [getIncidentStatuses.pending.type]: state => {
      state.isLoadingINC = true
    },
    [getIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [newIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINCStatuses>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = action.payload.data
    },
    [newIncidentStatuses.pending.type]: state => {
      state.isLoadingINC = true
    },
    [newIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [deleteIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINCStatuses>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = action.payload.data
    },
    [deleteIncidentStatuses.pending.type]: state => {
      state.isLoadingINC = true
    },
    [deleteIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeIncidentStatuses.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerINCStatuses>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.incStatuses = action.payload.data
    },
    [changeIncidentStatuses.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeIncidentStatuses.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [getTypesOfWork.fulfilled.type]: (
      state,
      action: PayloadAction<TypesOfWork[]>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesOfWork = action.payload
    },
    [getTypesOfWork.pending.type]: state => {
      state.isLoadingINC = true
    },
    [getTypesOfWork.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [newTypeOfWork.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypesOfWork>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesOfWork = action.payload.data
    },
    [newTypeOfWork.pending.type]: state => {
      state.isLoadingINC = true
    },
    [newTypeOfWork.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [deleteTypesOfWork.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypesOfWork>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesOfWork = action.payload.data
    },
    [deleteTypesOfWork.pending.type]: state => {
      state.isLoadingINC = true
    },
    [deleteTypesOfWork.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
    [changeTypesOfWork.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerTypesOfWork>
    ) => {
      state.isLoadingINC = false
      state.error = ''
      state.typesOfWork = action.payload.data
    },
    [changeTypesOfWork.pending.type]: state => {
      state.isLoadingINC = true
    },
    [changeTypesOfWork.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingINC = false
      state.error = action.payload
    },
  },
})

export const incidentsReducer = incidentsSlise.reducer
export const { setActiveINC } = incidentsSlise.actions
