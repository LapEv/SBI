import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Clients {
  id: number
  legalName: string
  name: string
  contracts: string[]
  active: boolean
}

export const clients: ModelAttributes<Model, Clients> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  legalName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  contracts: {
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface ClientsGroup {
  id: string
  groupName: string
  clients: string[]
  active: boolean
}

export const clientsGroup: ModelAttributes<Model, ClientsGroup> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  groupName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  clients: {
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}
