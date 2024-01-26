import { memo, useState } from 'react'
import { INC } from 'store/slices/incidents/interfaces'
import { MUIDataTableOptions } from 'mui-datatables'
import { customHedearCell } from './data'
import { DataTable } from 'components/DataTable'
import { DenseTable } from './CustomToolbar'
import { useTheme } from '@mui/material'
import { Executor } from './UserActions/Executor'
import { INC_Column, ITableMeta } from './interfaces'
import { CustomCell } from './CustomCell'
import { UserResponsible } from './UserActions/UserResponsible'

interface INCTable {
  incidents: INC[]
}

export const TableIncidents = memo(({ incidents }: INCTable) => {
  const theme = useTheme()
  const [denseTable, setDenseTable] = useState(false)

  const INCColumn: INC_Column[] = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: 'incident',
      label: 'Инцидент',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'numberINC',
      label: 'Номер',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'clientINC',
      label: 'Номер Клиента',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'status',
      label: 'Статус',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'client',
      label: 'Клиент',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'contract',
      label: 'Контракт',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'object',
      label: 'Объект',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'address',
      label: 'Адрес',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'region',
      label: 'Регион',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'userAccepted',
      label: 'Кто принял',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'equipment',
      label: 'Оборудование',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'model',
      label: 'Модель',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'typicalMalfunction',
      label: 'Неисправность',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'executor',
      label: 'Исполнитель',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return <Executor value={value ?? ''} id={rowData[0]} />
        },
      },
    },
    {
      name: 'responsible',
      label: 'Ответственный',
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return <UserResponsible value={value ?? ''} id={rowData[0]} />
        },
      },
    },
  ]

  const options: MUIDataTableOptions = {
    filter: true,
    rowsPerPage: 10,
    filterType: 'dropdown',
    resizableColumns: true,
    responsive: 'vertical',
    // fixedHeader: true,
    // fixedSelectColumn: true,
    // resizableColumns: true,
    draggableColumns: {
      enabled: true,
    },
    tableBodyHeight: '100%',
    customToolbar: () => {
      return (
        <DenseTable denseTable={denseTable} setDenseTable={setDenseTable} />
      )
    },
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
