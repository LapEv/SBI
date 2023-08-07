import { Router } from 'express'
import { userService } from '../services/userService'

export const userRouter = (apiRouter: Router) => {
  const service = new userService()

  const router: Router = Router()

  router.post('/user', service.setUser)
  router.get('/user', service.getUser)
  router.get('/users', service.getUsers)

  apiRouter.use('/user', router)
}
