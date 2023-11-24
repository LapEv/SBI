import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useTheme } from '@mui/material'

interface ICalendarIcon {
  size: string
}
export const CalendarIcon = ({ size }: ICalendarIcon) => {
  const theme = useTheme()

  return (
    <CalendarMonthIcon
      sx={{
        fontSize: size,
        color: theme.palette.mode === 'dark' ? '#1E515D' : '#C1EEE1',
      }}
    />
  )
}
