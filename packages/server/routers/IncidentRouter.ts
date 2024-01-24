import { Router } from 'express'
import { incidentService } from '../services/incidentService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const incidentRouter = (apiRouter: Router) => {
  const service = new incidentService()

  const router: Router = Router()

  router.get(
    '/getIncidentStatuses',
    roleMiddleware(['getIncidentStatuses', 'ADMIN', 'SUPERADMIN']),
    service.getIncidentStatuses
  )
  router.get(
    '/getAllIncidentStatuses',
    roleMiddleware(['getAllIncidentStatuses', 'ADMIN', 'SUPERADMIN']),
    service.getAllIncidentStatuses
  )
  router.post(
    '/newIncidentStatuses',
    roleMiddleware(['newIncidentStatuses', 'ADMIN', 'SUPERADMIN']),
    service.newIncidentStatuses
  )
  router.post(
    '/deleteIncidentStatuses',
    roleMiddleware(['deleteIncidentStatuses', 'ADMIN', 'SUPERADMIN']),
    service.deleteIncidentStatuses
  )
  router.delete(
    '/fullDeleteIncidentStatuses',
    roleMiddleware(['fullDeleteIncidentStatuses', 'ADMIN', 'SUPERADMIN']),
    service.fullDeleteIncidentStatuses
  )
  router.post(
    '/pullIncidentStatusesFromArchive',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'pullIncidentStatusesFromArchive']),
    service.pullIncidentStatusesFromArchive
  )
  router.post(
    '/changeIncidentStatuses',
    roleMiddleware(['changeIncidentStatuses', 'ADMIN', 'SUPERADMIN']),
    service.changeIncidentStatuses
  )

  router.get(
    '/getTypesOfWork',
    roleMiddleware(['getTypesOfWork', 'ADMIN', 'SUPERADMIN']),
    service.getTypesOfWork
  )
  router.get(
    '/getAllTypesOfWork',
    roleMiddleware(['getAllTypesOfWork', 'ADMIN', 'SUPERADMIN']),
    service.getAllTypesOfWork
  )
  router.post(
    '/newTypeOfWork',
    roleMiddleware(['newTypeOfWork', 'ADMIN', 'SUPERADMIN']),
    service.newTypeOfWork
  )
  router.post(
    '/deleteTypesOfWork',
    roleMiddleware(['deleteTypesOfWork', 'ADMIN', 'SUPERADMIN']),
    service.deleteTypesOfWork
  )
  router.delete(
    '/fullDeleteTypesOfWork',
    roleMiddleware(['fullDeleteTypesOfWork', 'ADMIN', 'SUPERADMIN']),
    service.fullDeleteTypesOfWork
  )
  router.post(
    '/pullTypesOfWorkFromArchive',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'pullTypesOfWorkFromArchive']),
    service.pullTypesOfWorkFromArchive
  )
  router.post(
    '/changeTypesOfWork',
    roleMiddleware(['changeTypesOfWork', 'ADMIN', 'SUPERADMIN']),
    service.changeTypesOfWork
  )

  router.get(
    '/getINC',
    roleMiddleware(['getINC', 'ADMIN', 'SUPERADMIN']),
    service.getINC
  )
  router.get(
    '/getAllINC',
    roleMiddleware(['getAllINC', 'ADMIN', 'SUPERADMIN']),
    service.getAllINC
  )
  router.post(
    '/newINC',
    roleMiddleware(['newINC', 'ADMIN', 'SUPERADMIN']),
    service.newINC
  )
  router.post(
    '/deleteINC',
    roleMiddleware(['deleteINC', 'ADMIN', 'SUPERADMIN']),
    service.deleteINC
  )
  router.delete(
    '/fullDeleteINC',
    roleMiddleware(['fullDeleteINC', 'ADMIN', 'SUPERADMIN']),
    service.fullDeleteINC
  )
  router.post(
    '/pullINCFromArchive',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'pullINCFromArchive']),
    service.pullINCFromArchive
  )
  router.post(
    '/changeINC',
    roleMiddleware(['changeINC', 'ADMIN', 'SUPERADMIN']),
    service.changeINC
  )
  router.post(
    '/changeExecutor',
    roleMiddleware(['changeExecutor', 'ADMIN', 'SUPERADMIN']),
    service.changeExecutor
  )
  router.post(
    '/changeResponsible',
    roleMiddleware(['changeResponsible', 'ADMIN', 'SUPERADMIN']),
    service.changeResponsible
  )
  router.post(
    '/changeUserClosingCheck',
    roleMiddleware(['changeUserClosingCheck', 'ADMIN', 'SUPERADMIN']),
    service.changeUserClosingCheck
  )
  router.post(
    '/changeUserClosing',
    roleMiddleware(['changeUserClosing', 'ADMIN', 'SUPERADMIN']),
    service.changeUserClosing
  )

  apiRouter.use('/incidents', router)
}
