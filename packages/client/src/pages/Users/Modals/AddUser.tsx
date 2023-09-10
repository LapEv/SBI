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
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapProfileInputFieldsAdmin, style } from '../data'
import { ButtonSection } from './ButtonsSection'

export const AddUser = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const theme = useTheme()
    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapProfileInputFieldsAdmin,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    function changeData(data: AddValuesProps) {
      console.log('AddUser changeData = ', changeData)
      // handleChange({
      //   division: data.list[0].value,
      // })
      handleModal(false)
    }

    return (
      <Box sx={style} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography>{title}</Typography>
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
                  inputRef={field.ref}
                  label={label}
                  type={type}
                  variant="outlined"
                  sx={{ width: '90%', m: 2, mt: 2.5, height: 40 }}
                  margin="normal"
                  value={field.value || ''}
                  error={!!(errors?.list ?? [])[index]?.value?.message}
                  helperText={(errors?.list ?? [])[index]?.value?.message}
                  inputProps={{
                    style: {
                      height: 5,
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: 5,
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
        <ButtonSection handleModal={handleModal} />
      </Box>
    )
  }
)
