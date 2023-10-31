import { ThemeOptions } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { PaletteMode } from '@mui/material'

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
}

export const ThemeConfig = (mode: PaletteMode) =>
  ({
    typography: {
      fontFamily: 'Raleway',
      button: {
        textTransform: 'none',
      },
    },
    palette: {
      mode,
      ...(mode === ThemeMode.light
        ? {
            text: {
              primary: '#FFFFFF',
              secondary: '#000000',
            },
            green: {
              [64]: '#1E515D',
              dark: '#7AB3A2',
            },
            icon: {
              default: '#1E515D',
            },
            background: {
              default: '#C1EEE1',
              paper: '#1E515D',
              btn: '#7AB3A2',
            },
            primary: {
              main: '#def0eb',
              contrastText: '#1E515D',
            },
            secondary: {
              main: '#1E515D',
            },
            error: {
              main: red[400],
              height: 20,
            },
            input: {
              main: '#1E515D',
            },
            border: {
              default: '#000000',
            },
          }
        : {
            text: {
              primary: '#000000',
              secondary: '#FFFFFF',
            },
            green: {
              [64]: '#C1EEE1',
              dark: '#7AB3A2',
            },
            icon: {
              default: '#C1EEE1',
            },
            background: {
              default: '#1E515D',
              paper: '#C1EEE1',
              btn: '#7AB3A2',
            },
            primary: {
              main: '#def0eb',
              contrastText: '#1E515D',
            },
            secondary: {
              main: '#C1EEE1',
            },
            error: {
              main: red[400],
              height: 20,
            },
            input: {
              main: '#C1EEE1',
            },
            border: {
              default: '#FFFFFF',
            },
          }),
    },
    components: {
      MuiTypography: {
        defaultProps: {
          fontWeight: 'bold',
          // fontSize: '0.975rem',
          color: mode === ThemeMode.light ? '#1E515D' : '#FFFFFF',
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
              color: mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
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
              backgroundColor: mode === ThemeMode.light ? '#C1EEE1' : '#1E515D',
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: '#6b6b6b #2b2b2b',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              backgroundColor: '#2b2b2b',
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
  } as ThemeOptions)
