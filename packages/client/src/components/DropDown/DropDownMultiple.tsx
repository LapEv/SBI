import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDownMultiple, Options } from './interface'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export const DropDownMultiple = ({
  data,
  props,
  onChange,
  onBlur,
  value,
  label,
  errorLabel,
  error,
}: DataDropDownMultiple) => {
  const theme = useTheme()
  const [errors, setErrors] = useState<boolean>(error as boolean)

  useEffect(() => {
    setErrors(error as boolean)
  }, [error])

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      sx={{ width: '90%', ...props }}
      options={data}
      isOptionEqualToValue={(option, value): any => (
        console.log('option = ', option),
        console.log('value = ', value),
        (option as any).id === value || value === ''
      )}
      onChange={(_, textValue) => (
        console.log('textValue = ', textValue),
        textValue
          ? (onChange?.(textValue as Options[]), setErrors(false))
          : setErrors(true)
      )}
      value={value ?? ''}
      ListboxProps={{
        sx: {
          borderWidth: 1,
          minHeight: 40,
          maxHeight: 225,
          fontSize: 13,

          '& li': {
            borderColor: theme.palette.mode === 'dark' ? '#1E515D' : '#C1EEE1',
          },
          '& :hover': {
            color: theme.palette.mode === 'dark' ? '#1E515D' : '#C1EEE1',
          },
        },
      }}
      renderInput={params => (
        <TextField
          onBlur={event => (
            !event.target.value ? setErrors(true) : setErrors(false),
            onBlur?.(event.target.value)
          )}
          {...params}
          required
          variant="outlined"
          label={label}
          error={errors}
          id={params.id}
          helperText={errors ? errorLabel : ''}
          InputProps={{
            ...params.InputProps,
            style: { padding: 0, minHeight: 40, height: 'auto' },
          }}
        />
      )}
    />
  )
}
