import { PickersLayout } from '@mui/x-date-pickers/PickersLayout'
import { styled } from '@mui/material'
import { ThemeMode } from '../../themes/themeConfig'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TextField } from 'components/TextFields'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { CalendarIcon, ClearIconElement } from 'components/Icons'
import dayjs from 'dayjs'
import { IDateField } from './interface'

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

export const DateField = ({ dateValue, setDateValue, sx }: IDateField) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        slots={{
          layout: StyledDatePickers as any,
          textField: TextField,
          openPickerIcon: CalendarIcon as any,
          clearIcon: ClearIconElement as any,
        }}
        slotProps={{
          field: { clearable: true },
        }}
        value={dateValue}
        onChange={newValue =>
          setDateValue(dayjs(newValue).format('DD/MM/YYYY') as string)
        }
        views={['day', 'month', 'year']}
        label="Выберите дату"
        format="DD.MM.YYYY"
        sx={sx ?? { width: '90%', mt: 3 }}
      />
    </LocalizationProvider>
  )
}
