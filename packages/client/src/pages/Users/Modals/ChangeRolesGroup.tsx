import React, { SyntheticEvent } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { modalStyle, boxDataModal } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Item } from 'components/CheckBoxGroup'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'

export const ChangeRolesGroup = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [
      { roles, rolesGroup },
      { getRoles, getRolesGroup, changeRolesGroup },
    ] = useRoles()
    const [data, setData] = useState<DataList[]>([])
    const [selectedGroup, setSelectedGroup] = useState<Options>(emptyValue)
    const [group, setGroup] = useState<Options[]>([])
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedGroup.id.length) {
        setErrSelectedItems(true)
        return
      }
      changeRolesGroup(selectedRoles, selectedGroup.id)
      handleModal(false)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        const delRole = roles.find(item => item.id === id)?.role as string
        setSelectedRoles(selectedRoles.filter(value => value !== delRole))
        return
      }
      const newRole = roles.find(item => item.id === id)?.role as string
      setSelectedRoles([...selectedRoles, newRole])
      if ([...selectedRoles, newRole] && errSelectedItems)
        setErrSelectedItems(false)
    }

    const changeGroup = (data: Options) => {
      if (!data) return
      const useRoles = rolesGroup.find(item => item.id === data.id)?.roles
      setData(
        roles.map(item => {
          return {
            name: item.nameRole,
            id: item.id,
            nameId: item.role,
            initChecked:
              useRoles!.findIndex(value => value === item.role) >= 0
                ? true
                : false,
          }
        })
      )
      setSelectedGroup(data)
      setSelectedRoles(useRoles!)
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
              ['label']: item.groupName as string,
              ['id']: item.id as string,
            }
          })
          .filter(item => item.label !== 'SUPERADMIN')
          .filter(item => item.label !== 'ADMIN')
      )
    }, [rolesGroup])

    return (
      <Box
        sx={{ ...modalStyle, paddingLeft: 5 }}
        component="form"
        onSubmit={changeData}>
        <Typography variant={'h6'}>{title}</Typography>
        <DropDown
          data={group}
          props={{ mt: 4 }}
          onChange={data => changeGroup(data)}
          value={selectedGroup.label}
          label="Выберите группу ролей"
          errorLabel="Не выбрана группа ролей!"
        />
        <Box sx={boxDataModal}>
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
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName={'Изменить'}
        />
      </Box>
    )
  }
)
