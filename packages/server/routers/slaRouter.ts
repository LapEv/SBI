import { Router } from 'express'
import { slaService } from '../services/slaService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const slaRouter = (apiRouter: Router) => {
  const service = new slaService()

  const router: Router = Router()

  router.get(
    '/getSLA',
    roleMiddleware(['getSLA', 'ADMIN', 'SUPERADMIN']),
    service.getSLA
  )
  router.get(
    '/getAllSLA',
    roleMiddleware(['getAllSLA', 'ADMIN', 'SUPERADMIN']),
    service.getAllSLA
  )
  router.post(
    '/newSLA',
    roleMiddleware(['newSLA', 'ADMIN', 'SUPERADMIN']),
    service.newSLA
  )
  router.post(
    '/deleteSLA',
    roleMiddleware(['deleteSLA', 'ADMIN', 'SUPERADMIN']),
    service.deleteSLA
  )
  router.delete(
    '/fullDeleteSLA',
    roleMiddleware(['fullDeleteSLA', 'ADMIN', 'SUPERADMIN']),
    service.fullDeleteSLA
  )
  router.post(
    '/pullSLAFromArchive',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'pullSLAFromArchive']),
    service.pullSLAFromArchive
  )
  router.post(
    '/changeSLA',
    roleMiddleware(['changeSLA', 'ADMIN', 'SUPERADMIN']),
    service.changeSLA
  )
  router.get(
    '/getOLA',
    roleMiddleware(['getOLA', 'ADMIN', 'SUPERADMIN']),
    service.getOLA
  )
  router.get(
    '/getAllOLA',
    roleMiddleware(['getAllOLA', 'ADMIN', 'SUPERADMIN']),
    service.getAllOLA
  )
  router.post(
    '/newOLA',
    roleMiddleware(['newOLA', 'ADMIN', 'SUPERADMIN']),
    service.newOLA
  )
  router.post(
    '/deleteOLA',
    roleMiddleware(['deleteOLA', 'ADMIN', 'SUPERADMIN']),
    service.deleteOLA
  )
  router.delete(
    '/fullDeleteOLA',
    roleMiddleware(['fullDeleteOLA', 'ADMIN', 'SUPERADMIN']),
    service.fullDeleteOLA
  )
  router.post(
    '/pullOLAFromArchive',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'pullOLAFromArchive']),
    service.pullOLAFromArchive
  )
  router.post(
    '/changeOLA',
    roleMiddleware(['changeOLA', 'ADMIN', 'SUPERADMIN']),
    service.changeOLA
  )

  apiRouter.use('/sla', router)
}
