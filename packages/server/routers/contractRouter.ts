import { Router } from 'express'
import { contractService } from '../services/contractService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const contractRouter = (apiRouter: Router) => {
  const service = new contractService()

  const router: Router = Router()

  router.get(
    '/getContracts',
    roleMiddleware(['getContracts', 'ADMIN', 'SUPERADMIN']),
    service.getContracts
  )
  router.post(
    '/getContractsByClientID',
    roleMiddleware(['getContractsByClientID', 'ADMIN', 'SUPERADMIN']),
    service.getContractsByClientID
  )
  router.get(
    '/getAllContracts',
    roleMiddleware(['getAllContracts', 'ADMIN', 'SUPERADMIN']),
    service.getAllContracts
  )
  router.post(
    '/newContract',
    roleMiddleware(['newContract', 'ADMIN', 'SUPERADMIN']),
    service.newContract
  )
  router.post(
    '/deleteContract',
    roleMiddleware(['deleteContract', 'ADMIN', 'SUPERADMIN']),
    service.deleteContract
  )
  router.delete(
    '/fullDeleteContract',
    roleMiddleware(['fullDeleteContract', 'ADMIN', 'SUPERADMIN']),
    service.fullDeleteContract
  )
  router.post(
    '/pullContractFromArchive',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'pullContractFromArchive']),
    service.pullContractFromArchive
  )
  router.post(
    '/changeContract',
    roleMiddleware(['changeContract', 'ADMIN', 'SUPERADMIN']),
    service.changeContract
  )

  apiRouter.use('/contracts', router)
}
