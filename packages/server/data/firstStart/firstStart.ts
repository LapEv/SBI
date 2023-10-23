import { departmentStartData } from './department'
import { divisionStartData } from './division'
import { userStartData } from './user'
import { userStatusStartData } from './userStatus'
import {
  AddressesRepos,
  DepartmentRepos,
  DivisionRepos,
  RegionsRepos,
  UserStatusRepos,
  roleGroupRepos,
  roleRepos,
  userRepos,
} from '../../db'
import bcrypt from 'bcryptjs'
import { rolesStartData } from './role'
import { rolesGroupStartData } from './rolesGroup'
import { addressesStartData, regionsStartData } from './addresses'

export const firstStart = async () => {
  try {
    const divisions = await DivisionRepos.getAll()
    const department = await DivisionRepos.getAll()
    const users = await userRepos.getAll()
    const regions = await RegionsRepos.getAll()
    const addresses = await AddressesRepos.getAll()

    console.log('regions = ', regions)

    if (!regions.length) {
      const newRegions = await Promise.all(
        regionsStartData.map(async value => await RegionsRepos.create(value))
      )
      console.log('newRegions = ', newRegions)
    }
    if (!addresses.length) {
      const newAddress = await Promise.all(
        addressesStartData.map(
          async value => await AddressesRepos.create(value)
        )
      )
      console.log('newAddress = ', newAddress)
    }

    const del = false
    if (del) {
      await DepartmentRepos.drop({ cascade: true })
      await DivisionRepos.drop({ cascade: true })
      await userRepos.drop({ cascade: true })
      await roleRepos.drop({ cascade: true })
      await roleGroupRepos.drop({ cascade: true })
      await UserStatusRepos.drop({ cascade: true })
      return
    }

    if (divisions.length || department.length || users.length) {
      console.log(
        'Первый запуск таблиц невозможен! Какая-то из таблиц уже существует!'
      )
      return
    }

    const roles = await roleRepos.getAll()
    if (!roles.length) {
      const newRoles = await Promise.all(
        rolesStartData.map(async value => await roleRepos.create(value))
      )
      const newrolesObj = newRoles.map(({ id, nameRole, role }) => {
        return { id, nameRole, role }
      })
      rolesGroupStartData.map(value => {
        if (value.group === 'SUPERADMIN') {
          value.roles = newrolesObj.filter(
            item => item.role === 'SUPERADMIN'
          ) as never[]
        }
        if (value.group === 'ADMIN') {
          value.roles = newrolesObj.filter(
            item => item.role === 'ADMIN'
          ) as never[]
        }
        // if (value.group !== 'SUPERADMIN' && value.group !== 'ADMIN') {
        //   value.roles = newrolesObj.filter(
        //     item => item.role !== 'SUPERADMIN' && item.role !== 'ADMIN'
        //   ) as never[]
        // }
      })
      await Promise.all(
        rolesGroupStartData.map(
          async value => await roleGroupRepos.create(value)
        )
      )
    }

    const newDivision = await Promise.all(
      divisionStartData.map(async value => await DivisionRepos.create(value))
    )
    departmentStartData.map(async value => {
      value.id_division = newDivision.find(
        item => item.division === value.division
      )?.id
    })
    const newDepartment = await Promise.all(
      departmentStartData.map(
        async value => await DepartmentRepos.create(value)
      )
    )
    await Promise.all(
      userStatusStartData.map(
        async value => await UserStatusRepos.create(value)
      )
    )
    userStartData.map(async value => {
      value.id_division = newDivision.find(
        item => item.division === value.division
      )?.id
      value.id_department = newDepartment.find(
        item => item.department === value.department
      )?.id
      const hashPassword = bcrypt.hashSync(value.password, 7)
      const newUser = {
        ...value,
        password: hashPassword,
        active: true,
        theme: 'light',
      }
      await userRepos.create(newUser)
    })
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
  }
}
