import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { style } from '../data'
import { ButtonSection } from './ButtonsSection'
import { Item } from 'components/CheckBoxGroup/Item'

export const DeleteRolesGroup = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [
      { rolesGroup },
      { getRoles, getRolesGroup, deleteRolesGroup, setActiveRolesGroup },
    ] = useRoles()
    const [selectedGroup, setGroup] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      if (!selectedGroup.length) {
        setErrSelectedItems(true)
        return
      }
      deleteRolesGroup(selectedGroup)
      handleModal(false)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setGroup(selectedGroup.filter(value => value !== id))
        return
      }
      setGroup([...selectedGroup, id])
      if ([...selectedGroup, id] && errSelectedItems) setErrSelectedItems(false)
    }

    useEffect(() => {
      getRoles()
      getRolesGroup()
    }, [])

    return (
      <Box
        sx={{ ...style, paddingLeft: 5 }}
        component="form"
        onSubmit={changeData}>
        <Typography variant={'h6'}>{title}</Typography>
        <Box
          sx={{
            mt: 2,
            width: '100%',
            pl: 3,
          }}>
          {rolesGroup.map((item, index) => (
            <Item
              name={item.groupName}
              id={`${item.id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={item.id}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
        </Box>
        <ButtonSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
