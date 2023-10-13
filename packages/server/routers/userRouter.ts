import { Router } from 'express'
import { userService } from '../services/userService'
import { check } from 'express-validator'
import { auth } from '../data/auth'
import { authMiddleware } from '../middleware/authMiddleware'
const roleMiddleware = require('../middleware/roleMiddleware')

export const userRouter = (apiRouter: Router) => {
  const service = new userService()

  const router: Router = Router()

  router.post(
    '/setUser',
    [
      check(auth.username, auth.emptyUsername).notEmpty(),
      check(auth.password, auth.checkPassword()).isLength({
        min: auth.passwordMinLength,
        max: auth.passwordMaxLength,
      }),
    ],
    service.setUser
  )
  router.post('/login', service.login)
  router.get('/checkUser', authMiddleware, service.check)
  router.post(
    '/getUserInfo',
    roleMiddleware(['getUsers', 'ADMIN', 'SUPERADMIN']),
    service.getUserInfo
  )
  router.post(
    '/getUsers',
    roleMiddleware(['getUsers', 'ADMIN', 'SUPERADMIN']),
    service.getUsers
  )
  router.post(
    '/getUsers',
    roleMiddleware(['getUsers', 'ADMIN', 'SUPERADMIN']),
    service.getUsers
  )
  router.post(
    '/deleteUser',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.deleteUser
  )
  router.delete(
    '/fullDeleteUser',
    roleMiddleware(['ADMIN', 'SUPERADMIN']),
    service.fullDeleteUser
  )

  router.post('/theme', service.changeTheme)

  apiRouter.use('/user', router)
}
