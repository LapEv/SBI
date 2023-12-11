export interface ISelect {
  defaultData: string
  label: string
  data: string[]
  props: any
  onChange: (data: string) => void
  value?: string
}
