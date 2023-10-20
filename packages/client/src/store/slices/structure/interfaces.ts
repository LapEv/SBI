export interface Division {
  id?: string
  division?: string
  divisionName: string
  data?: string[]
}

export interface Department {
  id?: string
  department?: string
  departmentName: string
  division?: string
  divisionName?: string
  id_division?: string
}

export interface NewDivision {
  division: string
  divisionName: string
}

export interface NewDepartment {
  department: string
  departmentName: string
  division: string
  id_division: string
}

export interface StructureState {
  divisions: Division[]
  departaments: Department[]
  activeDivision: string
  activeDepartment: string
  isLoadingStructure: boolean
  error?: string
}

export interface AnswerDivision {
  data: Division[]
  type: string
}

export interface AnswerDepartment {
  data: Department[]
  type: string
}
