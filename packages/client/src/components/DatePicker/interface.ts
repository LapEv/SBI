import { Dayjs } from 'dayjs'

export interface IDateField {
  dateValue: string
  setDateValue: (text: string) => void
  sx?: any
}

export interface IDateTimeField {
  dateValue: Dayjs
  setDateValue: (text: Dayjs) => void
  sx?: any
}
