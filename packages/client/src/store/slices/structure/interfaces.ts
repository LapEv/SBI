import { Nullable } from 'utils/nullableType'

type NullableString = Nullable<string>

export interface Division {
  id?: string
  division?: NullableString
  divisionName: NullableString
  data?: string[]
}

export interface Department {
  id?: string
  department?: NullableString
  departmentName: NullableString
  division?: NullableString
  divisionName?: NullableString
  id_division?: NullableString
}
