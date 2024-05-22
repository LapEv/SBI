import { Theme, ThemeOptions } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
}

export const ThemeColor = {
  light: '#1E515D',
  dark: '#C1EEE1',
}

interface ThemeModeProps {
  mode: PaletteMode
  fontSize: string
  colorLight?: string
  colorDark?: string
}

export interface ITheme extends Theme {
  fontSize: string
}

export const ThemeConfig = ({
  mode,
  fontSize,
  colorLight,
  colorDark,
}: ThemeModeProps) =>
  ({
    fontSize,
    typography: {
      fontFamily: 'Raleway',
      fontSize: fontSize === 'small' ? 12 : 16,
      color: mode === ThemeMode.light ? colorLight : '#FFFFFF',
      button: {
        textTransform: 'none',
        fontSize: fontSize === 'small' ? 11 : 15,
        fontWeight: 'bold',
      },
      body1: {
        fontSize: fontSize === 'small' ? 12 : 16,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? colorLight : colorDark,
      },
      body2: {
        fontSize: fontSize === 'small' ? 11 : 15,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? '#000000' : '#FFFFFF',
      },
      h6: {
        fontSize: fontSize === 'small' ? 24 : 32,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? colorLight : colorDark,
      },
      h5: {
        fontSize: fontSize === 'small' ? 22 : 30,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? colorLight : colorDark,
      },
      h4: {
        fontSize: fontSize === 'small' ? 20 : 28,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? colorLight : colorDark,
      },
      h3: {
        fontSize: fontSize === 'small' ? 18 : 26,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? colorLight : colorDark,
      },
      h2: {
        fontSize: fontSize === 'small' ? 16 : 24,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? colorLight : colorDark,
      },
      h1: {
        fontSize: fontSize === 'small' ? 14 : 22,
        fontWeight: 'bold',
        color: mode === ThemeMode.light ? colorLight : colorDark,
      },

      // body2: {
      //   fontSize,
      //   fontWeight: 'bold',
      //   color: mode === ThemeMode.light ? colorLight : '#FFFFFF',
      // },
      // subtitle1: {
      //   fontSize,
      //   fontWeight: 'bold',
      //   color: mode === ThemeMode.light ? colorLight : '#FFFFFF',
      // },
      // subtitle2: {
      //   fontSize,
      //   fontWeight: 'bold',
      //   color: mode === ThemeMode.light ? colorLight : '#FFFFFF',
      // },
    },
    spacing: fontSize === 'large' ? 8 : 4,
    palette: {
      mode,
      ...(mode === ThemeMode.light
        ? {
            text: {
              primary: '#FFFFFF',
              secondary: '#000000',
            },
            green: {
              [64]: colorLight,
              dark: '#7AB3A2',
            },
            icon: {
              default: colorLight,
              secondary: '#def0eb',
            },
            background: {
              default: colorDark,
              paper: colorLight,
              btn: '#7AB3A2',
            },
            primary: {
              main: '#def0eb',
              contrastText: colorLight,
            },
            secondary: {
              main: colorLight,
            },
            error: {
              main: red[400],
              height: 20,
            },
            input: {
              main: colorLight,
            },
            border: {
              default: '#000000',
            },
            info: {
              main: 'rgba(193,238,225,0.2)',
            },
          }
        : {
            text: {
              primary: '#000000',
              secondary: '#FFFFFF',
            },
            green: {
              [64]: colorDark,
              dark: '#7AB3A2',
            },
            icon: {
              default: colorDark,
              secondary: '#def0eb',
            },
            background: {
              default: colorLight,
              paper: colorDark,
              btn: '#7AB3A2',
            },
            primary: {
              main: '#def0eb',
              contrastText: colorLight,
            },
            secondary: {
              main: colorDark,
            },
            error: {
              main: red[400],
              height: 20,
            },
            input: {
              main: colorDark,
            },
            border: {
              default: '#FFFFFF',
            },
            info: {
              main: 'rgba(30,81,93,0.2)',
            },
          }),
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: fontSize === 'small' ? 30 : 40,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            height: fontSize === 'small' ? 40 : 50,
          },
        },
      },

      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '0!important',
            paddingRight: '0!important',
            maxWidth: '100%!important',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '.MuiSvgIcon-root': {
              color: mode === ThemeMode.light ? colorLight : colorDark,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            '& .MuiAlert-icon': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '& .MuiAlert-message': {
              fontWeight: 'bold',
            },
            '& .MuiAlert-standard': {
              backgroundColor:
                mode === ThemeMode.light ? colorDark : colorLight,
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollbarColor: '#6b6b6b #2b2b2b',
            scrollbarWidth: 'thin',
          },
          body: {
            scrollbarColor: '#6b6b6b #2b2b2b',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              backgroundColor: '#2b2b2b',
              borderRadius: 8,
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: '#6b6b6b',
              minHeight: 24,
              border: '3px solid #2b2b2b',
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
              {
                backgroundColor: '#959595',
              },
            '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
              {
                backgroundColor: '#959595',
              },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
              {
                backgroundColor: '#959595',
              },
            '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
              backgroundColor: '#2b2b2b',
            },
          },
        },
      },
    },
  }) as ThemeOptions
