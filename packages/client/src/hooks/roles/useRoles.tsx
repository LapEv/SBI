import { useSelector } from 'react-redux'
import {
  getRoles,
  getRolesGroup,
  newRole,
  newRoleGroup,
  deleteRoles,
  deleteRoleGroup,
} from 'api/roles'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { RolesActions } from './rolesActions'
import { RolesState, resetMessage } from 'storeRoles/index'
import { setActiveRolesGroup } from 'storeRoles/index'

export function useRoles(): [RolesState, RolesActions] {
  const roles = useSelector((state: RootState) => state.roles)
  const dispatch = useAppDispatch()

  return [
    roles,
    {
      getRoles() {
        dispatch(getRoles())
      },
      getRolesGroup() {
        dispatch(getRolesGroup())
      },
      setActiveRolesGroup(data) {
        dispatch(setActiveRolesGroup(data))
      },
      newRole(data) {
        dispatch(newRole(data))
      },
      newRoleGroup(data) {
        dispatch(newRoleGroup(data))
      },
      deleteRoles(data) {
        dispatch(deleteRoles(data))
      },
      deleteRoleGroup(data) {
        dispatch(deleteRoleGroup(data))
      },
      resetMessage() {
        dispatch(resetMessage())
      },
    },
  ]
}
