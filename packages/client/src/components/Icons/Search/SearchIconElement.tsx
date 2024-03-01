import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, useTheme } from '@mui/material'
import { memo } from 'react'

export const SearchIconElement = memo(() => {
  const theme = useTheme()

  return (
    <InputAdornment position="start">
      <SearchIcon
        htmlColor={theme.palette.mode === 'light' ? '#C1EEE1' : '#1E515D'}
      />
    </InputAdornment>
  )
})
