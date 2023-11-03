import { Router } from 'express'
import { classifierService } from '../services/classifierService'
const roleMiddleware = require('../middleware/roleMiddleware')

export const classifierRouter = (apiRouter: Router) => {
  const service = new classifierService()

  const router: Router = Router()

  router.get(
    '/getClassifierEquipments',
    roleMiddleware(['getClassifierEquipments', 'ADMIN', 'SUPERADMIN']),
    service.getClassifierEquipments
  )
  router.get(
    '/getAllClassifierEquipments',
    roleMiddleware(['getAllClassifierEquipments', 'ADMIN', 'SUPERADMIN']),
    service.getAllClassifierEquipments
  )
  router.post(
    '/newClassifierEquipment',
    roleMiddleware(['newClassifierEquipment', 'ADMIN', 'SUPERADMIN']),
    service.newClassifierEquipment
  )
  router.post(
    '/deleteClassifierEquipment',
    roleMiddleware(['deleteClassifierEquipment', 'ADMIN', 'SUPERADMIN']),
    service.deleteClassifierEquipment
  )
  router.delete(
    '/fullDeleteClassifierEquipment',
    roleMiddleware(['fullDeleteClassifierEquipment', 'ADMIN', 'SUPERADMIN']),
    service.fullDeleteClassifierEquipment
  )
  router.post(
    '/pullClassifierEquipmentFromArchive',
    roleMiddleware([
      'ADMIN',
      'SUPERADMIN',
      'pullClassifierEquipmentFromArchive',
    ]),
    service.pullClassifierEquipmentFromArchive
  )
  router.post(
    '/changeClassifierEquipment',
    roleMiddleware(['changeClassifierEquipment', 'ADMIN', 'SUPERADMIN']),
    service.changeClassifierEquipment
  )
  router.get(
    '/getClassifierModels',
    roleMiddleware(['getClassifierModels', 'ADMIN', 'SUPERADMIN']),
    service.getClassifierModels
  )
  router.post(
    '/getClassifierModelsById',
    roleMiddleware(['getClassifierModelsById', 'ADMIN', 'SUPERADMIN']),
    service.getClassifierModelsById
  )
  router.get(
    '/getAllClassifierModels',
    roleMiddleware(['getAllClassifierModels', 'ADMIN', 'SUPERADMIN']),
    service.getAllClassifierModels
  )
  router.post(
    '/newClassifierModel',
    roleMiddleware(['newClassifierModel', 'ADMIN', 'SUPERADMIN']),
    service.newClassifierModel
  )
  router.post(
    '/deleteClassifierModel',
    roleMiddleware(['deleteClassifierModel', 'ADMIN', 'SUPERADMIN']),
    service.deleteClassifierModel
  )
  router.delete(
    '/fullDeleteClassifierModel',
    roleMiddleware(['fullDeleteClassifierModel', 'ADMIN', 'SUPERADMIN']),
    service.fullDeleteClassifierModel
  )
  router.post(
    '/pullClassifierModelFromArchive',
    roleMiddleware(['ADMIN', 'SUPERADMIN', 'pullClassifierModelFromArchive']),
    service.pullClassifierModelFromArchive
  )
  router.post(
    '/changeClassifierModel',
    roleMiddleware(['changeClassifierModel', 'ADMIN', 'SUPERADMIN']),
    service.changeClassifierModel
  )
  router.get(
    '/getTypicalMalfunctions',
    roleMiddleware(['getTypicalMalfunctions', 'ADMIN', 'SUPERADMIN']),
    service.getTypicalMalfunctions
  )
  router.get(
    '/getAllTypicalMalfunctions',
    roleMiddleware(['getAllTypicalMalfunctions', 'ADMIN', 'SUPERADMIN']),
    service.getAllTypicalMalfunctions
  )
  router.post(
    '/getTypicalMalfunctionsById',
    roleMiddleware(['getTypicalMalfunctionsById', 'ADMIN', 'SUPERADMIN']),
    service.getTypicalMalfunctionsById
  )
  router.post(
    '/newTypicalMalfunction',
    roleMiddleware(['newTypicalMalfunction', 'ADMIN', 'SUPERADMIN']),
    service.newTypicalMalfunction
  )
  router.post(
    '/deleteTypicalMalfunction',
    roleMiddleware(['deleteTypicalMalfunction', 'ADMIN', 'SUPERADMIN']),
    service.deleteTypicalMalfunction
  )
  router.delete(
    '/fullDeleteTypicalMalfunction',
    roleMiddleware(['fullDeleteTypicalMalfunction', 'ADMIN', 'SUPERADMIN']),
    service.fullDeleteTypicalMalfunction
  )
  router.post(
    '/pullTypicalMalfunctionFromArchive',
    roleMiddleware([
      'ADMIN',
      'SUPERADMIN',
      'pullTypicalMalfunctionFromArchive',
    ]),
    service.pullTypicalMalfunctionFromArchive
  )
  router.post(
    '/changeTypicalMalfunction',
    roleMiddleware(['changeTypicalMalfunction', 'ADMIN', 'SUPERADMIN']),
    service.changeTypicalMalfunction
  )

  apiRouter.use('/classifier', router)
}
