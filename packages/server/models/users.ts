import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface User {
  id: number
  login: string
  firstName: string
  lastName: string
  email: string
  role: string
}

export const users: ModelAttributes<Model, User> = {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  login: {
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
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
  role: {
    type: DataType.STRING,
    allowNull: false,
  },
}
