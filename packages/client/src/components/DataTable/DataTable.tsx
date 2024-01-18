import { styled } from '@mui/material'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'

import { ThemeMode } from '../../themes/themeConfig'
import { IDataTable } from './interface'

const StyledDataTable = styled(MUIDataTable)(({ theme }) => ({
  '&.MuiPaper-root': {
    width: '98%',
    marginTop: 10,
    borderColor: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 8,
  },
  '.MuiToolbar-root': {
    backgroundColor:
      theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
    color: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  '.MuiTableCell-root': {
    backgroundColor:
      theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
    color: theme.palette.mode === ThemeMode.light ? '#000000' : '#FFFFFF',
  },
  '.MuiTable-root': {
    borderRadius: 8,
  },
  '.MuiTableFooter-root': {
    borderRadius: 8,
  },
  '.MuiTableCell-footer': {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  '.MuiTableHead-root': {
    fontWeight: 'bold',
    height: 20,
    minHeight: 20,
    maxHeight: 20,
  },
}))

export const DataTable = ({ title, data, options, columns }: IDataTable) => {
  return (
    <StyledDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  )
}
