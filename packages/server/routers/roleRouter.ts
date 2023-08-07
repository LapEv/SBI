import { Router } from 'express'
import { roleService } from '../services/roleService'

export const roleRouter = (apiRouter: Router) => {
  const service = new roleService()

  const router: Router = Router()

  router.post('/role', service.setRole)
  router.get('/role', service.getRole)
  router.get('/roles', service.getRoles)

  apiRouter.use('/role', router)
}
