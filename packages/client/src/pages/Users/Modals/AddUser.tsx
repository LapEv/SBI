import React, { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields/TextFields'
import {
  ChooseModalProps,
  AddValuesProps,
  DataDropDown,
  Data,
} from './interfaces'
import { MapProfileInputFieldsAdmin, style, styleTextFieldProps } from '../data'
import { ButtonSection } from './ButtonsSection'
import { useStructure } from 'hooks/structure/useStructure'
import { DropDown } from '../../../components/DropDown/DropDown'
import { useRoles } from 'hooks/roles/useRoles'
import { CheckBoxGroup } from 'components/CheckBoxGroup/CheckBoxGroup'

export const AddUser = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ divisions, departaments }] = useStructure()
    const [{ roles, rolesGroup }, { getRoles, getRolesGroup }] = useRoles()
    const [activeDivision, setActiveDivision] = useState<string>('')
    const [listDepartments, setDepartments] = useState<Data[]>([])
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
      console.log('AddUser changeData = ', data)
      // handleChange({
      //   division: data.list[0].value,
      // })
      handleModal(false)
    }

    const changeActiveDivision = (data: string) => {
      console.log('data = ', data)
      setActiveDivision(data)
    }

    useEffect(() => {
      const id_division = divisions.find(
        value => value.divisionName === activeDivision
      )?.id
      const list = departaments.filter(item => item.id_division === id_division)
      setDepartments(
        list.map(item => {
          return {
            ['categoryName']: item.departmentName as string,
            ['category']: item.department as string,
            ['id']: item.id as string,
          }
        })
      )
    }, [activeDivision])

    useEffect(() => {
      getRoles()
      getRolesGroup()
    }, [])

    console.log('roles = ', roles)
    console.log('rolesGroup = ', rolesGroup)

    return (
      <Box sx={style} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography>{title}</Typography>
        <DropDown
          data={divisions.map(item => {
            return {
              ['categoryName']: item.divisionName as string,
              ['category']: item.division as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onBlur={changeActiveDivision}
        />
        <DropDown data={listDepartments} props={{ mt: 4, mb: 2 }} />
        {/* {fields.map(({ id, label, validation, type, value }, index) => {
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
                  required
                  variant="outlined"
                  sx={{ width: '90%', m: 2, mt: 1.5, height: 40 }}
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
        })} */}
        {/* <CheckBoxGroup data={rolesGroup as []} /> */}
        {rolesGroup.map((item, index) => (
          <CheckBoxGroup data={item} key={`${item}${index}`} />
        ))}
        <ButtonSection handleModal={handleModal} />
      </Box>
    )
  }
)
