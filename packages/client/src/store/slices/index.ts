import { authReducer } from './auth'
import { messageReducer } from './message/message'
import { rolesReducer } from './roles'
import { structureReducer } from './structure'

export const rootReducer = {
  auth: authReducer,
  roles: rolesReducer,
  structure: structureReducer,
  message: messageReducer,
}
