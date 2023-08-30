import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface User {
  id: number
  username: string
  password: string
  firstName: string
  lastName: string
  email: string
  role: string
  post?: string
  avatar?: string
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
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
  role: {
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
}
