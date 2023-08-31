import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface RolesGroup {
  id: number
  group: string
  roles: string
}

export const rolesGroup: ModelAttributes<Model, RolesGroup> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  group: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  roles: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  },
}

export interface Roles {
  id: number
  role: string
  nameRole: string
}

export const roles: ModelAttributes<Model, Roles> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  nameRole: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
}
