import React, { SyntheticEvent } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Item } from 'components/CheckBoxGroup'
import { DropDown, emptyValue } from 'components/DropDown'
import { RolesGroupObject } from 'storeRoles/interfaces'
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
      const rolesUpdate = roles.filter(item => selectedRoles.includes(item.id))
      changeRolesGroup(rolesUpdate, selectedGroup.id)
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

    const changeGroup = (data: Options) => {
      if (!data) return
      const useRoles = rolesGroup.find(item => item.id === data.id)
        ?.roles as RolesGroupObject[]
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
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName={'Изменить'}
        />
      </Box>
    )
  }
)
