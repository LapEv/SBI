import { Autocomplete as MuiAutocomplete, styled } from '@mui/material'
import { ThemeMode } from '../../themes/themeConfig'

export const Autocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  '& input': {
    padding: '0!important',
    paddingLeft: '7px!important',
    paddingRight: '7px!important',
    fontSize: 16,
  },
  '.MuiAutocomplete-endAdornment': {
    top: -2,
  },
  '.MuiAutocomplete-clearIndicator': {
    color: theme.palette.mode === ThemeMode.light ? '#C1EEE1' : '#1E515D',
    '& .MuiSvgIcon-root': {
      width: 25,
      height: 25,
    },
  },
  '.MuiAutocomplete-popupIndicator': {
    color: theme.palette.mode === ThemeMode.light ? '#C1EEE1' : '#1E515D',
    '.MuiSvgIcon-root': {
      width: 40,
      height: 40,
    },
  },
}))
