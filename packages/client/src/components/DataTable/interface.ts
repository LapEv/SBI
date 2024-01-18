import { MUIDataTableOptions } from 'mui-datatables'

export interface IDataTable {
  title: string
  data: any[]
  columns: Column[]
  options: MUIDataTableOptions
}

interface Column {
  name: string
  label: string
  options: {
    filter: boolean
    sort: boolean
  }
}
