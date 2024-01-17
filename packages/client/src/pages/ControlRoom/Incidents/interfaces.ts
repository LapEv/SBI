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
  options: {
    filter: boolean
    sort: boolean
  }
}
