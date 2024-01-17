import React, { memo, useEffect, useState } from 'react'
import { alpha } from '@mui/material/styles'
import {
  useTheme,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
} from '@mui/material'
import { INC } from 'store/slices/incidents/interfaces'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import { INCColumn } from './data'
import { DataTable } from 'components/DataTable'
interface INCTable {
  incidents: INC[]
}

export const TableIncidents = memo(({ incidents }: INCTable) => {
  const theme = useTheme()
  const options: MUIDataTableOptions = {
    filter: true,
    // onFilterChange: (changedColumn, filterList) => {
    //   console.log(changedColumn, filterList)
    // },
    // selectableRows: 'single',
    // filterType: 'dropdown',
    rowsPerPage: 10,
    // expandableRows: true,
    filterType: 'checkbox',
    resizableColumns: true,
    setTableProps: () => {
      return {
        padding: 'none', // 'default
        size: 'small', // medium
      }
    },
  }
  return (
    <DataTable
      title={'Инциденты'}
      data={incidents}
      columns={INCColumn}
      options={options}
    />
  )
})
