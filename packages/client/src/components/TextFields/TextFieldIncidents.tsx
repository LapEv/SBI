import { TextField as MuiTextField, styled } from '@mui/material'
import { ThemeMode } from 'themes/themeConfig'

export const TextFieldIncidents = styled(MuiTextField)(({ theme }) => ({
  '.MuiInputLabel-root': {
    top: -7,
    marginTop: 0,
    color: theme.palette.mode === ThemeMode.light ? '#C1EEE1' : '#1E515D',
    fontWeight: 'normal',
    fontSize: 12,
  },
  '.MuiInputLabel-root.MuiInputLabel-focused': {
    color: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
    fontWeight: 'normal',
    fontSize: 12,
  },
  '.MuiInputLabel-root.Mui-error': {
    color: '#ef5350!important',
    marginTop: -1,
    zIndex: 999,
    fontWeight: 'normal',
    fontSize: 12,
  },
  '.MuiInputLabel-root.MuiInputLabel-shrink': {
    color: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
  },
  '.MuiInputBase-root': {
    fontWeight: 'normal',
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
    color: theme.palette.mode === ThemeMode.light ? '#000000' : '#FFFFFF',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '.MuiFormHelperText-root': {
    height: 0,
    marginTop: -3,
  },
  '.MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '.MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
      color: '#FFF',
    },
  },
  '& .MuiOutlinedInput-input.Mui-disabled': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light ? '#C1EEE1' : '#1E515D',
    WebkitTextFillColor:
      theme.palette.mode === ThemeMode.light
        ? 'rgba(0,0,0,1)'
        : 'rgba(255,255,255,1)',
    borderColor: theme.palette.mode === ThemeMode.light ? '#FFF' : '#000',
    cursor: 'text',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor:
      theme.palette.mode === ThemeMode.light
        ? 'rgba(30, 81, 93, 0.86)!important'
        : 'rgba(255, 255, 255, 0.86)!important',
    borderWidth: 2,
  },
  '.MuiOutlinedInput-input:-webkit-autofill': {
    borderRadius: 0,
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? '#1E515D!important'
        : '#C1EEE1!important',
    WebkitBoxShadow: `0 0 0 100px ${
      theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1'
    } inset`,
    WebkitTextFillColor:
      theme.palette.mode === ThemeMode.light ? '#FFFFFF' : '#000000',
  },
}))
