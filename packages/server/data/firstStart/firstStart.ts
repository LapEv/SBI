import { departmentStartData } from './department'
import { divisionStartData } from './division'
import { userStartData } from './user'
import { userStatusStartData } from './userStatus'
import {
  AddressesRepos,
  ClassifierEquipmentRepos,
  ClassifierModelsRepos,
  ClientsRepos,
  DepartmentRepos,
  DivisionRepos,
  IncidentRepos,
  IncidentStatusesRepos,
  OLARepos,
  ObjectsRepos,
  RegionsRepos,
  SLARepos,
  TypesOfWorkRepos,
  TypicalMalfunctionsRepos,
  UserStatusRepos,
  roleGroupRepos,
  roleRepos,
  sequelize,
  userRepos,
} from '../../db'
import bcrypt from 'bcryptjs'
import { rolesStartData } from './role'
import { rolesGroupStartData } from './rolesGroup'
import { addressesStartData, regionsStartData } from './addresses'
import {
  equipmentsStartData,
  modelsStartData,
  typ_malfunctionsStartData,
} from './classifier'
import { slaStartData } from './sla'
import { clientsStartData } from './clients'
import { objectsStartData } from './objects'
import { incStatusesStartData, typesOfWorkStartData } from './incident'

export const firstStart = async () => {
  try {
    const AllDelete = false
    if (AllDelete) {
      console.log('Full Delete!')
      await sequelize.drop({ cascade: true })
      return
    }

    console.log('Check for tables!')
    const roles = await roleRepos.getAll()
    const rolesGroup = await roleGroupRepos.getAll()
    const divisions = await DivisionRepos.getAll()
    const department = await DivisionRepos.getAll()
    const users = await userRepos.getAll()
    const regions = await RegionsRepos.getAll()
    const addresses = await AddressesRepos.getAll()
    const equipments = await ClassifierEquipmentRepos.getAll()
    const models = await ClassifierModelsRepos.getAll()
    const typ_malfunctions = await TypicalMalfunctionsRepos.getAll()
    const sla = await SLARepos.getAll()
    const ola = await OLARepos.getAll()
    const clients = await ClientsRepos.getAll()
    const incs = await IncidentRepos.getAll()
    const incStatuses = await IncidentStatusesRepos.getAll()
    const typesOfWork = await TypesOfWorkRepos.getAll()

    console.log('End Check for tables!')
    const deleteClients = false
    if (deleteClients) {
      console.log('Delete Clients')
      await ClientsRepos.drop({ cascade: true })
    } else {
      console.log('Check Clients')
      if (clients.length) {
        console.log(
          'Первый запуск таблиц Clients невозможен! Какая-то из таблиц уже существует!'
        )
      } else {
        console.log('Create Clients')
        await ClientsRepos.bulkCreate(clientsStartData)
      }
    }

    const deleteAddress = false
    if (deleteAddress) {
      console.log('Delete Addresses')
      await AddressesRepos.drop({ cascade: true })
      await RegionsRepos.drop({ cascade: true })
      await ObjectsRepos.drop({ cascade: true })
    } else {
      console.log('Check Addresses')
      if (addresses.length || regions.length) {
        console.log(
          'Первый запуск таблиц Address и Regions невозможен! Какая-то из таблиц уже существует!'
        )
      } else {
        console.log('Create Addresses')
        if (!regions.length) {
          const newRegions = await RegionsRepos.bulkCreate(regionsStartData)
          const newAddressesData = addressesStartData.map(value => {
            return { ...value, id_region: newRegions[0].id }
          })
          if (!addresses.length) {
            const newAddresses = await AddressesRepos.bulkCreate(
              newAddressesData
            )
            const newClients = await ClientsRepos.getAll()
            const objectdata = objectsStartData.map((value, index) => {
              return {
                ...value,
                id_region: newRegions[0].id,
                id_address: newAddresses[index].id,
                id_client: newClients[0].id,
              }
            })
            await ObjectsRepos.bulkCreate(objectdata)
          }
        }
      }
    }

    const deleteINC = false
    if (deleteINC) {
      console.log('Delete INC')
      await IncidentRepos.drop({ cascade: true })
      await IncidentStatusesRepos.drop({ cascade: true })
    } else {
      console.log('Check INC')
      if (incs.length || incStatuses.length) {
        console.log(
          'Первый запуск таблиц INC, INCStatuses невозможен! Какая-то из таблиц уже существует!'
        )
      } else {
        console.log('Create INC')
        await IncidentStatusesRepos.bulkCreate(incStatusesStartData)
      }
    }
    console.log('End delete Clients!')

    const deleteSLA = false
    if (deleteSLA) {
      console.log('Delete SLA')
      await SLARepos.drop({ cascade: true })
      await OLARepos.drop({ cascade: true })
      await TypesOfWorkRepos.drop({ cascade: true })
    } else {
      console.log('Check SLA')
      if (sla.length || ola.length || typesOfWork.length) {
        console.log(
          'Первый запуск таблиц SLA, OLA, TypesOfWork невозможен! Какая-то из таблиц уже существует!'
        )
      } else {
        console.log('Create SLA')
        const typesWork = await TypesOfWorkRepos.bulkCreate(
          typesOfWorkStartData
        )
        console.log('typesWork = ', typesWork)
        const newSLA = slaStartData.map((item, index) => {
          return {
            ...item,
            id_typeOfWork: typesWork[index].id,
          }
        })
        console.log('newSLA = ', newSLA)
        // const newOLA = olaStartData.map((item, index) => {
        //   return {
        //     ...item,
        //     id_typeOfWork: index <= 0 ? typesWork[index].id : typesWork[1].id,
        //   }
        // })
        await SLARepos.bulkCreate(newSLA)
        // await OLARepos.bulkCreate(newOLA)
      }
    }

    console.log('End delete SLA!')

    const deleteClassifier = false
    if (deleteClassifier) {
      console.log('Delete Classifier')
      await ClassifierEquipmentRepos.drop({ cascade: true })
      await ClassifierModelsRepos.drop({ cascade: true })
      await TypicalMalfunctionsRepos.drop({ cascade: true })
    } else {
      if (equipments.length || models.length || typ_malfunctions.length) {
        console.log(
          'Первый запуск таблиц ClassifierEquipment, ClassifierModels и TypicalMalfunctions невозможен! Какая-то из таблиц уже существует!'
        )
      } else {
        const newEquipments = await ClassifierEquipmentRepos.bulkCreate(
          equipmentsStartData
        )
        const newModelsStartData = modelsStartData.map(value => {
          return {
            ...value,
            id_equipment: newEquipments[0].id,
          }
        })
        const newModels = await ClassifierModelsRepos.bulkCreate(
          newModelsStartData
        )
        const newModelsIDs = newModels.map(value => value.id)
        const new_typ_malfunctions_startData = typ_malfunctionsStartData.map(
          value => {
            return {
              ...value,
              id_equipment: newEquipments[0].id,
              models: newModelsIDs,
            }
          }
        )
        await TypicalMalfunctionsRepos.bulkCreate(
          new_typ_malfunctions_startData
        )
      }
    }

    const deleteRoles = false
    if (deleteRoles) {
      await roleRepos.drop({ cascade: true })
      await roleGroupRepos.drop({ cascade: true })
    } else {
      if (roles.length || rolesGroup.length) {
        console.log(
          'Первый запуск таблиц Roles, RolesGroup невозможен! Какая-то из таблиц уже существует!'
        )
      } else {
        await roleRepos.bulkCreate(rolesStartData)
        await roleGroupRepos.bulkCreate(rolesGroupStartData)
      }
    }

    const del = false
    if (del) {
      console.log('Delete Users & Divisions')
      await DepartmentRepos.drop({ cascade: true })
      await DivisionRepos.drop({ cascade: true })
      await userRepos.drop({ cascade: true })
      await UserStatusRepos.drop({ cascade: true })
      return
    }

    if (divisions.length || department.length || users.length) {
      console.log(
        'Первый запуск таблиц невозможен! Какая-то из таблиц уже существует!'
      )
    } else {
      const newDivision = await DivisionRepos.bulkCreate(divisionStartData)
      departmentStartData.map(async value => {
        value.id_division = newDivision.find(
          item => item.division === value.division
        )?.id
      })
      const newDepartment = await DepartmentRepos.bulkCreate(
        departmentStartData
      )
      await UserStatusRepos.bulkCreate(userStatusStartData)
      const newuserStartData = userStartData.map(value => {
        value.id_division = newDivision.find(
          item => item.division === value.division
        )?.id
        value.id_department = newDepartment.find(
          item => item.department === value.department
        )?.id
        const hashPassword = bcrypt.hashSync(value.password, 7)
        return {
          ...value,
          password: hashPassword,
          active: true,
          theme: 'light',
        }
      })
      await userRepos.bulkCreate(newuserStartData)
    }
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
  }
}
