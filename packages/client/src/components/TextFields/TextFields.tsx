import { TextField as MuiTextField, styled } from '@mui/material'
import { ThemeMode } from '../../themes/themeConfig'

export const TextField = styled(MuiTextField)(({ theme }) => ({
  '& label': {
    color: '#FFF',
  },
  '& .MuiInputBase-root': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
      color: '#FFF',
    },
  },
}))
