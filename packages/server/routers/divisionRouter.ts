import { Router } from 'express'
import { divisionService } from '../services/divisionService'

export const divisionRouter = (apiRouter: Router) => {
  const service = new divisionService()

  const router: Router = Router()

  router.post('/newDivision', service.newDivision)
  router.get('/getDivisions', service.getDivisions)
  router.delete('/deleteDivision', service.deleteDivision)

  apiRouter.use('/structure', router)
}
