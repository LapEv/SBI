import { Router } from 'express'
import { userRouter } from './userRouter'
import { roleRouter } from './roleRouter'
import { divisionRouter } from './divisionRouter'
import { departmentRouter } from './departmentRouter'
import { userStatusRouter } from './userStatusRouter'

export const apiRouter: Router = Router()

userRouter(apiRouter)
roleRouter(apiRouter)
divisionRouter(apiRouter)
departmentRouter(apiRouter)
userStatusRouter(apiRouter)
