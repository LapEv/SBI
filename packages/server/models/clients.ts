import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Objects {
  id: string
  object: string
  internalClientId: string
  id_regions: string
  region: string
  id_address: string
  address: string
  coordinates: string
  contracts: string[]
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
  id_regions: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  region: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_address: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataType.STRING,
    allowNull: false,
  },
  coordinates: {
    type: DataType.STRING,
    allowNull: false,
  },
  contracts: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
}

export interface Clients {
  id: number
  legalName: string
  name: string
  objects: string[]
  contracts: string[]
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
  objects: {
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  },
  contracts: {
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  },
}

export interface ClientsGroup {
  id: string
  groupName: string
  clients: string[]
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
}
