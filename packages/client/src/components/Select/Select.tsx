import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ISelect } from './interfaces'
import { useTheme, styled } from '@mui/material'
import { ThemeMode } from '../../themes/themeConfig'

const CustomSelect = styled(Select)(({ theme }) => ({
  padding: '0!important',
  paddingLeft: '7px!important',
  paddingRight: '7px!important',
  fontSize: 16,
  borderWidth: 2,
  color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
  borderColor: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
  '&.MuiOutlinedInput-root': {
    '& fieldset': {
      color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
      borderColor:
        theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    },
    '&:hover fieldset': {
      borderColor:
        theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
      borderWidth: 2,
    },
    '&.Mui-focused fieldset': {
      borderColor:
        theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    },
  },
}))

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  '.MuiFormLabel-root': {
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
  },
  '&:hover .MuiFormLabel-root': {
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    fontWeight: 'bold',
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    fontWeight: 'bold',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    fontWeight: 'bold',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
  },
}))

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? 'rgba(222, 240, 235, 0.08)'
        : 'rgba(0, 0, 0, 0.08)',
  },
  '&.Mui-focusVisible': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? 'rgba(222, 240, 235, 0.08)'
        : 'rgba(0, 0, 0, 0.08)',
  },
  ':hover': {
    backgroundColor:
      theme.palette.mode === ThemeMode.light
        ? 'rgba(222, 240, 235, 0.08)'
        : 'rgba(0, 0, 0, 0.08)',
  },
}))

export const SelectMUI = ({
  defaultData,
  label,
  data,
  props,
  onChange,
  value,
}: ISelect) => {
  console.log('data = ', data)
  return (
    <CustomFormControl
      sx={{
        m: 1,
        minWidth: 120,
        width: '50%',
      }}>
      <InputLabel id="select-label-id">{label}</InputLabel>
      <CustomSelect
        sx={{ height: 50 }}
        labelId="select-label"
        id="select-label-id"
        value={value || ''}
        label={label}
        onChange={(event: SelectChangeEvent) =>
          onChange({
            label: event.target.value as string,
            id: event.target.name,
          })
        }>
        {data &&
          data.map(option => {
            return (
              <CustomMenuItem key={option.id} value={option.id}>
                {option.label}
              </CustomMenuItem>
            )
          })}
      </CustomSelect>
    </CustomFormControl>
  )
}
