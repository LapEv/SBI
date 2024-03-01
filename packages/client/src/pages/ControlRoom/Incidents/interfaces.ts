import { Options } from 'components/DropDown/interface'
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
    filterOptions?: any
    onFilterChange?: any
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
  timeSLA: string
}

export interface IStatusTemp {
  id: string
  incident: string
  timeSLA: string
  data: Options
  id_incStatus: string
  status: string
  userID: string
  typeCompletedWork: Options
  commentCloseCheck: string
  spaceParts: string[]
}

export interface IModal {
  status: boolean
  data: Options
}

export interface ICustomCell {
  value: string
  denseTable: boolean
}

export interface ISpacePart {
  value: string[]
  denseTable: boolean
}

export interface IIndicatorCell {
  timeSLA: string
  timeReg: string
  timeCloseCheck: string
  status?: string
  inc?: string
}

export interface AnswerIndicatorData {
  percent: number
  value: number
  indicator: string
}

export interface ICustomHeaderCell {
  label: string
}

export interface ITableMeta {
  rowData: string[]
}
