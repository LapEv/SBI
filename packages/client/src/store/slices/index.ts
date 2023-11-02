import { addressesReducer } from './addresses'
import { authReducer } from './auth'
import { classifierReducer } from './classifier'
import { messageReducer } from './message'
import { rolesReducer } from './roles'
import { structureReducer } from './structure'

export const rootReducer = {
  auth: authReducer,
  roles: rolesReducer,
  structure: structureReducer,
  message: messageReducer,
  addresses: addressesReducer,
  classifier: classifierReducer,
}
