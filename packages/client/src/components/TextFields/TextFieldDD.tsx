import { TextField as MuiTextField, styled } from '@mui/material'
import { ITheme, ThemeMode } from 'themes/themeConfig'

export const TextFieldDD = styled(MuiTextField)(({ theme }) => ({
  '.MuiInputLabel-root': {
    top: 0,
    marginTop: 0,
    fontWeight: 'normal',
    color: theme.palette.mode === ThemeMode.light ? '#C1EEE1' : '#1E515D',
    '&.Mui-focused': {
      top: (theme as ITheme).fontSize === 'small' ? -2 : -7,
    },
  },
  '.MuiInputLabel-root.Mui-error': {
    color: '#ef5350!important',
    marginTop: -1,
    zIndex: 999,
    '&.Mui-focused': {
      top: (theme as ITheme).fontSize === 'small' ? -2 : -7,
    },
  },
  '.MuiInputLabel-root.MuiInputLabel-shrink': {
    color: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
    top: (theme as ITheme).fontSize === 'small' ? -2 : -7,
  },
  '.MuiInputBase-root': {
    fontWeight: 'normal',
    borderRadius: 5,
    backgroundColor:
      theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
    color: theme.palette.mode === ThemeMode.light ? '#FFFFFF' : '#000000',
  },
  '.MuiFormHelperText-root': {
    height: 0,
    marginTop: 0,
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
    padding: '0px 14px',
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
