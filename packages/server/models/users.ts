import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface User {
  id: number
  username: string
  password: string
  firstName: string
  lastName: string
  middleName: string
  email: string
  phone?: string
  roleGroup: string
  roles: string
  post?: string
  avatar?: string
  active: boolean
  theme: string
  division: string
  chiefDivision: boolean
  department: string
  chiefDepartment: boolean
  id_division: string
  id_department: string
  status: string
}

export const users: ModelAttributes<Model, User> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataType.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataType.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataType.STRING,
    allowNull: false,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
  phone: {
    type: DataType.STRING,
    allowNull: false,
  },
  roleGroup: {
    type: DataType.STRING,
    allowNull: false,
  },
  roles: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
  },
  post: {
    type: DataType.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataType.STRING,
    allowNull: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  theme: {
    type: DataType.STRING,
    allowNull: false,
  },
  division: {
    type: DataType.STRING,
    allowNull: false,
  },
  chiefDivision: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  id_division: {
    type: DataType.STRING,
    allowNull: false,
  },
  department: {
    type: DataType.STRING,
    allowNull: false,
  },
  chiefDepartment: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  id_department: {
    type: DataType.STRING,
    allowNull: false,
  },
  status: {
    type: DataType.STRING,
    allowNull: false,
  },
}
