import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Roles {
  id: number
  role: string
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
}
