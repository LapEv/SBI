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
    borderTopWidth: 2,
    borderTopColor: theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
    borderTopStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
    borderBottomStyle: 'solid',
    maxHeight: 20,
    heigth: 20,

    '.MuiTableCell-root': {
      backgroundColor:
        theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
      color: theme.palette.mode === ThemeMode.dark ? '#000000' : '#FFFFFF',
      maxHeight: 20,

      '.MuiButtonBase-root': {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.palette.mode === ThemeMode.light ? '#000000' : '#FFFFFF',
        '.MUIDataTableHeadCell-sortAction': {
          '.MUIDataTableHeadCell-sortActive': {
            color:
              theme.palette.mode === ThemeMode.light ? '#000000' : '#FFFFFF',
          },
        },
      },
    },
  },

  '.MuiTableCell-root': {
    // backgroundColor:
    //   theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
    color: theme.palette.mode === ThemeMode.light ? '#000000' : '#FFFFFF',
    maxHeight: 20,
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
