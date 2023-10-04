import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { style } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonSection } from './ButtonsSection'
import { Nullable } from 'utils/nullableType'
import { CheckBoxGroup } from 'components/CheckBoxGroup/CheckBoxGroup'
import { deleteRolesGroup } from 'api/roles'
import { RolesActions } from 'hooks/roles/rolesActions'
import { RolesGroup } from 'storeRoles/interfaces'
type NullableString = Nullable<string>

export const DeleteRolesGroup = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [
      { roles, rolesGroup, activeRolesGroup },
      { getRoles, getRolesGroup },
    ] = useRoles()
    const [selectedGroup, setGroup] = useState<NullableString[]>([])
    const [selectedRoles, setSelectedRoles] = useState<NullableString[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      // deleteRoles(selectedRoles)
      console.log('selectedRoles = ', selectedRoles)
      console.log('selectedGroup = ', selectedGroup)
      console.log('activeRolesGroup = ', activeRolesGroup)
      console.log('rolesGroup = ', rolesGroup)
      if (!selectedGroup.length && !selectedRoles.length) {
        setErrSelectedItems(true)
        return
      }
      // if (selectedGroup.length) {
      //   deleteRolesGroup(selectedGroup as RolesGroup[])
      // }
      handleModal(false)
    }

    const setRolesGroup = (group: string) => {
      const groupData = rolesGroup.find(item => item.groupName === group)
      const listRoles = groupData?.roles.map(item => item.role)
      setSelectedRoles(listRoles as NullableString[])
      setGroup([groupData?.group as NullableString])
      if ([groupData?.group as NullableString] && errSelectedItems)
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
        <Typography>{title}</Typography>
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
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
        </Box>
        <ButtonSection handleModal={handleModal} btnName="Удалить" />
      </Box>
    )
  }
)
