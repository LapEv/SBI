import React, { memo, useEffect, useState } from 'react'
import { alpha } from '@mui/material/styles'
import {
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
import MUIDataTable from 'mui-datatables'
import { INCColumn } from './data'
interface INCTable {
  incidents: INC[]
}

export const TableIncidents = memo(({ incidents }: INCTable) => {
  const options = {
    filterType: 'checkbox',
  }
  return (
    <MUIDataTable
      title={'Инциденты'}
      data={incidents}
      columns={INCColumn}
      options={options}
    />
  )
})
