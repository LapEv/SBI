import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { style } from '../data'
import { ButtonSection } from './ButtonsSection'
import { CheckBoxGroup } from 'components/CheckBoxGroup/CheckBoxGroup'

export const DeleteRolesGroup = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [
      { roles, rolesGroup, activeRolesGroup },
      { getRoles, getRolesGroup, deleteRolesGroup, changeRolesGroup },
    ] = useRoles()
    const [selectedGroup, setGroup] = useState<string[]>([])
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      if (!selectedGroup.length && !selectedRoles.length) {
        setErrSelectedItems(true)
        return
      }
      if (selectedGroup.length) {
        deleteRolesGroup(selectedGroup)
        handleModal(false)
        return
      }
      const activeGroup = rolesGroup.filter(
        item => item.id === activeRolesGroup
      )[0]
      const newRoles = activeGroup.roles.filter(
        item => !selectedRoles.includes(item.role as string)
      )
      changeRolesGroup(newRoles, activeRolesGroup)
      handleModal(false)
    }

    const setRolesGroup = (group: string) => {
      const groupData = rolesGroup.find(item => item.groupName === group)
      const listRoles = groupData?.roles.map(item => item.role)
      setSelectedRoles(listRoles as string[])
      setGroup([groupData?.group as string])
      if ([groupData?.group as string] && errSelectedItems)
        setErrSelectedItems(false)
    }

    const setRoles = (role: string) => {
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
            <CheckBoxGroup
              data={item}
              key={`${item}${index}`}
              onChooseGroup={setRolesGroup}
              onChooseItems={setRoles}
              oneGroup={true}
              selectedGroup={selectedGroup}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
        </Box>
        <ButtonSection handleModal={handleModal} btnName="Удалить" />
      </Box>
    )
  }
)
