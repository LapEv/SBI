import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Contracts {
  id: string
  contract: string
  number: string
  date: string
  active: boolean
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
  number: {
    type: DataType.STRING,
    allowNull: false,
  },
  date: {
    type: DataType.DATE,
    allowNull: false,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface IThroughContractsSLA {
  id: string
  id_contract: string
  id_sla: string
}

export const throughContractsSLA: ModelAttributes<Model, IThroughContractsSLA> =
  {
    id: {
      type: DataType.STRING,
      defaultValue: DataType.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    id_contract: {
      type: DataType.STRING,
      allowNull: false,
    },
    id_sla: {
      type: DataType.STRING,
      allowNull: false,
    },
  }

export interface IThroughContractsEquipments {
  id: string
  id_contract: string
  id_equipment: string
}

export const throughContractsEquipments: ModelAttributes<
  Model,
  IThroughContractsEquipments
> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_contract: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_equipment: {
    type: DataType.STRING,
    allowNull: false,
  },
}

export interface IThroughContractsModels {
  id: string
  id_contract: string
  id_model: string
}

export const throughContractsModels: ModelAttributes<
  Model,
  IThroughContractsModels
> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_contract: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_model: {
    type: DataType.STRING,
    allowNull: false,
  },
}

export interface IThroughContractsObjects {
  id: string
  id_contract: string
  id_object: string
}

export const throughContractsObjects: ModelAttributes<
  Model,
  IThroughContractsObjects
> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_contract: {
    type: DataType.STRING,
    allowNull: false,
  },
  id_object: {
    type: DataType.STRING,
    allowNull: false,
  },
}
