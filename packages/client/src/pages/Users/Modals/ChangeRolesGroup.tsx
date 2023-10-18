import React from 'react'
import { ChooseModalProps, Data } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { style } from '../data'
import { ButtonSection } from './ButtonsSection'
import { CheckBoxGroup } from 'components/CheckBoxGroup/CheckBoxGroup'
import { isEqualArr } from 'utils/isEqualArr'
import { ListBoxGroup } from 'components/CheckBoxGroup/ListBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Item } from 'components/CheckBoxGroup/Item'
import { DropDown } from 'components/DropDown/DropDown'

export const ChangeRolesGroup = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [
      { roles, rolesGroup },
      { getRoles, getRolesGroup, changeRolesGroup, setActiveRolesGroup },
    ] = useRoles()
    const [data, setData] = useState<DataList[]>([])
    const [selectedGroup, setSelectedGroup] = useState<string>('')
    const [group, setGroup] = useState<Data[]>([])
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      if (!selectedGroup.length) {
        setErrSelectedItems(true)
        return
      }
      const selectedRolesGroupId = rolesGroup.find(
        item => item.groupName === selectedGroup
      )!.id
      const rolesUpdate = roles.filter(item => selectedRoles.includes(item.id))
      changeRolesGroup(rolesUpdate, selectedRolesGroupId)
      handleModal(false)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedRoles(selectedRoles.filter(value => value !== id))
        return
      }
      setSelectedRoles([...selectedRoles, id])
      if ([...selectedRoles, id] && errSelectedItems) setErrSelectedItems(false)
    }

    const changeGroup = (data: string) => {
      if (!data) return
      const useRoles = rolesGroup.find(item => item.groupName === data)!.roles
      setData(
        roles.map(item => {
          return {
            name: item.nameRole,
            id: item.id,
            nameId: item.role,
            initChecked:
              useRoles.findIndex(value => value.id === item.id) >= 0
                ? true
                : false,
          }
        })
      )
      setSelectedGroup(data)
      setSelectedRoles(useRoles.map(item => item.id))
    }

    useEffect(() => {
      getRoles()
      getRolesGroup()
    }, [])

    useEffect(() => {
      setGroup(
        rolesGroup
          .map(item => {
            return {
              ['categoryName']: item.groupName as string,
              ['category']: item.group as string,
              ['id']: item.id as string,
            }
          })
          .filter(item => item.category !== 'SUPERADMIN')
          .filter(item => item.category !== 'ADMIN')
      )
    }, [rolesGroup])

    return (
      <Box
        sx={{ ...style, paddingLeft: 5 }}
        component="form"
        onSubmit={changeData}>
        <Typography variant={'h6'}>{title}</Typography>
        <DropDown
          data={group}
          props={{ mt: 4 }}
          onChange={data => changeGroup(data)}
          value={selectedGroup}
          label="Выберите группу ролей"
          errorLabel="Не выбрана группа ролей!"
        />
        <Box
          sx={{
            mt: 2,
            width: '100%',
            pl: 3,
          }}>
          {data.map(({ name, id, initChecked }) => (
            <Item
              name={name}
              id={`${id}`}
              groupChecked={null}
              onChooseItems={onChooseItems}
              key={id}
              initChecked={initChecked}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
        </Box>
        <ButtonSection
          closeModal={() => handleModal(false)}
          btnName={'Изменить'}
        />
      </Box>
    )
  }
)
