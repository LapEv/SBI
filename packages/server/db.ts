import { ModelCtor, Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Repository } from './types/Repository'
import {
  roles,
  rolesGroup,
  division,
  department,
  users,
  userStatus,
} from './models/index.models'
import { firstStart } from './data/firstStart/index.startData'
import { addresses, regions } from './models/adresses'

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
export const UserStatus = sequelize.define('UserStatus', userStatus, {})

export const Addresses = sequelize.define('Addresses', addresses, {})
export const Regions = sequelize.define('Regions', regions, {})

RolesGroup.belongsToMany(Roles, { through: 'RoleGroup' })
Roles.belongsToMany(RolesGroup, { through: 'RoleGroup' })

Users.belongsToMany(RolesGroup, { through: 'UserRoleGroup' })
RolesGroup.belongsToMany(Users, { through: 'UserRoleGroup' })

Users.belongsToMany(Roles, { through: 'UserRole' })
Roles.belongsToMany(Users, { through: 'UserRole' })

Division.hasMany(Users, { foreignKey: 'id_division' })
Users.belongsTo(Division, { foreignKey: 'id_division', targetKey: 'id' })

Department.hasMany(Users, { foreignKey: 'id_department' })
Users.belongsTo(Department, { foreignKey: 'id_department', targetKey: 'id' })

Division.hasMany(Department, { foreignKey: 'id_division' })
Department.belongsTo(Division, { foreignKey: 'id_division', targetKey: 'id' })

Regions.hasMany(Addresses, { foreignKey: 'id_region' })
Addresses.belongsTo(Regions, { foreignKey: 'id_region', targetKey: 'id' })

export const userRepos = new Repository(Users as ModelCtor)
export const roleGroupRepos = new Repository(RolesGroup as ModelCtor)
export const roleRepos = new Repository(Roles as ModelCtor)
export const DivisionRepos = new Repository(Division as ModelCtor)
export const DepartmentRepos = new Repository(Department as ModelCtor)
export const UserStatusRepos = new Repository(UserStatus as ModelCtor)
export const RegionsRepos = new Repository(Regions as ModelCtor)
export const AddressesRepos = new Repository(Addresses as ModelCtor)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully!')
    await firstStart()
  } catch (error) {
    console.error('Unable to connect to the database: ', error)
  }
}
