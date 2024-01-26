import { styled } from '@mui/material'
import MUIDataTable from 'mui-datatables'

import { ThemeMode } from '../../themes/themeConfig'
import { IDataTable } from './interface'

const StyledDataTable = styled(MUIDataTable)(({ theme }) => ({
  '& .MuiTableRow-head': {
    height: 10,
    minHeight: 10,
  },
  '.MuiTableCell-head': {
    height: 10,
    minHeight: 10,
    padding: 0,
    paddingLeft: 5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%!important',
    '& [class*="MUIDataTableHeadCell-sortAction"]': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 15,
    },
    '& [class*="MUIDataTableHeadCell-sortActive"]': {
      color: theme.palette.mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      textDecoration: 'underLine',
    },
  },

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
    minHeight: 10,
    height: 10,

    '.MuiTableCell-root': {
      backgroundColor:
        theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
      color: theme.palette.mode === ThemeMode.dark ? '#000000' : '#FFFFFF',
      maxHeight: 30,
      padding: 5,
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
