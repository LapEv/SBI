import { Router } from 'express'
import { departmentService } from '../services/departmentService'

export const departmentRouter = (apiRouter: Router) => {
  const service = new departmentService()

  const router: Router = Router()

  router.post('/newDepartment', service.newDepartment)
  router.get('/getDepartments', service.getDepartments)
  router.delete('/deleteDepartment', service.deleteDepartment)

  apiRouter.use('/structure', router)
}
