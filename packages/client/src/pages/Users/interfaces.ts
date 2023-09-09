import { User } from 'storeAuth/interfaces'
import { Nullable } from 'utils/nullableType'

type NullableString = Nullable<string>

export interface ProfileValues extends User {
  list: {
    name: string
    label: string
    value: NullableString | string[] | undefined
    validation: object
    disabled: boolean
    type: string
  }[]
}

export interface DPR extends User {
  departmentName: string
}
