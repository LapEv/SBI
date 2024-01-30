import React from 'react'
import ReactDOM from 'react-dom'
import { MUIDataTableOptions } from 'mui-datatables'
import MUIDataTable from 'mui-datatables'
import { textLabels } from './data'
import { DenseTable } from './CustomToolbar'

export default class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      table: {},
    }
    this.handleTableInit = this.handleTableInit.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
  }

  /** onTableInit gives access to initial MuiDataTable state
   *  if the application needs access to internal state prior to
   *  the user performing a table mutation (sort, filter, etc.)
   *  that triggers onTableChange
   */
  handleTableInit = (action, tableState) => {
    console.log('Init action: ', action)
    console.log('Init handleTableInit: ', tableState)
    const columnOrderStorage = localStorage.getItem('IncidentsColumnOrder')
    console.log(
      'Init columnOrderStorage = ',
      columnOrderStorage?.split(',').map(Number)
    )
    !columnOrderStorage
      ? localStorage.setItem(
          'IncidentsColumnOrder',
          tableState.columnOrder.toString()
        )
      : this.setState({
          table: {
            ...tableState,
            // columnOrder: columnOrderStorage.split(',').map(Number),
            columnOrder: [1, 0, 2, 3, 4],
          },
        })
    this.setState({
      table: {
        ...tableState,
        // columnOrder: columnOrderStorage.split(',').map(Number),
        columnOrder: [1, 0, 2, 3, 4],
      },
    })
    console.log('Init: ', this)
  }

  handleTableChange = (action, tableState) => {
    console.log('handleTableChange: ', this)
    console.log('handleTableChange: ', tableState)
    console.log('Change action: ', action)
    console.log('Change handleTableChange: ', tableState)

    if (action === 'propsUpdate') return

    if (action === 'columnOrderChange') {
      localStorage.setItem(
        'IncidentsColumnOrder',
        tableState.columnOrder.toString()
      )
      return
    }

    const columnOrder = localStorage.getItem('IncidentsColumnOrder')
    console.log('Change columnOrder = ', columnOrder)

    this.setState({ table: tableState })
  }

  columns = ['Name', 'Title', 'Location', 'Age', 'Salary']

  data = [
    ['Gabby George', 'Business Analyst', 'Minneapolis', 30, 100000],
    ['Aiden Lloyd', 'Business Consultant', 'Dallas', 55, 200000],
    ['Jaden Collins', 'Attorney', 'Santa Ana', 27, 500000],
    ['Franky Rees', 'Business Analyst', 'St. Petersburg', 22, 50000],
    ['Aaren Rose', 'Business Consultant', 'Toledo', 28, 75000],
    ['Blake Duncan', 'Business Management Analyst', 'San Diego', 65, 94000],
    ['Frankie Parry', 'Agency Legal Counsel', 'Jacksonville', 71, 210000],
    ['Lane Wilson', 'Commercial Specialist', 'Omaha', 19, 65000],
    ['Robin Duncan', 'Business Analyst', 'Los Angeles', 20, 77000],
    ['Mel Brooks', 'Business Consultant', 'Oklahoma City', 37, 135000],
    ['Harper White', 'Attorney', 'Pittsburgh', 52, 420000],
    ['Kris Humphrey', 'Agency Legal Counsel', 'Laredo', 30, 150000],
    ['Frankie Long', 'Industrial Analyst', 'Austin', 31, 170000],
    ['Brynn Robbins', 'Business Analyst', 'Norfolk', 22, 90000],
    ['Justice Mann', 'Business Consultant', 'Chicago', 24, 133000],
    ['Addison Navarro', 'Business Management Analyst', 'New York', 50, 295000],
    ['Jesse Welch', 'Agency Legal Counsel', 'Seattle', 28, 200000],
    ['Eli Mejia', 'Commercial Specialist', 'Long Beach', 65, 400000],
    ['Gene Leblanc', 'Industrial Analyst', 'Hartford', 34, 110000],
    ['Danny Leon', 'Computer Scientist', 'Newark', 60, 220000],
    ['Lane Lee', 'Corporate Counselor', 'Cincinnati', 52, 180000],
    ['Jesse Hall', 'Business Analyst', 'Baltimore', 44, 99000],
    ['Danni Hudson', 'Agency Legal Counsel', 'Tampa', 37, 90000],
    ['Terry Macdonald', 'Commercial Specialist', 'Miami', 39, 140000],
    ['Justice Mccarthy', 'Attorney', 'Tucson', 26, 330000],
    ['Silver Carey', 'Computer Scientist', 'Memphis', 47, 250000],
    ['Franky Miles', 'Industrial Analyst', 'Buffalo', 49, 190000],
    ['Glen Nixon', 'Corporate Counselor', 'Arlington', 44, 80000],
    [
      'Gabby Strickland',
      'Business Process Consultant',
      'Scottsdale',
      26,
      45000,
    ],
    ['Mason Ray', 'Computer Scientist', 'San Francisco', 39, 142000],
  ]

  options: MUIDataTableOptions = {
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
    onTableInit: this.handleTableInit,
    onTableChange: this.handleTableChange,
    // customToolbar: () => {
    //   return (
    //     <DenseTable denseTable={denseTable} setDenseTable={setDenseTable} />
    //   )
    // },
    // setRowProps: (row, dataIndex, rowIndex) => {
    //   return {
    //     style: {
    //       backgroundColor:
    //         rowIndex % 2 !== 0
    //           ? theme.palette.mode === 'dark'
    //             ? '#1d4751'
    //             : '#9ed3c4'
    //           : theme.palette.mode === 'dark'
    //           ? '#1E515D'
    //           : '#C1EEE1',
    //     },
    //   }
    // },
    // setTableProps: () => {
    //   return {
    //     padding: denseTable ? 'none' : 'normal',
    //   }
    // },
  }

  render() {
    return (
      <MUIDataTable
        title={'ACME Employee list'}
        data={this.data}
        columns={this.columns}
        options={this.options}
      />
    )
  }
}
