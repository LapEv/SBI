import { memo, useState } from 'react'
import { INC } from 'store/slices/incidents/interfaces'
import { MUIDataTableOptions, MUIDataTableState } from 'mui-datatables'
import { textLabels } from './data'
import { DataTable } from 'components/DataTable'
import { TableRow, TableCell, useTheme, Box, styled } from '@mui/material'
import { INC_Column, ITableMeta } from './interfaces'
import {
  DenseTable,
  CustomCell,
  Executor,
  UserResponsible,
  IncidentData,
} from './'
import { customCell } from './data'
import { TextField } from 'components/TextFields'
import { height } from '@mui/system'

interface INCTable {
  incidents: INC[]
}

export const TableIncidents = memo(({ incidents }: INCTable) => {
  const [heightINCData, setHeightINCData] = useState<number>(0)
  const [denseTable, setDenseTable] = useState<boolean>(
    localStorage.getItem('IncidentsDenseTable') === '1' ? true : false
  )
  const theme = useTheme()

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
    {
      name: 'description',
      label: 'Описание',
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
      name: 'comment',
      label: 'Комментарий',
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
  ]

  const [tableColumn, setTableColumn] = useState<INC_Column[]>(INCColumn)

  const setDenseTableFunc = (state: boolean) => {
    setDenseTable(state)
    localStorage.setItem('IncidentsDenseTable', state ? '1' : '0')
  }

  const getcolumnOrderStorage = () => {
    const columnOrderStorage = localStorage
      .getItem('IncidentsColumnOrder')
      ?.split(',')
      .map(Number)
    if (columnOrderStorage && columnOrderStorage?.length > 1) {
      return columnOrderStorage
    }
    return INCColumn.map((item, index) => index)
  }

  const handleTableInit = (action: string, tableState: MUIDataTableState) => {
    const columnViewStorage = localStorage
      .getItem('IncidentsViewColumns')
      ?.split(',')

    if (columnViewStorage && columnViewStorage?.length > 1) {
      tableColumn.map(
        item =>
          (item.options.display = !columnViewStorage?.includes(item.name)
            ? true
            : false)
      )
    }
  }

  const handleTableChange = (action: string, tableState: MUIDataTableState) => {
    if (action === 'viewColumnsChange') {
      const display = tableState.columns
        .map(({ display, name }) => (display === 'false' ? name : null))
        .filter(item => item)
      localStorage.setItem('IncidentsViewColumns', display.toString())
      return
    }
  }

  const options: MUIDataTableOptions = {
    filter: true,
    rowsPerPage: 10,
    filterType: 'multiselect',
    resizableColumns: true,
    responsive: 'standard',
    fixedHeader: true,
    fixedSelectColumn: true,
    draggableColumns: {
      enabled: true,
    },
    textLabels: textLabels,
    tableBodyHeight: '100%',
    rowsPerPageOptions: [10, 25, 50],
    columnOrder: getcolumnOrderStorage(),
    expandableRows: true,
    renderExpandableRow: (rowData, { dataIndex }) => {
      console.log('values = ', incidents[dataIndex])
      return (
        <TableRow sx={{ height: heightINCData }}>
          <IncidentData
            values={incidents[dataIndex]}
            setHeight={setHeightINCData}
          />
        </TableRow>
      )
    },
    onColumnOrderChange: newColumnOrder =>
      localStorage.setItem('IncidentsColumnOrder', newColumnOrder.toString()),
    // onViewColumnsChange: (changedColumn, action) =>
    //   console.log(' action= ', action),
    onTableChange: handleTableChange,
    onTableInit: handleTableInit,
    customToolbar: () => {
      return (
        <DenseTable denseTable={denseTable} setDenseTable={setDenseTableFunc} />
      )
    },
    setRowProps: (row, dataIndex, rowIndex) => {
      return {
        style: {
          backgroundColor:
            rowIndex % 2 !== 0
              ? theme.palette.mode === 'dark'
                ? '#1d4751'
                : '#9ed3c4'
              : theme.palette.mode === 'dark'
              ? '#1E515D'
              : '#C1EEE1',
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
      columns={tableColumn}
      options={options}
    />
  )
})
