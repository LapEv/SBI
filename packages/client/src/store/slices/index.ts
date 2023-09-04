import { authReducer } from './auth'
import { rolesReducer } from './roles'

export const rootReducer = {
  auth: authReducer,
  roles: rolesReducer,
}
