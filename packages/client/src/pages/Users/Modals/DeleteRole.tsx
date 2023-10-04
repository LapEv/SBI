import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { style } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonSection } from './ButtonsSection'

export const DeleteRole = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ roles }, { getRoles, deleteRoles }] = useRoles()
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      if (!selectedRoles.length) {
        setErrSelectedItems(true)
        return
      }

      handleModal(false)
      deleteRoles(selectedRoles)
    }

    const onChooseItems = (role: string) => {
      const itemId = roles.find(item => item.nameRole === role)?.role
      if (selectedRoles.includes(itemId as string)) {
        setSelectedRoles(selectedRoles.filter(value => value !== itemId))
        return
      }
      setSelectedRoles([...selectedRoles, itemId as string])
      if ([...selectedRoles, itemId as string] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getRoles()
    }, [])

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
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни одна роль!'}
        </Box>
        <ButtonSection handleModal={handleModal} btnName="Удалить" />
      </Box>
    )
  }
)
