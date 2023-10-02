import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme, FormControlLabel } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapRolesGroupInputFields, style, styleTextFieldProps } from '../data'
import { ButtonSection } from './ButtonsSection'
import { useRoles } from 'hooks/roles/useRoles'
import { Roles, RolesGroup } from 'storeRoles/interfaces'
import { ListBoxGroup } from 'components/CheckBoxGroup/ListBoxGroup'
import { Item } from 'components/CheckBoxGroup/Item'
import { Nullable } from 'utils/nullableType'
type NullableString = Nullable<string>

export const AddRolesGroup = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ rolesGroup, roles }, { newRolesGroup, getRolesGroup, getRoles }] =
      useRoles()
    const theme = useTheme()
    const [selectedItems, setItems] = useState<NullableString[]>([])

    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapRolesGroupInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    function changeData({ list }: AddValuesProps) {
      console.log('list = ', list)
      console.log('selectedItems = ', selectedItems)
      const selectedRoles = roles.filter(item => {
        if (selectedItems.includes(item.role)) {
          return item
        }
      })

      console.log(
        'если selectedRoles не выбрано ничего выдать ошибку и у Удаление ролей и группы ролей тоже'
      )
      const data = {
        group: list[1].value,
        groupName: list[0].value,
        roles: selectedRoles,
      }
      // newRolesGroup(data as RolesGroup)
      handleModal(false)
    }

    const setRoles = (role: string) => {
      console.log('setRoles = ', setRoles)
      const itemId = roles.find(item => item.nameRole === role)?.role
      if (selectedItems.includes(itemId as string)) {
        setItems(selectedItems.filter(value => value !== itemId))
        return
      }
      setItems([...selectedItems, itemId as string])
    }

    console.log('rolesGroup = ', rolesGroup)
    console.log('roles = ', roles)

    useEffect(() => {
      getRolesGroup()
      getRoles()
    }, [])

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
                  sx={{ width: '90%', m: 2, mt: 4, height: 40 }}
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
                      top: -7,
                      marginTop: 0,
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
        <Box sx={{ m: 2 }}>
          {roles.map((item, index) => (
            <Item
              nameRole={item.nameRole}
              id={`${item.id}${index}`}
              onChooseItems={setRoles}
              key={item.id}
            />
          ))}
        </Box>

        <ButtonSection handleModal={handleModal} btnName={'Сохранить'} />
      </Box>
    )
  }
)
