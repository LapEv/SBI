import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapDivisionInputFields } from '../data'
import { style, styleTextFieldProps } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'

export const AddDivision = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [_, { addDivision }] = useStructure()
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const theme = useTheme()
    const { handleSubmit, control } = useForm<AddValuesProps>({
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

    function changeData({ list }: AddValuesProps) {
      addDivision({ division: list[1].value, divisionName: list[0].value })
      handleModal(false)
    }

    return (
      <Box sx={style} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
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
                  sx={{ width: '90%', m: 2, mt: 4, height: 40 }}
                  margin="normal"
                  required
                  value={field.value || ''}
                  error={!!(errors?.list ?? [])[index]?.value?.message}
                  helperText={(errors?.list ?? [])[index]?.value?.message}
                  inputProps={{
                    style: styleTextFieldProps.inputProps,
                  }}
                  InputLabelProps={{
                    style: styleTextFieldProps.inputLabelProps,
                  }}
                  FormHelperTextProps={{
                    style: styleTextFieldProps.formHelperTextProps,
                  }}
                />
              )}
            />
          )
        })}
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
