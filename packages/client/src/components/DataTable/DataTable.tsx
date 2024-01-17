import { styled } from '@mui/material'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'

import { ThemeMode } from '../../themes/themeConfig'

export const DataTable = styled(MUIDataTable)(({ theme }) => ({
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
    height: 20,

    // borderColor: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
    // borderWidth: 1,
    // borderStyle: 'solid',
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
  // '.MUIDataTable-root': {
  //   backgroundColor:
  //     theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
  //   color: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
  // },
  // '.MUIDataTableHeadCell-sortActive': {
  //   fontSize: 'bold',
  //   backgroundColor:
  //     theme.palette.mode === ThemeMode.light ? '#000000' : '#FFFFFF',
  // },
  // '.tss-14rrrq1-MUIDataTableResize-resizer': {
  //   // borderColor: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
  //   // borderWidth: 1,
  //   // borderStyle: 'solid',
  // },
}))
