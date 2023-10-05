import { Router } from 'express'
import { divisionService } from '../services/divisionService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const divisionRouter = (apiRouter: Router) => {
  const service = new divisionService()

  const router: Router = Router()

  router.post(
    '/newDivision',
    roleMiddleware(['newDivision', 'ADMIN', 'SUPERADMIN']),
    service.newDivision
  )
  router.get(
    '/getDivisions',
    roleMiddleware(['getDivisions', 'ADMIN', 'SUPERADMIN']),
    service.getDivisions
  )
  router.delete(
    '/deleteDivision',
    roleMiddleware(['deleteDivision', 'SUPERADMIN']),
    service.deleteDivision
  )

  apiRouter.use('/structure', router)
}
