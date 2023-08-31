import { Router } from 'express'
import { userRouter } from './userRouter'
import { roleRouter } from './roleRouter'
import { roleService } from '../services/roleService'

export const apiRouter: Router = Router()

const rolesService = new roleService()
const roles = rolesService.getAllRoles()

userRouter(roles, apiRouter)
roleRouter(apiRouter)
