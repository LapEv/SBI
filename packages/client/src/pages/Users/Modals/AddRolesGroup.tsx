import React, { memo, useEffect, useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapRolesGroupInputFields } from '../data'
import { boxDataModal, modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useRoles } from 'hooks/roles/useRoles'
import { Roles, RolesGroup } from 'storeRoles/interfaces'
import { Item } from 'components/CheckBoxGroup'

export const AddRolesGroup = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
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
          roles: selectedItems.map(item => item.role),
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
        <Box
          ref={ref}
          tabIndex={-1}
          sx={modalStyle}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          {fields.map(({ id, label, validation, type, required }, index) => {
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
                    required={required ?? true}
                    value={field.value || ''}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
          <Box sx={boxDataModal}>
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
)
