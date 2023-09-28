import { Router } from 'express'
import { roleService } from '../services/roleService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const roleRouter = (apiRouter: Router) => {
  const service = new roleService()

  const router: Router = Router()

  router.post(
    '/newRoleGroup',
    roleMiddleware(['addNewRole', 'SUPERADMIN']),
    service.newRoleGroup
  )
  router.delete('/deleteRoleGroup', service.deleteRoleGroup)

  router.post(
    '/newRole',
    roleMiddleware(['addNewRole', 'SUPERADMIN']),
    service.newRole
  )
  router.delete('/deleteRole', service.deleteRole)

  router.get('/getRoles', service.getRoles)
  router.get('/getRolesGroup', service.getRolesGroup)

  apiRouter.use('/role', router)
}
