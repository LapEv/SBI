import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { style } from '../data'
import { ButtonSection } from './ButtonsSection'
import { CheckBoxGroup } from 'components/CheckBoxGroup/CheckBoxGroup'
import { isEqualArr } from 'utils/isEqualArr'
import { ListBoxGroup } from 'components/CheckBoxGroup/ListBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'

export const ChangeRolesGroup = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [
      { roles, rolesGroup, activeRolesGroup },
      {
        getRoles,
        getRolesGroup,
        deleteRolesGroup,
        changeRolesGroup,
        setActiveRolesGroup,
      },
    ] = useRoles()
    const [data, setData] = useState<DataList[]>([])
    const [selectedGroup, setGroup] = useState<string>('')
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const [checked, setChecked] = useState(false)

    const changeData = (event: any) => {
      event.preventDefault()
      if (!selectedGroup.length) {
        setErrSelectedItems(true)
        return
      }
      changeRolesGroup(selectedRoles, selectedGroup)
      setActiveRolesGroup('')
      handleModal(false)
    }

    const setRolesGroup = (groupId: string) => {
      if (!groupId.length) {
        setGroup(groupId)
        setSelectedRoles([])
        return
      }
      const groupData = rolesGroup.find(item => item.id === groupId)
      const listRoles = groupData!.roles.map(item => item.id)
      setSelectedRoles(listRoles)
      setGroup(groupId)
      if (groupId.length && errSelectedItems) setErrSelectedItems(false)
    }

    const setRoles = (checked: boolean, id: string) => {
      if (!selectedGroup.length) return
      if (!checked) {
        const newRoles = selectedRoles.filter(item => item !== id)
        const roles = rolesGroup
          .find(item => item.id === selectedGroup)!
          .roles.map(item => item.id)
        const isEqual = isEqualArr(newRoles, roles)
        setSelectedRoles(newRoles)
      } else {
        const newRoles = selectedRoles
        newRoles.push(id)
        const roles = rolesGroup
          .find(item => item.id === selectedGroup)!
          .roles.map(item => item.id)
        const isEqual = isEqualArr(newRoles, roles)
        setSelectedRoles(newRoles as string[])
      }
    }

    useEffect(() => {
      getRoles()
      getRolesGroup()
    }, [])

    const closeModal = () => {
      setActiveRolesGroup('')
      handleModal(false)
    }

    const onChooseItems = () => {
      console.log('onChooseItems')
    }

    console.log('rolesGroup = ', rolesGroup)

    useEffect(() => {
      setData(
        roles.map(item => {
          return {
            name: item.nameRole,
            id: item.id,
            nameId: item.role,
            checked: false,
          }
        })
      )
    }, [roles])

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
          {rolesGroup.map((item, index) =>
            item.group === 'SUPERADMIN' || item.group === 'ADMIN' ? null : (
              <ListBoxGroup
                groupName={item.groupName}
                data={data}
                groupId={item.id}
                groupChecked={checked}
                onChooseItems={onChooseItems}
              />
            )
          )}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
        </Box>
        <ButtonSection closeModal={closeModal} btnName={'Изменить'} />
      </Box>
    )
  }
)
