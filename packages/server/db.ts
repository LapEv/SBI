import { ModelCtor, Sequelize, SequelizeOptions } from 'sequelize-typescript'
import bcrypt from 'bcryptjs'
import { Repository } from './types/Repository'
import {
  roles,
  rolesGroup,
  division,
  department,
  users,
} from './models/index.models'
import {
  userStartData,
  divisionStartData,
  departmentStartData,
  rolesStartData,
  rolesGroupStartData,
} from './data/startData/index.startData'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost', //SBI-postgresql-для докера localhost - для npm run dev:ssr
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

export const Roles = sequelize.define('Roles', roles, {})
export const RolesGroup = sequelize.define('RolesGroup', rolesGroup, {})
export const Division = sequelize.define('Division', division, {})
export const Department = sequelize.define('Department', department, {})
export const Users = sequelize.define('Users', users, {})

Roles.hasMany(RolesGroup)
RolesGroup.belongsTo(Roles)

RolesGroup.hasMany(Users)
Users.belongsTo(RolesGroup)

export const userRepos = new Repository(Users as ModelCtor)
export const roleGroupRepos = new Repository(RolesGroup as ModelCtor)
export const roleRepos = new Repository(Roles as ModelCtor)
export const DivisionRepos = new Repository(Division as ModelCtor)
export const DepartmentRepos = new Repository(Department as ModelCtor)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully!')

    const roles = await roleRepos.getAll()
    if (!roles.length) {
      rolesStartData.map(async value => await roleRepos.create(value))
    }
    const rolesGroup = await roleGroupRepos.getAll()
    if (!rolesGroup.length) {
      rolesGroupStartData.map(async value => await roleGroupRepos.create(value))
    }
    const divisions = await DivisionRepos.getAll()
    if (!divisions.length) {
      divisionStartData.map(async value => await DivisionRepos.create(value))
    }
    const departments = await DepartmentRepos.getAll()
    if (!departments.length) {
      departmentStartData.map(
        async value => await DepartmentRepos.create(value)
      )
    }
    const users = await userRepos.getAll()
    if (!users.length) {
      userStartData.map(async value => {
        const hashPassword = bcrypt.hashSync(value.password, 7)
        const newUser = {
          ...value,
          password: hashPassword,
          active: true,
          theme: 'light',
        }
        await userRepos.create(newUser)
      })
    }
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
  }
}
