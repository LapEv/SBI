import { INC } from 'store/slices/incidents/interfaces'

export type Order = 'asc' | 'desc'

export interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof INC) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

export interface EnhancedTableToolbarProps {
  numSelected: number
}

export interface INC_Column {
  name: string
  label: string
  index?: number
  options: {
    filter: boolean
    filterList?: string[]
    sort: boolean
    hint?: any
    setCellProps?: any
    customBodyRender?: any
    customHeadRender?: any
    customHeadLabelRender?: any
    setCellHeaderProps?: any
    display?: boolean
    viewColumns?: boolean
    draggable?: boolean
  }
}

export interface IExecutor {
  value: string
  id: string
  incident: string
  responsible: string
}

export interface IStatus {
  value: string
  id: string
  incident: string
  responsible: string
  currentStatus: string
}

export interface ICustomCell {
  value: string
  denseTable: boolean
}

export interface IIndicatorCell {
  timeSLA: string
  timeReg: string
}

export interface ICustomHeaderCell {
  label: string
}

export interface ITableMeta {
  rowData: string[]
}
