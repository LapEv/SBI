import { Router } from 'express'
import { roleService } from '../services/roleService'

export const roleRouter = (apiRouter: Router) => {
  const service = new roleService()

  const router: Router = Router()

  router.post('/newRoleGroup', service.newRoleGroup)
  router.get('/getRolesGroup', service.getRolesGroup)
  router.delete('/deleteRoleGroup', service.deleteRoleGroup)

  router.post('/newRole', service.newRole)
  router.get('/getRoles', service.getRoles)
  router.delete('/deleteRole', service.deleteRole)

  apiRouter.use('/role', router)
}
