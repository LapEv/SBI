import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Roles, RolesGroup } from './interfaces'
import { getRoles, getRolesGroup, newRole, newRoleGroup } from 'api/roles'

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
    [newRole.fulfilled.type]: (state, action: PayloadAction<Roles[]>) => {
      state.isLoadingRoles = false
      state.error = ''
      state.roles = action.payload
    },
    [newRole.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newRole.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
    [newRoleGroup.fulfilled.type]: (state, action: PayloadAction<Roles[]>) => {
      state.isLoadingRoles = false
      state.error = ''
      console.log('newRoleGroup action.payload = ', action.payload)
      state.roles = action.payload
    },
    [newRoleGroup.pending.type]: state => {
      state.isLoadingRoles = true
    },
    [newRoleGroup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingRoles = false
      state.error = action.payload
    },
  },
})

export const rolesReducer = rolesSlise.reducer
export const { setActiveRolesGroup } = rolesSlise.actions
