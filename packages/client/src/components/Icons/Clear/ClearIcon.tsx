import ClearIcon from '@mui/icons-material/Clear'
import { useTheme } from '@mui/material'
import { memo } from 'react'
import { IClearIcon } from '../interfaces'

export const ClearIconElement = memo(({ size }: IClearIcon) => {
  const theme = useTheme()

  return (
    <ClearIcon
      sx={{
        fontSize: size,
        color: theme.palette.mode === 'dark' ? '#1E515D' : '#C1EEE1',
      }}
    />
  )
})
