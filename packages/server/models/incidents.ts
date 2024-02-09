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
  description: string
  comment: string
  commentCloseCheck: string
  commentClose: string
  report: string
  spaceParts: string[]
  act: string[]
  active: boolean
  methodsReuqest: string
  rating: number
  parentalIncident: string
  relatedIncident: string
  applicant: string
  applicantContacts: string
  overdue: boolean
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
    type: DataType.DATE,
    allowNull: true,
  },
  timeInWork: {
    type: DataType.DATE,
    allowNull: true,
  },
  timeSLA: {
    type: DataType.STRING,
    allowNull: false,
  },
  timeCloseCheck: {
    type: DataType.DATE,
    allowNull: true,
  },
  timeClose: {
    type: DataType.DATE,
    allowNull: true,
  },
  description: {
    type: DataType.STRING(1024),
    allowNull: true,
  },
  comment: {
    type: DataType.STRING(1024),
    allowNull: true,
  },
  commentCloseCheck: {
    type: DataType.STRING(1024),
    allowNull: true,
  },
  commentClose: {
    type: DataType.STRING(1024),
    allowNull: true,
  },
  report: {
    type: DataType.STRING(1024),
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
  rating: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  parentalIncident: {
    type: DataType.STRING,
    allowNull: true,
  },
  relatedIncident: {
    type: DataType.STRING,
    allowNull: true,
  },
  applicant: {
    type: DataType.STRING,
    allowNull: true,
  },
  applicantContacts: {
    type: DataType.STRING,
    allowNull: true,
  },
  overdue: {
    type: DataType.BOOLEAN,
    allowNull: false,
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

export interface IncidentLogs {
  id: string
  time: string
  log: string
}

export const incidentLogs: ModelAttributes<Model, IncidentLogs> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  time: {
    type: DataType.DATE,
    allowNull: false,
  },
  log: {
    type: DataType.STRING,
    allowNull: false,
  },
  // кто
}
