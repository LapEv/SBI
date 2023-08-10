import { Router } from 'express'
import { userService } from '../services/userService'
import { check } from 'express-validator'
import { auth } from '../data/auth'

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
  router.get('/check', service.check)
  router.get('/getUsers', service.getUsers)
  router.delete('/deleteUser', service.deleteUser)

  apiRouter.use('/user', router)
}
