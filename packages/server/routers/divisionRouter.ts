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
  router.get(
    '/getAllDivisions',
    roleMiddleware(['getAllDivisions', 'ADMIN', 'SUPERADMIN']),
    service.getAllDivisions
  )
  router.delete(
    '/deleteDivision',
    roleMiddleware(['deleteDivision', 'SUPERADMIN']),
    service.deleteDivision
  )

  router.post(
    '/updateDivision',
    roleMiddleware(['updateDivision', 'SUPERADMIN']),
    service.updateDivision
  )

  apiRouter.use('/structure', router)
}
