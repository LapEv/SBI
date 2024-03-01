import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useTheme } from '@mui/material'
import { memo } from 'react'
import { ICalendarIcon } from '../interfaces'

export const CalendarIcon = memo(({ size }: ICalendarIcon) => {
  const theme = useTheme()

  return (
    <CalendarMonthIcon
      sx={{
        fontSize: size,
        color: theme.palette.mode === 'dark' ? '#1E515D' : '#C1EEE1',
      }}
    />
  )
})
