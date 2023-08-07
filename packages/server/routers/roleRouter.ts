import { Router } from 'express'
import { roleService } from '../services/roleService'

export const roleRouter = (apiRouter: Router) => {
  const service = new roleService()

  const router: Router = Router()

  router.post('/newRole', service.newRole)
  router.get('/getRoles', service.getRoles)
  router.delete('/deleteRole', service.deleteRole)

  apiRouter.use('/role', router)
}
