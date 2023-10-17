import React, { useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapDepartmentInputFields, style, styleTextFieldProps } from '../data'
import { ButtonSection } from './ButtonsSection'
import { useStructure } from 'hooks/structure/useStructure'
import { DropDown } from '../../../components/DropDown/DropDown'

export const AddDepartments = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ divisions, departaments }, { addDepartments }] = useStructure()
    const [division, setDivision] = useState<string>('')
    const theme = useTheme()
    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapDepartmentInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    const changeData = ({ list }: AddValuesProps) => {
      const id_division = divisions.find(
        item => item.divisionName === division
      )?.id
      if (!id_division) return
      addDepartments({
        department: list[1].value,
        departmentName: list[0].value,
        division,
        id_division,
      })
      handleModal(false)
    }

    return (
      <Box sx={style} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
        <DropDown
          data={divisions.map(item => {
            return {
              ['categoryName']: item.divisionName as string,
              ['category']: item.division as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={setDivision}
          value={division}
          label="Выберите подразделение"
          errorLabel="Не выбрано подразделение!"
        />
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
                  sx={{ width: '90%', mt: 5, height: 40 }}
                  margin="normal"
                  value={field.value || ''}
                  error={!!(errors?.list ?? [])[index]?.value?.message}
                  helperText={(errors?.list ?? [])[index]?.value?.message}
                  inputProps={{
                    style: {
                      ...styleTextFieldProps.inputProps,
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      ...styleTextFieldProps.inputLabelProps,
                      color: value
                        ? theme.palette.mode === 'dark'
                          ? '#C1EEE1'
                          : '#1E515D'
                        : theme.palette.mode === 'dark'
                        ? '#1E515D'
                        : '#C1EEE1',
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
        <ButtonSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
