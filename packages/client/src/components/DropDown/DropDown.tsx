import { useState } from 'react'
import { Autocomplete } from '@mui/material'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import { styleTextFieldProps } from '../../pages/Users/data'
import { DataDropDown } from '../../pages/Users/Modals/interfaces'

export const DropDown = ({ data, props, onChange, value }: DataDropDown) => {
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
          borderWidth: 2,
          minHeight: 150,
          maxHeight: 225,
          color: 'green',
          fontSize: 18,
          '& li': {
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
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
          required
          variant="outlined"
          label="Выберите новое подразделение"
          error={errors}
          id={params.id}
          helperText={errors ? 'Не выбрано подразделение!' : ''}
          InputProps={{
            style: {
              ...styleTextFieldProps.inputProps,
              height: 40,
              backgroundColor: theme.palette.background.paper,
              padding: '10px 6px',
            },
            ...params.InputProps,
          }}
          InputLabelProps={{
            style: {
              ...styleTextFieldProps.inputLabelProps,
              color: params.inputProps.value
                ? theme.palette.mode === 'dark'
                  ? '#C1EEE1'
                  : '#1E515D'
                : theme.palette.mode === 'dark'
                ? '#1E515D'
                : '#C1EEE1',
            },
          }}
        />
      )}
    />
  )
}
