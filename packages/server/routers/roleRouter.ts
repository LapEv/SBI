import { Router } from 'express'
import { roleService } from '../services/roleService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const roleRouter = (apiRouter: Router) => {
  const service = new roleService()

  const router: Router = Router()

  router.post(
    '/newRole',
    roleMiddleware(['addNewRole', 'SUPERADMIN']),
    service.newRole
  )
  router.post(
    '/deleteRole',
    roleMiddleware(['deleteRole', 'SUPERADMIN', 'ADMIN']),
    service.deleteRole
  )
  router.delete(
    '/fullDeleteRole',
    roleMiddleware(['fullDeleteRole', 'SUPERADMIN', 'ADMIN']),
    service.fullDeleteRole
  )
  router.post(
    '/newRolesGroup',
    roleMiddleware(['addNewRolesGroup', 'SUPERADMIN']),
    service.newRolesGroup
  )
  router.post(
    '/deleteRolesGroup',
    roleMiddleware(['deleteRolesGroup', 'SUPERADMIN']),
    service.deleteRolesGroup
  )
  router.delete(
    '/fullDeleteRolesGroup',
    roleMiddleware(['fullDeleteRolesGroup', 'SUPERADMIN', 'ADMIN']),
    service.fullDeleteRolesGroup
  )
  router.post(
    '/changeRolesGroup',
    roleMiddleware(['changeRolesGroup', 'SUPERADMIN']),
    service.changeRolesGroup
  )

  router.get('/getRoles', service.getRoles)
  router.get('/getRolesGroup', service.getRolesGroup)

  apiRouter.use('/role', router)
}
