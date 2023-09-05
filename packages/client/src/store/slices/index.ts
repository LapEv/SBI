import { authReducer } from './auth'
import { rolesReducer } from './roles'
import { structureReducer } from './structure'

export const rootReducer = {
  auth: authReducer,
  roles: rolesReducer,
  structure: structureReducer,
}
