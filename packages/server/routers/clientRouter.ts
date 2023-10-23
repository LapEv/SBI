import { Router } from 'express'
import { clientService } from '../services/clientService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const roleRouter = (apiRouter: Router) => {
  const service = new clientService()

  const router: Router = Router()

  router.get(
    '/getClientGroups',
    roleMiddleware(['getClientGroups', 'ADMIN', 'SUPERADMIN']),
    service.getClientGroups
  )
  router.post(
    '/newClientGroup',
    roleMiddleware(['newClientGroup', 'ADMIN', 'SUPERADMIN']),
    service.newClientGroup
  )
  router.delete(
    '/deleteClientGroup',
    roleMiddleware(['deleteClientGroup', 'ADMIN', 'SUPERADMIN']),
    service.deleteClientGroup
  )
  router.post(
    '/changeClientGroup',
    roleMiddleware(['changeClientGroup', 'ADMIN', 'SUPERADMIN']),
    service.changeClientGroup
  )
  router.get(
    '/getAllObjects',
    roleMiddleware(['getAllObjects', 'ADMIN', 'SUPERADMIN']),
    service.getAllObjects
  )
  router.get(
    '/getActiveObjects',
    roleMiddleware(['getActiveObjects', 'ADMIN', 'SUPERADMIN']),
    service.getActiveObjects
  )
  router.post(
    '/newObject',
    roleMiddleware(['newObject', 'ADMIN', 'SUPERADMIN']),
    service.newObject
  )
  router.delete(
    '/deleteObject',
    roleMiddleware(['deleteObject', 'ADMIN', 'SUPERADMIN']),
    service.deleteObject
  )
  router.delete(
    '/fulldeleteObject',
    roleMiddleware(['fulldeleteObject', 'ADMIN', 'SUPERADMIN']),
    service.fulldeleteObject
  )
  router.post(
    '/changeObject',
    roleMiddleware(['changeObject', 'ADMIN', 'SUPERADMIN']),
    service.changeObject
  )
  router.post(
    '/pullObjectFromArchive',
    roleMiddleware(['pullObjectFromArchive', 'ADMIN', 'SUPERADMIN']),
    service.pullObjectFromArchive
  )
  router.get(
    '/getAllClients',
    roleMiddleware(['getAllClients', 'ADMIN', 'SUPERADMIN']),
    service.getAllClients
  )
  router.get(
    '/getActiveClients',
    roleMiddleware(['getActiveClients', 'ADMIN', 'SUPERADMIN']),
    service.getActiveClients
  )
  router.post(
    '/newClient',
    roleMiddleware(['newClient', 'ADMIN', 'SUPERADMIN']),
    service.newClient
  )
  router.delete(
    '/deleteClient',
    roleMiddleware(['deleteClient', 'ADMIN', 'SUPERADMIN']),
    service.deleteClient
  )
  router.delete(
    '/fulldeleteClient',
    roleMiddleware(['fulldeleteClient', 'ADMIN', 'SUPERADMIN']),
    service.fulldeleteClient
  )
  router.post(
    '/changeClient',
    roleMiddleware(['changeClient', 'ADMIN', 'SUPERADMIN']),
    service.changeClient
  )
  router.post(
    '/pullClientFromArchive',
    roleMiddleware(['pullClientFromArchive', 'ADMIN', 'SUPERADMIN']),
    service.pullClientFromArchive
  )

  apiRouter.use('/role', router)
}
