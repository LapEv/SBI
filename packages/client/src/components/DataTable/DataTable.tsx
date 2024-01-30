import { styled } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'
import { ThemeMode } from '../../themes/themeConfig'
import { IDataTable } from './interface'

const StyledDataTable = styled(MUIDataTable)(({ theme }) => ({
  '&.MuiPaper-root.MuiAutocomplete-paper': {
    backgroundColor:
      theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
  },
  '&.MuiPaper-root.MuiAutocomplete-root': {
    borderWidth: 2,
    borderColor: theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
    borderStyle: 'solid',
  },
}))

declare module '@mui/material/styles' {
  interface Components {
    [key: string]: any
  }
}
export const DataTable = ({ title, data, options, columns }: IDataTable) => {
  return (
    <ThemeProvider
      theme={(theme: Theme) =>
        createTheme({
          ...theme,
          components: {
            ...theme.components,
            MuiPopover: {
              styleOverrides: {
                paper: {
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                  boxShadow:
                    theme.palette.mode === 'light'
                      ? '1px 2px 16px 3px #1E515D'
                      : '0px 0px 6px 0px #C1EEE1',
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000!important'
                      : '#FFFFFF!important',
                },
              },
            },
            MuiAutocomplete: {
              styleOverrides: {
                paper: {
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                  boxShadow:
                    theme.palette.mode === 'light'
                      ? '1px 2px 16px 3px #1E515D'
                      : '0px 0px 6px 0px #C1EEE1',
                },
                option: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000!important'
                      : '#FFFFFF!important',
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                listbox: {
                  '& :hover': {
                    color:
                      theme.palette.mode === 'light'
                        ? '#1E515D!important'
                        : '#C1EEE1!important',
                    fontWeight: 'bold',
                  },
                  '& li': {
                    borderColor:
                      theme.palette.mode === 'dark' ? '#1E515D' : '#C1EEE1',
                  },
                },
                inputRoot: {
                  borderColor:
                    theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000!important'
                      : '#FFFFFF!important',
                },
                clearIndicator: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                popupIndicator: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
              },
            },
            MUIDataTable: {
              styleOverrides: {
                paper: {
                  width: '100%',
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor:
                    theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
                  borderStyle: 'solid',
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                  boxShadow:
                    theme.palette.mode === 'light'
                      ? '1px 2px 16px 3px #1E515D'
                      : '0px 0px 6px 0px #C1EEE1',
                },
              },
            },
            MUIDataTableHead: {
              styleOverrides: {
                main: {
                  width: '100%',
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1E515D'
                      : '#C1EEE1',
                },
              },
            },
            MUIDataTableHeadCell: {
              styleOverrides: {
                root: {
                  height: 10,
                  minHeight: 10,
                  padding: 0,
                  paddingLeft: 5,
                  // display: 'block',
                  boxSizing: 'border-box',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  // width: '100%!important',
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1d4751'
                      : '#9ed3c4',
                  borderTopWidth: 2,
                  borderTopColor:
                    theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
                  borderTopStyle: 'solid',
                  borderBottomWidth: 2,
                  borderBottomColor:
                    theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
                  borderBottomStyle: 'solid',
                },
                data: {
                  fontSize: '0.935rem',
                  fontWeight: 'bold',
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                },
                sortAction: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 15,
                },
                sortActive: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                  textDecoration: 'underLine',
                },
                tooltip: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                },
              },
            },
            MuiTableCell: {
              styleOverrides: {
                root: {
                  // display: 'block',
                  boxSizing: 'border-box',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              },
            },
            MUIDataTableSelectCell: {
              styleOverrides: {
                headerCell: {
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1d4751'
                      : '#9ed3c4',
                  borderTopWidth: 2,
                  borderTopColor:
                    theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
                  borderTopStyle: 'solid',
                  borderBottomWidth: 2,
                  borderBottomColor:
                    theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
                  borderBottomStyle: 'solid',
                },
                checkboxRoot: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                checked: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
              },
            },
            MUIDataTableHeadRow: {
              styleOverrides: {
                root: {
                  height: 10,
                  minHeight: 10,
                },
              },
            },
            MUIDataTableBodyCell: {
              styleOverrides: {
                root: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                },
              },
            },
            MUIDataTableToolbar: {
              styleOverrides: {
                root: {
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1E515D'
                      : '#C1EEE1',
                  height: 50,
                  minHeight: 50,
                  maxHeight: 50,
                },
                titleText: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                },
                icon: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                },
                iconActive: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D'
                      : '#C1EEE1',
                },
              },
            },
            MUIDataTableToolbarSelect: {
              styleOverrides: {
                root: {
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1E515D'
                      : '#C1EEE1',
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                  height: 50,
                  minHeight: 50,
                  maxHeight: 50,
                },
                iconButton: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                },
              },
            },
            MUIDataTablePagination: {
              styleOverrides: {
                root: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1E515D'
                      : '#C1EEE1',
                },
                toolbar: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D'
                      : '#C1EEE1',
                  '& div': {
                    '& svg': {
                      color:
                        theme.palette.mode === ThemeMode.light
                          ? '#1E515D'
                          : '#C1EEE1',
                    },
                  },
                },
              },
            },
            MUIDataTableResize: {
              styleOverrides: {
                resizer: {
                  borderColor:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D'
                      : '#C1EEE1',
                },
              },
            },
            MUIDataTableViewCol: {
              styleOverrides: {
                root: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1E515D'
                      : '#C1EEE1',
                  boxShadow:
                    theme.palette.mode === 'light'
                      ? '1px 2px 16px 3px #1E515D'
                      : '0px 0px 6px 0px #C1EEE1',
                  borderWidth: 2,
                  borderColor:
                    theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
                  borderStyle: 'solid',
                  borderRadius: 5,
                },
                title: {
                  fontSize: '0.935rem',
                  fontWeight: 'bold',
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                },
                checked: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                checkbox: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                label: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
              },
            },
            MUIDataTableSearch: {
              styleOverrides: {
                clearIcon: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                searchIcon: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                searchText: {
                  '& div': {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#000000'
                        : '#FFFFFF',
                    '&:before': {
                      borderBottom:
                        theme.palette.mode === ThemeMode.light
                          ? '2px solid #1E515D'
                          : '2px solid #C1EEE1',
                    },
                    '&:after': {
                      borderBottom:
                        theme.palette.mode === ThemeMode.light
                          ? '2px solid #1E515D'
                          : '2px solid #C1EEE1',
                    },
                  },
                },
              },
            },
            MUIDataTableFilter: {
              styleOverrides: {
                root: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1E515D'
                      : '#C1EEE1',
                },
                title: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                  fontSize: '0.935rem',
                  fontWeight: 'bold',
                },
                checkbox: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D'
                      : '#C1EEE1',
                },
                checked: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                resetLink: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                checkboxIcon: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D!important'
                      : '#C1EEE1!important',
                },
                gridListTile: {
                  '& div': {
                    color:
                      theme.palette.mode === ThemeMode.light
                        ? '#1E515D'
                        : '#C1EEE1',
                    '& label': {
                      color:
                        theme.palette.mode === ThemeMode.light
                          ? '#1E515D'
                          : '#C1EEE1',
                      '&.Mui-focused': {
                        color:
                          theme.palette.mode === ThemeMode.light
                            ? '#1E515D'
                            : '#C1EEE1',
                      },
                    },
                    '&.MuiInputBase-root': {
                      '&:before': {
                        borderBottom:
                          theme.palette.mode === ThemeMode.light
                            ? '2px solid #1E515D'
                            : '2px solid #C1EEE1',
                      },
                      '&:after': {
                        borderBottom:
                          theme.palette.mode === ThemeMode.light
                            ? '2px solid #1E515D'
                            : '2px solid #C1EEE1',
                      },
                      '& svg': {
                        color:
                          theme.palette.mode === ThemeMode.light
                            ? '#1E515D'
                            : '#C1EEE1',
                      },
                    },
                  },
                },
              },
            },
            MUIDataTableFilterList: {
              styleOverrides: {
                chip: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#1E515D'
                      : '#C1EEE1',
                  backgroundColor:
                    theme.palette.mode === ThemeMode.dark
                      ? '#1d4751'
                      : '#9ed3c4',
                },
                root: {
                  color:
                    theme.palette.mode === ThemeMode.light
                      ? '#000000'
                      : '#FFFFFF',
                  paddingBottom: 5,
                  marginLeft: 5,

                  '& div': {
                    margin: 0,
                    marginRight: 5,
                  },
                },
              },
            },
          },
        })
      }>
      <StyledDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  )
}
