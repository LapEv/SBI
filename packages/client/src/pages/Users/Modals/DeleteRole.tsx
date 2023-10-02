import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { style } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonSection } from './ButtonsSection'

export const DeleteRole = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ roles }, { getRoles, deleteRoles }] = useRoles()
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])

    const changeData = (event: any) => {
      event.preventDefault()
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
        <ButtonSection handleModal={handleModal} btnName="Удалить" />
      </Box>
    )
  }
)
