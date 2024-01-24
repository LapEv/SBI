import { memo, useState } from 'react'
import { INC } from 'store/slices/incidents/interfaces'
import { MUIDataTableOptions } from 'mui-datatables'
import { INCColumn } from './data'
import { DataTable } from 'components/DataTable'
import { DenseTable } from './CustomToolbar'
import { useTheme } from '@mui/material'

interface INCTable {
  incidents: INC[]
}

export const TableIncidents = memo(({ incidents }: INCTable) => {
  const theme = useTheme()
  const [denseTable, setDenseTable] = useState(false)

  const options: MUIDataTableOptions = {
    filter: true,
    rowsPerPage: 10,
    // filterType: 'textField',
    filterType: 'checkbox',

    resizableColumns: true,
    draggableColumns: {
      enabled: true,
    },
    tableBodyHeight: '100%',
    customToolbar: () => {
      return (
        <DenseTable denseTable={denseTable} setDenseTable={setDenseTable} />
      )
    },
    // setRowProps: (row, dataIndex, rowIndex) => {
    //   return {
    //     style: { border: '3px solid blue' },
    //   }
    // },
    setRowProps: (row, dataIndex, rowIndex) => {
      return {
        style: {
          height: 40,
          maxHeight: 40,
          backgroundColor:
            rowIndex % 2 !== 0
              ? theme.palette.mode === 'dark'
                ? '#1E515D'
                : '#C1EEE1'
              : theme.palette.mode === 'dark'
              ? '#1d4751'
              : '#9ed3c4',
        },
      }
    },
    setTableProps: () => {
      return {
        padding: denseTable ? 'none' : 'normal',
        // style: {
        //   borderTopWidth: 2,
        //   borderColor: theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
        //   borderStyle: 'solid',
        // },
      }
    },
    // setCellHeaderProps: () => {
    // },
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
