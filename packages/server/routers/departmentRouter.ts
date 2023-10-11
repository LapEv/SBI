import { Router } from 'express'
import { departmentService } from '../services/departmentService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const departmentRouter = (apiRouter: Router) => {
  const service = new departmentService()

  const router: Router = Router()

  router.post('/newDepartment', service.newDepartment)
  router.get('/getDepartments', service.getDepartments)
  router.delete('/deleteDepartment', service.deleteDepartment)

  router.post(
    '/newDepartment',
    roleMiddleware(['newDepartment', 'ADMIN', 'SUPERADMIN']),
    service.newDepartment
  )
  router.get(
    '/getDepartments',
    roleMiddleware(['getDepartments', 'ADMIN', 'SUPERADMIN']),
    service.getDepartments
  )
  router.get(
    '/getAllDepartments',
    roleMiddleware(['getAllDepartments', 'ADMIN', 'SUPERADMIN']),
    service.getAllDepartments
  )
  router.delete(
    '/deleteDepartment',
    roleMiddleware(['deleteDepartment', 'SUPERADMIN']),
    service.deleteDepartment
  )

  router.post(
    '/updateDepartment',
    roleMiddleware(['updateDepartment', 'SUPERADMIN']),
    service.updateDepartment
  )

  apiRouter.use('/structure', router)
}
