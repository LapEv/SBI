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
              [64]: '#1E515D',
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
      MuiTextField: {
        styleOverrides: {
          root: {
            '& label': {
              color: mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
            },
            '& label.Mui-focused': {
              color:
                mode === ThemeMode.light
                  ? '#1E515D!important'
                  : '#C1EEE1!important',
            },
            '& label.Mui-error': {
              color:
                mode === ThemeMode.light
                  ? '#ef5350!important'
                  : '#ef5350!important',
            },
            '& .MuiInputBase-root': {
              backgroundColor: mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
            },
            '& .MuiOutlinedInput-input.Mui-disabled': {
              backgroundColor: mode === ThemeMode.light ? '#C1EEE1' : '#1E515D',
              WebkitTextFillColor:
                mode === ThemeMode.light
                  ? 'rgba(0,0,0,1)'
                  : 'rgba(255,255,255,1)',
              borderColor: mode === ThemeMode.light ? '#FFF' : '#000',
              cursor: 'text',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor:
                mode === ThemeMode.light
                  ? 'rgba(30, 81, 93, 0.86)!important'
                  : 'rgba(255, 255, 255, 0.86)!important',
              borderWidth: 2,
            },
          },
        },
      },
    },
  } as ThemeOptions)
