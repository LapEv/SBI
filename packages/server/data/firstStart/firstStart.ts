import { departmentStartData } from './department'
import { divisionStartData } from './division'
import { userStartData } from './user'
import {
  DepartmentRepos,
  DivisionRepos,
  roleGroupRepos,
  roleRepos,
  userRepos,
} from '../../db'
import bcrypt from 'bcryptjs'
import { rolesStartData } from './role'
import { rolesGroupStartData } from './rolesGroup'

export const firstStart = async () => {
  try {
    const divisions = await DivisionRepos.getAll()
    const department = await DivisionRepos.getAll()
    const users = await userRepos.getAll()

    const del = false
    if (del) {
      await DepartmentRepos.drop({ cascade: true })
      await DivisionRepos.drop({ cascade: true })
      await userRepos.drop({ cascade: true })
      await roleRepos.drop({ cascade: true })
      await roleGroupRepos.drop({ cascade: true })
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
      console.log('newrolesObj = ', newrolesObj)
      rolesGroupStartData.map(value => (value.roles = newrolesObj as never[]))
      console.log('rolesGroupStartData = ', rolesGroupStartData)
      const rolesGroupStartData2 = await Promise.all(
        rolesGroupStartData.map(async value => {
          console.log('value = ', value), await roleGroupRepos.create(value)
        })
      )
      console.log('rolesGroupStartData 2 = ', rolesGroupStartData2)
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
