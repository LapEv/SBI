import { Router } from 'express'
import { filesService } from '../services/filesService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const filesRouter = (apiRouter: Router) => {
  const service = new filesService()

  const router: Router = Router()

  router.get(
    '/getFiles',
    roleMiddleware(['getFiles', 'SUPERADMIN']),
    service.getFiles,
  )
  router.post(
    '/uploadFiles',
    roleMiddleware(['uploadFiles', 'SUPERADMIN']),
    service.uploadFiles,
  )

  apiRouter.use('/files', router)
}
