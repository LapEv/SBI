import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Roles, RolesGroup } from './interfaces'
import { getRoles, getRolesGroup } from 'api/roles'

export type RolesState = {
  roles: Roles[]
  rolesGroup: RolesGroup[]
  isLoadingRoles: boolean
  error?: string
}

const initialState: RolesState = {
  roles: [],
  rolesGroup: [],
  isLoadingRoles: false,
}

export const rolesSlise = createSlice({
  name: 'role',
  initialState,
  reducers: {},
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
  },
})

export const rolesReducer = rolesSlise.reducer
