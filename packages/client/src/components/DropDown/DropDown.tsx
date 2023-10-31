import { useState } from 'react'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import { DataDropDown } from '../../pages/Users/Modals/interfaces'
import { Autocomplete } from 'components/Autocomplete'
import { Data } from 'pages/Clients/Modals/interfaces'

export const DropDown = ({
  data,
  props,
  onChange,
  value,
  label,
  errorLabel,
}: DataDropDown) => {
  const theme = useTheme()
  const [errors, setErrors] = useState<boolean>(false)

  console.log('data = ', data)
  return (
    <Autocomplete
      freeSolo
      forcePopupIcon
      sx={{ width: '90%', height: 40, ...props }}
      options={data}
      getOptionLabel={option => option.categoryName}
      clearOnEscape={true}
      noOptionsText={'Нет данных'}
      onChange={(value, textValue, reason, details) => (
        console.log('value = ', value),
        console.log('textValue = ', textValue),
        console.log('reason = ', reason),
        console.log('details = ', details)
        // onChange?.(textValue as string),
        // !textValue ? setErrors(true) : setErrors(false)
      )}
      value={value}
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
          onBlur={event =>
            !event.target.value ? setErrors(true) : setErrors(false)
          }
          {...params}
          required
          variant="outlined"
          label={label}
          error={errors}
          id={params.id}
          helperText={errors ? errorLabel : ''}
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  )
}
