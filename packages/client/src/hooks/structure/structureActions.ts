import { NewDepartment, NewDivision } from 'store/slices/structure/interfaces'

export interface StructureActions {
  getDivisions: () => void
  getDepartments: () => void
  addDivision: (data: NewDivision) => void
  addDepartments: (data: NewDepartment) => void
  deleteDivision: (divisions: string[]) => void
  deleteDepartment: (departaments: string[]) => void
  setActiveDivision: (division: string) => void
}
