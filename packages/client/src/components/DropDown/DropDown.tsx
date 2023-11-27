import React, { useState } from 'react'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDown, Options } from './interface'

export const DropDown = ({
  data,
  props,
  onChange,
  onBlur,
  value,
  label,
  errorLabel,
  error,
}: DataDropDown) => {
  const theme = useTheme()
  const [errors, setErrors] = useState<boolean>(error as boolean)

  // console.log('errors = ', errors)

  return (
    <Autocomplete
      clearOnEscape
      autoSelect={false}
      sx={{ width: '90%', height: 40, ...props }}
      options={data}
      noOptionsText={'Нет данных'}
      isOptionEqualToValue={(option, value): any =>
        (option as any).id === (value as any).id
      }
      onChange={(_, textValue) =>
        textValue
          ? (onChange?.(textValue as Options), setErrors(false))
          : setErrors(true)
      }
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
          }}
        />
      )}
    />
  )
}
