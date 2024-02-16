import { memo, useEffect, useState } from 'react'
import { INC } from 'store/slices/incidents/interfaces'
import {
  MUIDataTableMeta,
  MUIDataTableOptions,
  MUIDataTableState,
  MUISortOptions,
} from 'mui-datatables'
import { textLabels } from './data'
import { DataTable } from 'components/DataTable'
import { TableCell, TableRow, tableBodyClasses, useTheme } from '@mui/material'
import { INC_Column, ITableMeta } from './interfaces'
import {
  DenseTable,
  CustomCell,
  Executor,
  UserResponsible,
  IncidentData,
  Status,
  IndicatorCell,
  StatusSLACell,
  SpacePartCell,
} from './'
import { useIncidents } from 'hooks/incidents/useINC'

interface INCTable {
  incidents: INC[]
}

export const TableIncidents = memo(() => {
  const [{ incidents }, { getINCs, setLoadingINC }] = useIncidents()

  const [heightINCData, setHeightINCData] = useState<number>(0)
  const [denseTable, setDenseTable] = useState<boolean>(
    localStorage.getItem('IncidentsDenseTable') === '1' ? true : false
  )
  // const [dragTable, setDragTable] = useState<boolean>(false)
  const theme = useTheme()

  const INCColumn: INC_Column[] = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: false,
        sort: false,
        display: false,
        viewColumns: true,
      },
    },
    {
      name: 'statusIndicator',
      label: 'Индикатор',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        draggable: false,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (_: string, { rowData }: MUIDataTableMeta) => {
          return (
            <IndicatorCell
              timeSLA={rowData[7] ?? ''}
              timeReg={rowData[16]}
              timeCloseCheck={rowData[29]}
              inc={rowData[2]}
            />
          )
        },
      },
    },

    {
      name: 'incident',
      label: 'Инцидент',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'parentalIncident',
      label: 'Родительский',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'relatedIncident',
      label: 'Связанный',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
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
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'timeSLA',
      label: 'SLA',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return (
            <Status
              value={value ?? ''}
              id={rowData[0]}
              incident={rowData[2]}
              responsible={rowData[22]}
              currentStatus={rowData[8]}
              timeSLA={rowData[7] ?? ''}
            />
          )
        },
      },
    },
    {
      name: 'client',
      label: 'Клиент',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
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
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'coordinates',
      label: 'Координаты',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'timeRegistration',
      label: 'Время регистрации',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'methodsReuqest',
      label: 'Тип регистрации',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
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
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return (
            <Executor
              value={value ?? ''}
              id={rowData[0]}
              incident={rowData[2]}
              responsible={rowData[22]}
            />
          )
        },
      },
    },
    {
      name: 'responsible',
      label: 'Ответственный',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return (
            <UserResponsible
              value={value ?? ''}
              id={rowData[0]}
              incident={rowData[2]}
              responsible={rowData[22]}
            />
          )
        },
      },
    },
    {
      name: 'timeInWork',
      label: 'Время в работу',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'description',
      label: 'Описание',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
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
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'applicant',
      label: 'Заявитель',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'applicantContacts',
      label: 'Контакты заявителя',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },

    {
      name: 'userClosingCheck',
      label: 'Перевел в выполнение',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'timeCloseCheck',
      label: 'Время выполнения',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'typeCompletedWork',
      label: 'Тип выполненных работ',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'commentCloseCheck',
      label: 'Комментарии к выполнению',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'overdue',
      label: 'Статус SLA',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <StatusSLACell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },

    {
      name: 'act',
      label: 'Акты',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'spaceParts',
      label: 'ЗИП',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string[]) => {
          return <SpacePartCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'userClosing',
      label: 'Закрыл',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'timeClose',
      label: 'Время закрытия',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'commentClose',
      label: 'Комментарии к закрытию',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'rating',
      label: 'Оценка',
      options: {
        filter: false,
        sort: true,
        display: true,
        viewColumns: true,
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
      if (INCColumn.length !== columnOrderStorage.length) {
        const newOrder = INCColumn.map((item, index) =>
          columnOrderStorage.findIndex(value => value === index) >= 0
            ? columnOrderStorage.findIndex(value => value === index)
            : index
        )
        return newOrder
      }
      return columnOrderStorage
    }
    return INCColumn.map((item, index) => index)
  }

  const handleTableInit = (data: any, value: any) => {
    console.log('handleTableInit')
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
    const filterListStorage = JSON.parse(
      localStorage.getItem('filterList') as string
    )
    if (filterListStorage && filterListStorage?.length > 1) {
      tableColumn.map(
        (item, index) => (item.options.filterList = filterListStorage[index])
      )
    }
  }

  const changePage = (page: number, sortOrder: MUISortOptions) => {
    console.log('changePage')
    setLoadingINC(true)
    // getINCs({ size: page })
  }

  const sort = (page: number, sortOrder: MUISortOptions) => {
    console.log('Sort')
  }

  const handleTableChange = (action: string, tableState: MUIDataTableState) => {
    if (action === 'viewColumnsChange') {
      const display = tableState.columns
        .map(({ display, name }) =>
          display === 'false' ? name : null || name === 'id' ? name : null
        )
        .filter(item => item)
      localStorage.setItem('IncidentsViewColumns', display.toString())
      return
    }
    // console.log('action = ', action)
    // console.log('tableState = ', tableState)
    // switch (action) {
    //   case 'changePage':
    //     changePage(tableState.page, tableState.sortOrder)
    //     break
    //   case 'sort':
    //     sort(tableState.page, tableState.sortOrder)
    //     break
    //   default:
    //     console.log('action not handled.')
    // }
  }

  const options: MUIDataTableOptions = {
    filter: true,
    rowsPerPage: 15,
    filterType: 'multiselect',
    resizableColumns: true,
    responsive: 'standard',
    fixedHeader: false,
    fixedSelectColumn: false,
    // expandableRows: !dragTable ?? false,
    expandableRows: true,
    draggableColumns: {
      enabled: true,
      transitionTime: 300,
    },
    // selectableRows: dragTable ? 'none' : 'multiple',
    // selectableRowsOnClick: !dragTable ?? false,
    selectableRows: 'none',
    selectableRowsOnClick: false,
    textLabels: textLabels,
    tableBodyHeight: '100%',
    rowsPerPageOptions: [15, 30, 50],
    columnOrder: getcolumnOrderStorage(),
    sortOrder: JSON.parse(localStorage.getItem('sortColumn') as string),
    renderExpandableRow: (rowData, { dataIndex }) => {
      return (
        <TableRow sx={{ height: heightINCData }}>
          <TableCell colSpan={7} sx={{ verticalAlign: 'baseline' }}>
            <IncidentData
              values={incidents[dataIndex]}
              setHeight={setHeightINCData}
            />
          </TableCell>
        </TableRow>
      )
    },
    onFilterChange: (_, filterList) => {
      localStorage.setItem('filterList', JSON.stringify(filterList))
    },
    onColumnSortChange: (column, direction) =>
      localStorage.setItem(
        'sortColumn',
        JSON.stringify({ name: column, direction })
      ),
    onColumnOrderChange: newColumnOrder =>
      localStorage.setItem('IncidentsColumnOrder', newColumnOrder.toString()),
    onTableChange: handleTableChange,
    onTableInit: handleTableInit,
    downloadOptions: {
      filename: 'incidents.csv',
      separator: ';',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: false,
      },
    },
    onDownload: (buildHead, buildBody, columns, data) => {
      return '\uFEFF' + buildHead(columns) + buildBody(data)
    },
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

  useEffect(() => {
    const { name, direction } = JSON.parse(
      localStorage.getItem('sortColumn') as string
    )
    const limit =
      JSON.parse(localStorage.getItem('limitColumns') as string) ?? 15

    console.log('name = ', name ?? 'incident')
    console.log('direction = ', direction)
    getINCs({
      limit,
      nameSort: name ?? 'incident',
      direction: direction ?? 'asc',
    })
  }, [])

  useEffect(() => {
    console.log('incidents = ', incidents)
  }, [incidents])

  return (
    <DataTable
      title={'Инциденты'}
      data={incidents}
      columns={tableColumn}
      options={options}
    />
  )
})
