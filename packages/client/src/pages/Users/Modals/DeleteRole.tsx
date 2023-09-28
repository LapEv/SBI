import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  useTheme,
  Collapse,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { RotateButton } from 'components/Buttons/RotateButton'
import { Nullable } from 'utils/nullableType'
import { useRoles } from 'hooks/roles/useRoles'
import { RolesGroupObject } from 'storeRoles/interfaces'
import { MapRoleInputFields, style, styleTextFieldProps } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonSection } from './ButtonsSection'
import { getRoles } from 'api/roles'

export const DeleteRole = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ roles }, { getRoles, deleteRoles }] = useRoles()
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      deleteRoles(selectedRoles)
      ////    добавлять в api? если записано или ошибку
      //// проверка на уникальность записи, тоже вдавать ошибку
    }

    const onChooseItems = (role: string) => {
      const itemId = roles.find(item => item.nameRole === role)?.role
      if (selectedRoles.includes(itemId as string)) {
        setSelectedRoles(selectedRoles.filter(value => value !== itemId))
        return
      }
      console.log('itemId = ', itemId)
      setSelectedRoles([...selectedRoles, itemId as string])
    }

    useEffect(() => {
      getRoles()
    }, [])

    // useEffect(() => {
    //   console.log('selectedRoles = ', selectedRoles)
    // }, [selectedRoles])

    console.log('roles = ', roles)
    return (
      <Box
        sx={{ ...style, paddingLeft: 5 }}
        component="form"
        onSubmit={changeData}>
        <Typography>{title}</Typography>
        {roles.map(({ nameRole, id }, index) => (
          <Item
            nameRole={nameRole}
            id={`${id}${index}`}
            groupChecked={false}
            onChooseItems={onChooseItems}
            key={id}
          />
        ))}
        <ButtonSection handleModal={handleModal} btnName="Удалить" />
      </Box>
    )
  }
)
