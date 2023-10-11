import { NewDepartment, NewDivision } from 'store/slices/structure/interfaces'

export interface StructureActions {
  getDivisions: () => void
  getDepartments: () => void
  addDivision: (data: NewDivision) => void
  addDepartments: (data: NewDepartment) => void
  deleteDivision: (divisions: string[]) => void
  // deleteDepartments: (departament: string, division: string) => void
  setActiveDivision: (division: string) => void
}
