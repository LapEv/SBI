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

    if (divisions.length || department.length || users.length) {
      console.log(
        'Первый запуск таблиц невозможен! Какая-то из таблиц уже существует!'
      )
      return
    }

    const roles = await roleRepos.getAll()
    if (!roles.length) {
      rolesStartData.map(async value => await roleRepos.create(value))
    }
    const rolesGroup = await roleGroupRepos.getAll()
    if (!rolesGroup.length) {
      rolesGroupStartData.map(async value => await roleGroupRepos.create(value))
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
