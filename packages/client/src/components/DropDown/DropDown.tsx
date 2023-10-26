import { useState } from 'react'
import { Autocomplete } from '@mui/material'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import { styleTextFieldProps } from 'static/styles'
import { DataDropDown } from '../../pages/Users/Modals/interfaces'

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

  return (
    <Autocomplete
      freeSolo
      forcePopupIcon
      sx={{ width: '90%', height: 40, ...props }}
      options={data.map(option => option.categoryName)}
      clearOnEscape={true}
      noOptionsText={'Нет данных'}
      onChange={(_, textValue) => (
        onChange?.(textValue as string),
        !textValue ? setErrors(true) : setErrors(false)
      )}
      value={value}
      ListboxProps={{
        sx: {
          borderWidth: 1,
          minHeight: 40,
          maxHeight: 225,
          color: 'green',
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
            style: {
              ...styleTextFieldProps.inputPropsDropDown,
              backgroundColor: theme.palette.background.paper,
            },
            ...params.InputProps,
          }}
          InputLabelProps={{
            style: styleTextFieldProps.inputLabelProps,
          }}
        />
      )}
    />
  )
}
