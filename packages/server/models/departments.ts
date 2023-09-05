import type { ModelAttributes } from 'sequelize'
import { DataType, Model } from 'sequelize-typescript'

export interface Department {
  id: number
  department: string
  departmentName: string
  division: string
}

export const department: ModelAttributes<Model, Department> = {
  id: {
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  department: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  departmentName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  division: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
}
