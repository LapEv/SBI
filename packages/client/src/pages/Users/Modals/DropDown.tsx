import { useState } from 'react'
import { Autocomplete } from '@mui/material'
import { useTheme } from '@mui/material'
import { TextField } from 'components/TextFields/TextFields'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { styleTextFieldProps } from '../data'
import { Division } from 'store/slices/structure/interfaces'

interface Data {
  data: Division[]
  divisionName?: string
}

export const DropDown = ({ data }: Data) => {
  // const { errors } = useFormState({ control })
  const theme = useTheme()
  const [errors, setErrors] = useState<boolean>(false)

  // console.log('errors = ', errors)
  return (
    <Autocomplete
      id="divisionsDropDown"
      sx={{ width: '90%', mt: 4, height: 40 }}
      // disableClearable
      options={data.map(option => option.divisionName)}
      renderInput={params => (
        console.log('errors = ', params),
        (
          <TextField
            {...params}
            variant="outlined"
            label="Выберите новое подразделение"
            onBlur={() => {
              params.inputProps.value === ''
                ? setErrors(true)
                : setErrors(false)
            }}
            onChange={() => {
              params.inputProps.value === ''
                ? setErrors(true)
                : setErrors(false)
            }}
            // error={!!(errors?.list ?? [])[0]?.value?.message}
            // helperText={(errors?.list ?? [])[0]?.value?.message}
            // error={params.inputProps.value === ''}
            // helperText={'Не выбрано подразделение'}
            error={errors}
            helperText={errors ? 'Не выбрано подразделение!' : ''}
            InputProps={{
              style: {
                ...styleTextFieldProps.inputProps,
                height: 40,
                backgroundColor: theme.palette.background.paper,
              },
              ...params.InputProps,
              type: 'search',
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
        )
      )}
    />
  )
}
