import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Roles, RolesGroup } from './interfaces'
import {
  deleteRoles,
  deleteRolesGroup,
  getRoles,
  getRolesGroup,
  newRole,
  newRolesGroup,
  changeRolesGroup,
} from 'api/roles'

export type RolesState = {
  roles: Roles[]
  rolesGroup: RolesGroup[]
  activeRolesGroup: string
  isLoadingRoles: boolean
  error?: string
}

const initialState: RolesState = {
  roles: [],
  rolesGroup: [],
  activeRolesGroup: '',
  isLoadingRoles: false,
}

interface AnswerRole {
  data: Roles[]
  type: string
}

interface AnswerRolesGroup {
  data: RolesGroup[]
  type: string
}

export const rolesSlise = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setActiveRolesGroup(state, action) {
      state.activeRolesGroup = action.payload
    },
  },

  extraReducers: {
    [getRoles.fulfilled.type]: (state, action: PayloadAction<Roles[]>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.roles = action.payload
    },
    [getRoles.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getRoles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [getRolesGroup.fulfilled.type]: (
      state,
      action: PayloadAction<RolesGroup[]>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.rolesGroup = action.payload
    },
    [getRolesGroup.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [getRolesGroup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newRole.fulfilled.type]: (state, action: PayloadAction<AnswerRole>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.roles = action.payload.data
    },
    [newRole.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newRole.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newRolesGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerRolesGroup>
    ) => {
      state.isLoadingRoles = false
      state.rolesGroup = action.payload.data
    },
    [newRolesGroup.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newRolesGroup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteRoles.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerRole>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.roles = action.payload.data
    },
    [deleteRoles.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteRoles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [deleteRolesGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerRolesGroup>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.rolesGroup = action.payload.data
    },
    [deleteRolesGroup.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [deleteRolesGroup.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [changeRolesGroup.fulfilled.type]: (
      state,
      action: PayloadAction<AnswerRolesGroup>
    ) => {
      state.isLoadingRoles = false
      state.error = ''
      state.rolesGroup = action.payload.data
    },
    [changeRolesGroup.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [changeRolesGroup.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
  },
})

export const rolesReducer = rolesSlise.reducer
export const { setActiveRolesGroup } = rolesSlise.actions
