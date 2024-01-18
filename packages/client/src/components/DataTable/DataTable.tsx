import { styled } from '@mui/material'
import MUIDataTable from 'mui-datatables'

import { ThemeMode } from '../../themes/themeConfig'
import { IDataTable } from './interface'

const StyledDataTable = styled(MUIDataTable)(({ theme }) => ({
  '&.MuiPaper-root': {
    width: '100%',
    marginTop: 10,
    borderColor: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 8,
    backgroundColor:
      theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
  },
  '.MuiTableHead-root': {
    width: '100%',
    backgroundColor:
      theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
    '.MuiTableCell-root': {
      '.MuiButtonBase-root': {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.palette.mode === ThemeMode.light ? '#011000' : '#FF00FF',
        '.MUIDataTableHeadCell-sortAction': {
          '.MUIDataTableHeadCell-sortActive': {
            color:
              theme.palette.mode === ThemeMode.light ? '#011000' : '#FF00FF',
          },
        },
      },
    },
  },

  '.MuiTableCell-root': {
    backgroundColor:
      theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
    color: theme.palette.mode === ThemeMode.light ? '#000000' : '#FFFFFF',
  },
  '.MUIDataTableResize-root': {
    fontSize: 16,
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
