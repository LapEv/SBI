import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Equipment {
  id: string
  equipment: string
  models: object[]
}

export const equipment: ModelAttributes<Model, Equipment> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  equipment: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  models: {
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  },
}

export interface Models {
  id: string
  model: string
  typicalMalfunctions: object[]
}

export const models: ModelAttributes<Model, Models> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  model: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  typicalMalfunctions: {
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  },
}

export interface TypicalMalfunctions {
  id: string
  typicalMalfunctions: string
}

export const typicalMalfunctions: ModelAttributes<Model, TypicalMalfunctions> =
  {
    id: {
      type: DataType.STRING,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    typicalMalfunctions: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
  }
