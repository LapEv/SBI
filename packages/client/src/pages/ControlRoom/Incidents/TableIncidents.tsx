import { memo, useState } from 'react'
import { INC } from 'store/slices/incidents/interfaces'
import { MUIDataTableOptions } from 'mui-datatables'
import { INCColumn } from './data'
import { DataTable } from 'components/DataTable'
import { DenseTable } from './CustomToolbar'
interface INCTable {
  incidents: INC[]
}

export const TableIncidents = memo(({ incidents }: INCTable) => {
  const [denseTable, setDenseTable] = useState(false)
  const options: MUIDataTableOptions = {
    filter: true,
    // onFilterChange: (changedColumn, filterList) => {
    //   console.log(changedColumn, filterList)
    // },
    // selectableRows: 'single',
    // filterType: 'dropdown',
    rowsPerPage: 10,
    // expandableRows: true,
    filterType: 'textField',
    resizableColumns: true,
    // setTableProps: () => {
    //   return {
    //     padding: 'none', // 'default
    //     size: 'small', // medium
    //   }
    // },
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
    setTableProps: () => {
      return {
        padding: denseTable ? 'none' : 'normal',
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
