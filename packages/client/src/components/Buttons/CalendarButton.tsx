import IconButton from '@mui/material/IconButton'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

interface ICalendarButton {
  size: string
}
export const CalendarButton = ({ size }: ICalendarButton) => {
  return (
    <IconButton>
      <CalendarMonthIcon sx={{ fontSize: size }} />
    </IconButton>
  )
}
