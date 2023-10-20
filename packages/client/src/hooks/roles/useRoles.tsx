import { useSelector } from 'react-redux'
import {
  getRoles,
  getRolesGroup,
  newRole,
  newRolesGroup,
  deleteRoles,
  deleteRolesGroup,
  changeRolesGroup,
} from 'api/roles'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { RolesActions } from './rolesActions'
import { setActiveRolesGroup } from 'storeRoles/index'
import { RolesState } from 'storeRoles/interfaces'

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
      newRolesGroup(data) {
        dispatch(newRolesGroup(data))
      },
      deleteRoles(data) {
        dispatch(deleteRoles(data))
      },
      deleteRolesGroup(data) {
        dispatch(deleteRolesGroup(data))
      },
      changeRolesGroup(roles, activeRolesGroup) {
        dispatch(changeRolesGroup({ roles, activeRolesGroup }))
      },
    },
  ]
}
