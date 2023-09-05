import { Nullable } from 'utils/nullableType'

type NullableString = Nullable<string>

export interface Division {
  id?: string
  division?: NullableString
  divisionName: NullableString
}

export interface Department {
  id?: string
  department?: NullableString
  departmentName: NullableString
  division?: NullableString
  DivisionId?: NullableString
}
