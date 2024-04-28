import { Autocomplete as MuiAutocomplete, styled } from '@mui/material'
import { ThemeMode } from 'themes/themeConfig'

export const Autocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  '& input': {
    padding: '0!important',
    paddingLeft: '7px!important',
    paddingRight: '7px!important',
    fontSize: 12,
  },
  // '.MuiAutocomplete-endAdornment': {
  //   top: -2,
  // },
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

export const AutocompleteIncidents = styled(MuiAutocomplete)(({ theme }) => ({
  '& input': {
    padding: '0!important',
    fontSize: 14,
  },
  '.MuiAutocomplete-input': {
    width: '100%',
  },
  '.MuiAutocomplete-endAdornment': {
    top: -2,
    right: '0!important',
  },
  '.MuiAutocomplete-clearIndicator': {
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    '& .MuiSvgIcon-root': {
      width: 15,
      height: 15,
    },
  },
  '.MuiAutocomplete-popupIndicator': {
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    '.MuiSvgIcon-root': {
      width: 28,
      height: 28,
    },
  },
  '.MuiAutocomplete-popper': {
    width: '120%',
  },
}))
