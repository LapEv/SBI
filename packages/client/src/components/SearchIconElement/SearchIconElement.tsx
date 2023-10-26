import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, useTheme } from '@mui/material'

export const SearchIconElement = () => {
  const theme = useTheme()

  return (
    <InputAdornment position="start">
      <SearchIcon
        htmlColor={theme.palette.mode === 'light' ? '#C1EEE1' : '#1E515D'}
      />
    </InputAdornment>
  )
}
