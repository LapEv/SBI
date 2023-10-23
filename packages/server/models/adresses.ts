import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Addresses {
  id: string
  address: string
  coordinates: string
}

export const addresses: ModelAttributes<Model, Addresses> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  address: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  coordinates: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
}

export interface Regions {
  id: string
  region: string
}

export const regions: ModelAttributes<Model, Regions> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  region: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
}
