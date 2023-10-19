import React, { useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapRolesGroupInputFields, style, styleTextFieldProps } from '../data'
import { ButtonsModalSection } from 'components/Buttons'
import { useRoles } from 'hooks/roles/useRoles'
import { Roles, RolesGroup } from 'storeRoles/interfaces'
import { Item } from 'components/CheckBoxGroup/Item'

export const AddRolesGroup = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ roles }, { newRolesGroup, getRolesGroup, getRoles }] = useRoles()
    const theme = useTheme()
    const [selectedItems, setItems] = useState<Roles[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
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
      if (!selectedItems.length) {
        setErrSelectedItems(true)
        return
      }
      const data = {
        group: list[1].value,
        groupName: list[0].value,
        roles: selectedItems,
      }
      newRolesGroup(data as RolesGroup)
      handleModal(false)
    }

    const setRoles = (checked: boolean, id: string) => {
      const itemId = roles.find(item => item.id === id) as Roles
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { createdAt, updatedAt, ...newItem } = itemId
      /* eslint-enable @typescript-eslint/no-unused-vars */
      if (!checked) {
        const newRoles = selectedItems.filter(item => item.id !== newItem.id)
        setItems(newRoles)
      } else {
        const newRoles = selectedItems
        newRoles.push(newItem)
        setItems(newRoles)
        if (errSelectedItems) setErrSelectedItems(false)
      }
    }

    useEffect(() => {
      getRolesGroup()
      getRoles()
    }, [])

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
          {roles.map(item => (
            <Item
              name={item.nameRole}
              id={`${item.id}`}
              onChooseItems={setRoles}
              key={item.id}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни одна роль!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName={'Сохранить'}
        />
      </Box>
    )
  }
)
