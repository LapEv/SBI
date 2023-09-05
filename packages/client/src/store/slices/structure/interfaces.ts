import { Nullable } from 'utils/nullableType'

type NullableString = Nullable<string>

export interface Division {
  id?: number
  division?: NullableString
  divisionName: NullableString
}

export interface Department {
  id: number
  department: NullableString
  departmentName: NullableString
  division: NullableString
}
