import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  INC,
  INCStatuses,
  AnswerINC,
  AnswerINCStatuses,
  TypesOfWork,
  AnswerTypesOfWork,
  INCState,
  TypesCompletedWork,
  AnswerTypesCompletedWork,
  AnswerGetINC,
  AnswerGetINCs,
  AnswerINCsData,
  AnswerGetFilter,
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
  getTypesCompletedWork,
  newTypeCompletedWork,
  deleteTypesCompletedWork,
  changeTypesCompletedWork,
  getINCs,
  getFilter,
  changeComment,
} from 'api/incidents'
import { convertDateToStringFromDB } from 'utils/convertDate'
import { CheckUser, signin } from 'api/user'
import { ICheckUser } from 'storeAuth/interfaces'

const initialState: INCState = {
  countIncidents: 0,
  incidents: [],
  incStatuses: [],
  typesOfWork: [],
  typesCompletedWork: [],
  filterListData: {
    status: [],
    client: [],
    legalName: [],
    contract: [],
    object: [],
    address: [],
    region: [],
    userAccepted: [],
    equipment: [],
    model: [],
    executor: [],
    responsible: [],
    overdue: [],
    sla: [],
  },
  activeINC: '',
  isLoadingINC: false,
}

const createINCData = (data: INC[]) => {
  return data.map(item => {
    return {
      ...item,
      // status: item.IncindentStatus?.statusINC as string,
      client: item.Client?.client as string,
      legalName: item.Client?.legalName as string,
      contract: item.Contract?.contract as string,
      object: item.Object?.object as string,
      address: item.Object?.Address?.address as string,
      coordinates: item.Object?.Address?.coordinates as string,
      region: item.Object?.Region?.region as string,
      sla: item.SLA?.sla as string,
      typeOfWork: item.TypesOfWork?.typeOfWork as string,
      typeCompletedWork: item.TypesCompletedWork?.typeCompletedWork as string,
      userAccepted: item.User?.shortName as string,
      // executor: item.UserExecutor?.shortName as string,
      // responsible: item.UserResponsible?.shortName as string,
      userClosingCheck: item.UserClosingCheck?.shortName as string,
      userClosing: item.UserClosing?.shortName as string,
      equipment: item.ClassifierEquipment?.equipment as string,
      model: item.ClassifierModel?.model as string,
      typicalMalfunction: item.TypicalMalfunction?.typicalMalfunction as string,
      logs: item.IncidentLogs,
      files: item.Files,
      act: item.Files?.map(item => item.name).toString() as string,
      // timeSLA: convertDateToStringFromDB(item.timeSLA) as string,
      timeRegistration: convertDateToStringFromDB(
        item.timeRegistration,
      ) as string,
      timeInWork: convertDateToStringFromDB(item.timeInWork) as string,
      timeCloseCheck: convertDateToStringFromDB(item.timeCloseCheck) as string,
      timeClose: convertDateToStringFromDB(item.timeClose) as string,
      spaceParts: Array.isArray(item.spaceParts)
        ? item.spaceParts.join(', ')
        : item.spaceParts,
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
    setLoadingINC(state, action) {
      state.isLoadingINC = action.payload
    },
  },
  // extraReducers: {
  //   [signin.fulfilled.type]: (state, action: PayloadAction<ICheckUser>) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     const { filterData } = action.payload
  //     state.filterListData = filterData
  //   },
  //   [CheckUser.fulfilled.type]: (state, action: PayloadAction<ICheckUser>) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     const { filterData } = action.payload
  //     state.filterListData = filterData
  //   },
  //   [getFilter.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerGetFilter>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.filterListData = action.payload
  //   },
  //   [getFilter.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [getFilter.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [getINC.fulfilled.type]: (state, action: PayloadAction<AnswerGetINC>) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     const { incs, count } = action.payload
  //     state.incidents = createINCData(incs)
  //     state.countIncidents = count
  //   },
  //   [getINC.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [getINC.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [getINCs.fulfilled.type]: (state, action: PayloadAction<AnswerGetINC>) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     const { incs, count, filterListData } = action.payload
  //     state.incidents = createINCData(incs)
  //     state.countIncidents = count
  //     state.filterListData = filterListData
  //   },
  //   [getINCs.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [getINCs.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [newINC.fulfilled.type]: (state, action: PayloadAction<AnswerGetINCs>) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     const { incs, count, filterListData } = action.payload.data
  //     state.incidents = createINCData(incs)
  //     state.countIncidents = count
  //     state.filterListData = filterListData
  //   },
  //   [newINC.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [newINC.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeINC.fulfilled.type]: (state, action: PayloadAction<AnswerINC>) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.incidents = createINCData(action.payload.data)
  //   },
  //   [changeExecutor.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeExecutor.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeExecutor.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerINCsData>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     const { incs, filterListData } = action.payload.data
  //     state.filterListData = filterListData
  //     state.incidents = createINCData(incs)
  //   },
  //   [changeResponsible.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeResponsible.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeResponsible.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerINCsData>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     const { incs, filterListData } = action.payload.data
  //     state.filterListData = filterListData
  //     state.incidents = createINCData(incs)
  //   },
  //   [changeStatus.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeStatus.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeStatus.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerINCsData>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     const { incs, filterListData } = action.payload.data
  //     state.filterListData = filterListData
  //     state.incidents = createINCData(incs)
  //   },
  //   [changeUserClosingCheck.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeUserClosingCheck.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeUserClosingCheck.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerINC>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.incidents = createINCData(action.payload.data)
  //   },
  //   [changeUserClosing.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeUserClosing.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeUserClosing.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerINC>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.incidents = createINCData(action.payload.data)
  //   },
  //   [changeComment.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeComment.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeComment.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerINC>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.incidents = createINCData(action.payload.data)
  //   },

  //   [changeINC.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeINC.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [getIncidentStatuses.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<INCStatuses[]>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.incStatuses = action.payload
  //   },
  //   [getIncidentStatuses.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [getIncidentStatuses.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [newIncidentStatuses.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerINCStatuses>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.incStatuses = action.payload.data
  //   },
  //   [newIncidentStatuses.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [newIncidentStatuses.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [deleteIncidentStatuses.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerINCStatuses>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.incStatuses = action.payload.data
  //   },
  //   [deleteIncidentStatuses.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [deleteIncidentStatuses.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeIncidentStatuses.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerINCStatuses>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.incStatuses = action.payload.data
  //   },
  //   [changeIncidentStatuses.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeIncidentStatuses.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [getTypesOfWork.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<TypesOfWork[]>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.typesOfWork = action.payload
  //   },
  //   [getTypesOfWork.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [getTypesOfWork.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [newTypeOfWork.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerTypesOfWork>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.typesOfWork = action.payload.data
  //   },
  //   [newTypeOfWork.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [newTypeOfWork.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [deleteTypesOfWork.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerTypesOfWork>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.typesOfWork = action.payload.data
  //   },
  //   [deleteTypesOfWork.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [deleteTypesOfWork.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeTypesOfWork.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerTypesOfWork>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.typesOfWork = action.payload.data
  //   },
  //   [changeTypesOfWork.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeTypesOfWork.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },

  //   [getTypesCompletedWork.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<TypesCompletedWork[]>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.typesCompletedWork = action.payload
  //   },
  //   [getTypesCompletedWork.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [getTypesCompletedWork.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [newTypeCompletedWork.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerTypesCompletedWork>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.typesCompletedWork = action.payload.data
  //   },
  //   [newTypeCompletedWork.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [newTypeCompletedWork.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [deleteTypesCompletedWork.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerTypesCompletedWork>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.typesCompletedWork = action.payload.data
  //   },
  //   [deleteTypesCompletedWork.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [deleteTypesCompletedWork.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  //   [changeTypesCompletedWork.fulfilled.type]: (
  //     state,
  //     action: PayloadAction<AnswerTypesCompletedWork>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = ''
  //     state.typesCompletedWork = action.payload.data
  //   },
  //   [changeTypesCompletedWork.pending.type]: state => {
  //     state.isLoadingINC = true
  //   },
  //   [changeTypesCompletedWork.rejected.type]: (
  //     state,
  //     action: PayloadAction<string>
  //   ) => {
  //     state.isLoadingINC = false
  //     state.error = action.payload
  //   },
  // },
})

export const incidentsReducer = incidentsSlise.reducer
export const { setActiveINC, setLoadingINC } = incidentsSlise.actions
