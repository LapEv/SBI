import { NewDivision } from 'store/slices/structure/interfaces'

export interface StructureActions {
  getDivisions: () => void
  getDepartments: () => void
  addDivision: (data: NewDivision) => void
  addDepartments: (departament: string, division: string) => void
  deleteDivision: (divisions: string[]) => void
  // deleteDepartments: (departament: string, division: string) => void
  setActiveDivision: (division: string) => void
}
