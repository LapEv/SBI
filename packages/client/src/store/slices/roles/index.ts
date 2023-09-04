import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Roles, RolesGroup } from './interfaces'
import { getRoles, getRolesGroup } from 'api/roles'

export type RolesState = {
  roles: Roles[]
  rolesGroup: RolesGroup[]
  isLoading: boolean
  error?: string
}

const initialState: RolesState = {
  roles: [],
  rolesGroup: [],
  isLoading: false,
}

export const rolesSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [getRoles.fulfilled.type]: (state, action: PayloadAction<Roles[]>) => {
      state.isLoading = false
      state.error = ''
      state.roles = action.payload
    },
    [getRoles.pending.type]: state => {
      state.isLoading = true
    },
    [getRoles.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getRolesGroup.fulfilled.type]: (
      state,
      action: PayloadAction<RolesGroup[]>
    ) => {
      state.isLoading = false
      state.error = ''
      state.rolesGroup = action.payload
    },
    [getRolesGroup.pending.type]: state => {
      state.isLoading = true
    },
    [getRolesGroup.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const rolesReducer = rolesSlise.reducer
