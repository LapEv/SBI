import { Router } from 'express'
import { userService } from '../services/userService'

export const userRouter = (apiRouter: Router) => {
  const service = new userService()

  const router: Router = Router()

  router.post('/setUser', service.setUser)
  router.get('/getUser', service.getUser)
  router.get('/getUsers', service.getUsers)
  router.delete('/deleteUser', service.deleteUser)

  apiRouter.use('/user', router)
}
