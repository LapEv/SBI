import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Incindent {
  id: string
  numberINC: number
  incident: string
  clientINC: string
  timeRegistration: string
  timeInWork: string
  timeSLA: string
  timeCloseCheck: string
  timeClose: string
  responsible: string
  responsibleDepartment: string
  responsibleClosing: string
  executor: string
  description: string
  comment: string
  report: string
  spaceParts: string[]
  act: string[]
  active: boolean
  methodsReuqest: string
  actionsComments: string
  rating: number
  parentalIncident: string
  relatedIncident: string
}

export const incident: ModelAttributes<Model, Incindent> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  numberINC: {
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  },
  incident: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  clientINC: {
    type: DataType.STRING,
    allowNull: true,
  },
  timeRegistration: {
    type: DataType.TIME,
    allowNull: true,
  },
  timeInWork: {
    type: DataType.TIME,
    allowNull: true,
  },
  timeSLA: {
    type: DataType.TIME,
    allowNull: true,
  },
  timeCloseCheck: {
    type: DataType.TIME,
    allowNull: true,
  },
  timeClose: {
    type: DataType.TIME,
    allowNull: true,
  },
  responsible: {
    type: DataType.STRING,
    allowNull: false,
  },
  responsibleDepartment: {
    type: DataType.STRING,
    allowNull: true,
  },
  responsibleClosing: {
    type: DataType.STRING,
    allowNull: true,
  },
  executor: {
    type: DataType.STRING,
    allowNull: true,
  },
  description: {
    type: DataType.STRING,
    allowNull: true,
  },
  comment: {
    type: DataType.STRING,
    allowNull: true,
  },
  report: {
    type: DataType.STRING,
    allowNull: true,
  },
  spaceParts: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  },
  act: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
  methodsReuqest: {
    type: DataType.STRING,
    allowNull: false,
  },
  actionsComments: {
    type: DataType.STRING,
    allowNull: false,
  },
  rating: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  parentalIncident: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  relatedIncident: {
    type: DataType.INTEGER,
    allowNull: true,
  },
}

export interface IncindentStatuses {
  id: string
  statusINC: string
  active: boolean
}

export const incindentStatuses: ModelAttributes<Model, IncindentStatuses> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  statusINC: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}

export interface TypesOfWork {
  id: string
  typeOfWork: string
  active: boolean
}

export const typesOfWork: ModelAttributes<Model, TypesOfWork> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  typeOfWork: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}
