import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface ClassifierEquipment {
  id: string
  equipment: string
  models: object[]
  active: boolean
}

export const classifierEquipment: ModelAttributes<Model, ClassifierEquipment> =
  {
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
    active: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
  }

export interface ClassifierModels {
  id: string
  model: string
  typicalMalfunctions: object[]
  active: boolean
}

export const classifierModels: ModelAttributes<Model, ClassifierModels> = {
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
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface TypicalMalfunctions {
  id: string
  typicalMalfunction: string
  active: boolean
}

export const typicalMalfunctions: ModelAttributes<Model, TypicalMalfunctions> =
  {
    id: {
      type: DataType.STRING,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    typicalMalfunction: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
  }
