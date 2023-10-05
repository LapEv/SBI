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
  router.delete(
    '/deleteRole',
    roleMiddleware(['deleteRole', 'SUPERADMIN']),
    service.deleteRole
  )

  router.post(
    '/newRolesGroup',
    roleMiddleware(['addNewRolesGroup', 'SUPERADMIN']),
    service.newRolesGroup
  )
  router.delete(
    '/deleteRolesGroup',
    roleMiddleware(['deleteRolesGroup', 'SUPERADMIN']),
    service.deleteRolesGroup
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
