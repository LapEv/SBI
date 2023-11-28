import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import { Autocomplete } from 'components/Autocomplete'
import { DataDropDownMultiple, Options } from './interface'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { emptyValue } from '.'

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
  const [fieldValue, setFieldValue] = useState<string>('')

  useEffect(() => {
    console.log('useeffect')
    setErrors(error as boolean)
    console.log('err = ', error)
  }, [error])

  console.log('errors = ', errors)
  console.log('value = ', value)
  console.log('fieldValue = ', fieldValue)

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      sx={{ width: '90%', ...props }}
      options={data}
      getOptionLabel={(option: any) => (option as any).label}
      isOptionEqualToValue={(option, value): any =>
        (option as any).label === (value as any).label || value === emptyValue
      }
      onChange={(_, textValue) =>
        (textValue as any).length
          ? (onChange?.(textValue as Options[]), setErrors(false))
          : (onChange?.(textValue as Options[]), setErrors(true))
      }
      value={value ?? emptyValue}
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
          {...params}
          onBlur={() => {
            console.log('value?.length = ', value?.length)
            if (value?.length) {
              console.log('params start = ', params)
              console.log(
                '1params.inputProps.value = ',
                params.inputProps.value
              )

              params.inputProps.value = value[0].id as string
              console.log(
                '2params.inputProps.value = ',
                params.inputProps.value
              )
              console.log('params end = ', params)
              setFieldValue(value[0].id)
            }
          }}
          variant="outlined"
          label={label}
          error={errors}
          id={params.id}
          value={fieldValue}
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
