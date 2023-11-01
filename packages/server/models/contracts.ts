import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Contracts {
  id: string
  contract: object
  sla: object
  equipment: object[]
  objects: object[]
}

export const contracts: ModelAttributes<Model, Contracts> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  contract: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  sla: {
    type: DataType.JSONB,
    allowNull: false,
  },
  equipment: {
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  },
  objects: {
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  },
}

export interface SLA {
  id: string
  sla: string
  time: string
}

export const sla: ModelAttributes<Model, SLA> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  sla: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  time: {
    type: DataType.STRING,
    allowNull: false,
  },
}

export interface Objects {
  id: string
  object: string
  internalClientId: string
}

export const objects: ModelAttributes<Model, Objects> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  object: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  internalClientId: {
    type: DataType.STRING,
    allowNull: false,
  },
}
