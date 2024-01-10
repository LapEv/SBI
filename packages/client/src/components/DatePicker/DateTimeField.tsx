import { PickersLayout } from '@mui/x-date-pickers/PickersLayout'
import { styled } from '@mui/material'
import { ThemeMode } from '../../themes/themeConfig'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TextField } from 'components/TextFields'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { CalendarIcon, ClearIconElement } from 'components/Icons'
import { IDateTimeField } from './interface'

const StyledDatePickers = styled(PickersLayout)(({ theme }) => ({
  '.MuiDateCalendar-root': {
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.palette.mode === ThemeMode.dark ? '#FFF' : '#000',
    border: '2px solid',
    backgroundColor:
      theme.palette.mode === ThemeMode.dark ? '#1E515D' : '#C1EEE1',
  },
  '.MuiPickersDay-root': {
    color: theme.palette.mode === ThemeMode.light ? '#1E515D' : '#C1EEE1',
  },
}))

export const DateTimeField = ({
  dateValue,
  setDateValue,
  sx,
}: IDateTimeField) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        slots={{
          layout: StyledDatePickers as any,
          textField: TextField,
          openPickerIcon: CalendarIcon as any,
          clearIcon: ClearIconElement as any,
        }}
        slotProps={{
          field: { clearable: true },
        }}
        value={dateValue ?? null}
        onChange={newValue => {
          setDateValue(newValue!)
        }}
        views={['day', 'month', 'year', 'hours', 'minutes', 'seconds']}
        label="Выберите дату"
        format="DD.MM.YYYY HH:mm:ss"
        sx={sx ?? { width: '90%', mt: 3 }}
        timeSteps={{ minutes: 1, seconds: 1 }}
      />
    </LocalizationProvider>
  )
}
