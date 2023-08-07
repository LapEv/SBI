import { Router } from 'express'
import { userRouter } from './userRouter'
import { roleRouter } from './roleRouter'

export const apiRouter: Router = Router()

userRouter(apiRouter)
roleRouter(apiRouter)
