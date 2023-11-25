import { ChangeEvent, FocusEvent } from 'react'
import { User } from 'storeAuth/interfaces'
type stringOrNull = string | null
export interface ProfileValidateFieldsProps {
  label: string
  name: string
  value: object | stringOrNull
  disabled: boolean
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleInputBlur: (e: FocusEvent<HTMLInputElement>) => void
  error: boolean
  errorText: string
}

export interface ProfileValues extends User {
  list: {
    name: string
    label: string
    value: string | string[] | undefined
    validation: object
    disabled: boolean
    type: string
    required: boolean
  }[]
}

export interface ProfileChangePasswordProps {
  handleModal: (state: boolean) => void
  userId: string
}

export interface ProfileChangePasswordValues {
  list: {
    label: string
    value: string
    validation: object
    type: string
    required: boolean
  }[]
}
