import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface RolesGroup {
  id: string
  group: string
  roles: object[]
  groupName: string
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
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  },
  groupName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
}

export interface Roles {
  id: string
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
