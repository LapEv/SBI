import { Router } from 'express'
import { userStatusService } from '../services/userStatusService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const userStatusRouter = (apiRouter: Router) => {
  const service = new userStatusService()

  const router: Router = Router()

  router.post(
    '/setNewUserStatus',
    roleMiddleware(['setNewUserStatus', 'ADMIN', 'SUPERADMIN']),
    service.setNewUserStatus
  )
  router.get(
    '/getUserStatus',
    roleMiddleware(['getUserStatus', 'ADMIN', 'SUPERADMIN']),
    service.getUserStatus
  )
  router.post(
    '/deleteUserStatus',
    roleMiddleware(['deleteUserStatus', 'ADMIN', 'SUPERADMIN']),
    service.deleteUserStatus
  )

  apiRouter.use('/user', router)
}
