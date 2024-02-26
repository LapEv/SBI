import React, { memo, useEffect, useState } from 'react'
import {
  MUIDataTableMeta,
  MUIDataTableOptions,
  MUIDataTableState,
} from 'mui-datatables'
import { textLabels } from './data'
import { DataTable } from 'components/DataTable'
import { TableCell, TableRow, useTheme, Modal } from '@mui/material'
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
  FilterOptions,
  PrintBar,
} from './'
import { useIncidents } from 'hooks/incidents/useINC'
import { setFilter } from './Components/FilterOptions'
import { ChooseModal } from './Modals'

export const TableIncidents = memo(() => {
  const modalClientRef = React.createRef()
  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')

  const [{ incidents, countIncidents, filterListData }, { getINCs }] =
    useIncidents()

  const [heightINCData, setHeightINCData] = useState<number>(0)
  const [filterDialogOpen, setFilterDialogOpen] = useState<boolean>(false)
  const [denseTable, setDenseTable] = useState<boolean>(
    localStorage.getItem('IncidentsDenseTable') === '1' ? true : false
  )
  const [dragTable, setDragTable] = useState<boolean>(false)
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
        filter: false,
        sort: false,
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
              timeReg={rowData[17]}
              timeCloseCheck={rowData[31]}
              inc={rowData[2]}
            />
          )
        },
      },
    },
    {
      name: 'incident',
      label: 'Инцидент *',
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
      name: 'parentalIncident',
      label: 'Родительский',
      options: {
        filter: false,
        sort: false,
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
        sort: false,
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
      label: 'Номер *',
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
      label: 'Номер Клиента *',
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
      name: 'timeSLA',
      label: 'SLA *',
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
      name: 'status',
      label: 'Статус *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.status,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return (
            <Status
              value={value ?? ''}
              id={rowData[0]}
              incident={rowData[2]}
              responsible={rowData[24]}
              currentStatus={rowData[8]}
              timeSLA={rowData[7] ?? ''}
            />
          )
        },
      },
    },
    {
      name: 'client',
      label: 'Клиент *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.client,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string) => {
          return <CustomCell value={value ?? ''} denseTable={denseTable} />
        },
      },
    },
    {
      name: 'legalName',
      label: 'Клиент Юр *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.legalName,
        },
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
      label: 'Контракт *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.contract,
        },
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
      label: 'Объект *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.object,
        },
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
      label: 'Адрес *',
      options: {
        filter: true,
        sort: false,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.address,
        },
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
        sort: false,
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
      label: 'Регион *',
      options: {
        filter: true,
        sort: false,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.region,
        },
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
      label: 'Кто принял *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.userAccepted,
        },
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
      label: 'Время регистрации *',
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
      name: 'sla',
      label: 'Тип инцидента *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.sla,
        },
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
      label: 'Тип регистрации *',
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
      name: 'equipment',
      label: 'Оборудование *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.equipment,
        },
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
      label: 'Модель *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.model,
        },
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
        filter: false,
        sort: false,
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
      label: 'Исполнитель *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.executor,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return (
            <Executor
              value={value ?? ''}
              id={rowData[0]}
              incident={rowData[2]}
              responsible={rowData[24]}
            />
          )
        },
      },
    },
    {
      name: 'responsible',
      label: 'Ответственный *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.responsible,
        },
        setCellHeaderProps: () => ({
          style: { padding: !denseTable ? 15 : 8 },
        }),
        customBodyRender: (value: string, { rowData }: ITableMeta) => {
          return (
            <UserResponsible
              value={value ?? ''}
              id={rowData[0]}
              incident={rowData[2]}
              responsible={rowData[24]}
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
        sort: false,
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
        sort: false,
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
        sort: false,
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
        sort: false,
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
        sort: false,
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
        filter: false,
        sort: false,
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
        sort: false,
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
        sort: false,
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
        sort: false,
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
      label: 'Статус SLA *',
      options: {
        filter: true,
        sort: true,
        display: true,
        viewColumns: true,
        filterOptions: {
          names: filterListData.overdue,
        },
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
        filter: false,
        sort: false,
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
        filter: false,
        sort: false,
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
        filter: false,
        sort: false,
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
        sort: false,
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
        sort: false,
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
        sort: false,
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
    const filterListStorage = JSON.parse(
      localStorage.getItem('filterList') as string
    )
    if (filterListStorage && filterListStorage?.length > 1) {
      tableState.filterList = filterListStorage
    }
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
    const { page, sortOrder, rowsPerPage, filterList } = tableState

    const filterOptions = setFilter(INCColumn, filterList)

    const getINCbyData = {
      nameSort: sortOrder.name,
      direction: sortOrder.direction,
      limit: rowsPerPage,
      page,
      filterOptions,
    }

    switch (action) {
      case 'onFilterDialogOpen':
        setFilterDialogOpen(true)
        break
      case 'onFilterDialogClose':
        getINCs(getINCbyData)
        setFilterDialogOpen(false)
        localStorage.setItem('filterList', JSON.stringify(filterList))
        break
      case 'filterChange':
        if (!filterDialogOpen) {
          getINCs(getINCbyData)
          localStorage.setItem('filterList', JSON.stringify(filterList))
        }
        break
      case 'changePage':
        getINCs(getINCbyData)
        break
      case 'sort':
        getINCs(getINCbyData)
        break
      case 'changeRowsPerPage':
        getINCs(getINCbyData)
        break
      default:
        break
    }
  }

  const onPrint = () => {
    setModalImage('printINC')
    setModal(true)
  }

  const options: MUIDataTableOptions = {
    filter: true,
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
    print: false,
    serverSide: true,
    // selectableRows: dragTable ? 'none' : 'multiple',
    // selectableRowsOnClick: !dragTable ?? false,
    selectableRows: 'none',
    selectableRowsOnClick: false,
    textLabels: textLabels,
    tableBodyHeight: '100%',
    columnOrder: getcolumnOrderStorage(),
    count: countIncidents,
    rowsPerPageOptions: [15, 30, 50],
    page: JSON.parse(localStorage.getItem('currentPage') as string) ?? 0,
    rowsPerPage:
      JSON.parse(localStorage.getItem('numberOfRows') as string) ?? 15,
    onChangePage: currentPage =>
      localStorage.setItem('currentPage', JSON.stringify(currentPage)),
    onChangeRowsPerPage: numberOfRows =>
      localStorage.setItem('numberOfRows', JSON.stringify(numberOfRows)),
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
    sortOrder: JSON.parse(localStorage.getItem('sortColumn') as string),
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
        <>
          <PrintBar onPrint={onPrint} />
          <DenseTable
            denseTable={denseTable}
            setDenseTable={setDenseTableFunc}
          />
          {/* <DragTable dragTable={dragTable} setDragTable={setDragTable} /> */}
        </>
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
    const { nameSort, direction, limit, page, filterOptions } = FilterOptions()
    getINCs({ limit, nameSort, direction, page, filterOptions })
  }, [])

  useEffect(() => {
    console.log('incidents = ', incidents)
    // setTableColumn()
  }, [incidents])

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  return (
    <>
      <Modal
        open={modal}
        onClose={setModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ChooseModal
          ref={modalClientRef}
          modalImage={modalImage}
          handleModal={handleModal}
        />
      </Modal>

      <DataTable
        title={'Инциденты'}
        data={incidents}
        columns={tableColumn}
        options={options}
      />
    </>
  )
})
