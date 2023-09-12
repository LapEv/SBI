import { useState, ChangeEvent } from 'react'
import { Autocomplete } from '@mui/material'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { styleTextFieldProps } from '../../pages/Users/data'
import { Department, Division } from 'store/slices/structure/interfaces'
import { DataDropDown } from '../../pages/Users/Modals/interfaces'

export const DropDown = ({ data, props, onBlur }: DataDropDown) => {
  const theme = useTheme()
  const [errors, setErrors] = useState<boolean>(false)

  return (
    <Autocomplete
      id="divisionsDropDown"
      sx={{ width: '90%', mt: 4, height: 40, ...props }}
      options={data.map(option => option.categoryName)}
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
          variant="outlined"
          label="Выберите новое подразделение"
          onBlur={() => {
            params.inputProps.value === '' ? setErrors(true) : setErrors(false)
            onBlur?.(params.inputProps.value as string)
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            params.inputProps.value === '' ? setErrors(true) : setErrors(false)
          }}
          error={errors}
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
