import { SelectChangeEvent } from '@mui/material/Select'

interface Options {
  label: string
  id: string
}

export interface ISelect {
  defaultData: string
  label: string
  data: Options[]
  props: any
  onChange: (data: Options) => void
  value?: string
}
