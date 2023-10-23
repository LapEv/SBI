import { Router } from 'express'
import { addressService } from '../services/addressService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const roleRouter = (apiRouter: Router) => {
  const service = new addressService()

  const router: Router = Router()

  router.get(
    '/getAddresses',
    roleMiddleware(['getAddresses', 'ADMIN', 'SUPERADMIN']),
    service.getAddresses
  )
  router.post(
    '/newAddress',
    roleMiddleware(['newAddress', 'ADMIN', 'SUPERADMIN']),
    service.newAddress
  )
  router.delete(
    '/deleteAddress',
    roleMiddleware(['deleteAddress', 'ADMIN', 'SUPERADMIN']),
    service.deleteAddress
  )
  router.post(
    '/changeAddress',
    roleMiddleware(['changeAddress', 'ADMIN', 'SUPERADMIN']),
    service.changeAddress
  )
  router.get(
    '/getRegions',
    roleMiddleware(['getRegions', 'ADMIN', 'SUPERADMIN']),
    service.getRegions
  )
  router.post(
    '/newRegion',
    roleMiddleware(['newRegion', 'ADMIN', 'SUPERADMIN']),
    service.newRegion
  )
  router.delete(
    '/deleteRegion',
    roleMiddleware(['deleteRegion', 'ADMIN', 'SUPERADMIN']),
    service.deleteRegion
  )
  router.post(
    '/changeRegion',
    roleMiddleware(['changeRegion', 'ADMIN', 'SUPERADMIN']),
    service.changeRegion
  )

  apiRouter.use('/role', router)
}
