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
