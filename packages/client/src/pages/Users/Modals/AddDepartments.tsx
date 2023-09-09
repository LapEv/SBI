import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields/TextFields'
import { Button } from 'components/Buttons'
import { ChangeDivisionProps, DivisionValuesProps } from './interfaces'
import { MapDivisionInputFields, style } from './data'

export const AddDepartments = React.forwardRef<unknown, ChangeDivisionProps>(
  ({ ref, handleModal, handleChange }) => {
    const theme = useTheme()
    const { handleSubmit, control } = useForm<DivisionValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapDivisionInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    function changePassword(data: DivisionValuesProps) {
      handleChange({
        division: data.list[0].value,
      })
      handleModal(false)
    }

    return (
      <Box sx={style} component="form" onSubmit={handleSubmit(changePassword)}>
        <Typography>Смена пароля</Typography>
        {fields.map(({ id, label, validation, type, value }, index) => {
          return (
            <Controller
              key={id}
              control={control}
              name={`list.${index}.value`}
              rules={validation}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={ref}
                  label={label}
                  type={type}
                  variant="outlined"
                  sx={{ width: '90%', m: 2, mt: 4, height: 40 }}
                  margin="normal"
                  value={field.value || ''}
                  error={!!(errors?.list ?? [])[index]?.value?.message}
                  helperText={(errors?.list ?? [])[index]?.value?.message}
                  inputProps={{
                    style: {
                      height: 5,
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      top: -7,
                      marginTop: 0,
                    },
                  }}
                  FormHelperTextProps={{
                    style: { height: 0, marginTop: -1, zIndex: 999 },
                  }}
                />
              )}
            />
          )
        })}
        <Button type="submit" sx={{ width: '70%', m: 5 }}>
          Изменить
        </Button>
        <Button sx={{ width: '70%' }} onClick={() => handleModal(false)}>
          Отмена
        </Button>
      </Box>
    )
  }
)
