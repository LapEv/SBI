export interface DataDropDown {
  data: Options[]
  value?: string
  props?: object
  label: string
  errorLabel: string
  onChange?: (value: Options) => void
  onBlur?: (value: string) => void
  error?: boolean
}

export interface DataDropDownMultiple {
  data: Options[]
  value?: Options[]
  props?: object
  label: string
  errorLabel: string
  onChange?: (data: Options[]) => void
  onBlur?: (value: string) => void
  error?: boolean
}

export interface Data {
  category: string
  categoryName: string
  id: string
}

export interface Options {
  label: string
  id: string
  description?: string
  descriptionID?: string
}
