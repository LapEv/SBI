import { useState, useEffect } from 'react'
import { Box, useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDown, Options } from './interface'
import { emptyValue } from '.'

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

  useEffect(() => {
    setErrors(error as boolean)
  }, [error])

  return (
    <Autocomplete
      forcePopupIcon={true}
      clearOnEscape
      autoSelect={false}
      sx={{ width: '90%', height: 40, ...props }}
      options={data}
      noOptionsText={'Нет данных'}
      filterOptions={(option, { inputValue }): any => {
        if (inputValue === '') return option
        const value = inputValue.toLowerCase().trim()
        const displayOptions = option.filter((item): any => {
          if ((item as any).label.toLowerCase().trim().includes(value)) {
            return item
          }
          if (
            (item as any).description &&
            (item as any).description.length &&
            (item as any).description.toLowerCase().trim().includes(value)
          ) {
            return item
          }
          if (
            (item as any).descriptionID &&
            (item as any).descriptionID.length &&
            (item as any).descriptionID.toLowerCase().trim().includes(value)
          ) {
            return item
          }
        })
        return displayOptions ?? []
      }}
      isOptionEqualToValue={(option, value): any => {
        return (
          (option as any).label === value ||
          (option as any).id === value ||
          (option as any).description === value ||
          (option as any).descriptionID === value ||
          value === ''
        )
      }}
      onChange={(_, textValue) =>
        textValue
          ? (onChange?.(textValue as Options), setErrors(false))
          : (onChange?.(emptyValue as Options), setErrors(true))
      }
      value={value ?? ''}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Box
            component="span"
            sx={{
              width: 14,
              height: 14,
              flexShrink: 0,
              borderRadius: '3px',
              mr: 1,
              mt: '2px',
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {(option as any).label}
            <br />
            <span>{(option as any).description}</span>
            <br />
            <span>{(option as any).descriptionID}</span>
          </Box>
        </li>
      )}
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
