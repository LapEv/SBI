import React, { SyntheticEvent } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DataList } from 'components/CheckBoxGroup/interface'
import { Item } from 'components/CheckBoxGroup'
import { DropDown } from 'components/DropDown'
import { RolesGroupObject } from 'storeRoles/interfaces'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { Options } from 'components/DropDown/interface'

export const ChangeAddress = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ addresses }, { getAddresses, changeAddress }] = useAddresses()
    const [list, setList] = useState<Options[]>([])
    const [selectedAddresses, setSelectedAddresses] = useState<string>('')
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedAddresses.length) {
        setErrSelectedItems(true)
        return
      }
      // const selectedRolesGroupId = rolesGroup.find(
      //   item => item.groupName === selectedGroup
      // )?.id as string
      // const rolesUpdate = roles.filter(item => selectedRoles.includes(item.id))
      // changeRolesGroup(rolesUpdate, selectedRolesGroupId)
      handleModal(false)
    }

    // const onChooseItems = (checked: boolean, id: string) => {
    //   if (!checked) {
    //     setSelectedRoles(selectedRoles.filter(value => value !== id))
    //     return
    //   }
    //   setSelectedRoles([...selectedRoles, id])
    //   if ([...selectedRoles, id] && errSelectedItems) setErrSelectedItems(false)
    // }

    const changeGroup = (data: Options) => {
      console.log('data = ', data)
      console.log('id = ', data.id)
      if (!data) return
      // const newAddress = addresses.find
    }

    useEffect(() => {
      getAddresses()
    }, [])

    useEffect(() => {
      setList(
        addresses.map(item => {
          return {
            ['label']: item.address as string,
            ['id']: item.id as string,
          }
        })
      )
    }, [addresses])

    return (
      <Box
        sx={{ ...modalStyle, paddingLeft: 5 }}
        component="form"
        onSubmit={changeData}>
        <Typography variant={'h6'}>{title}</Typography>
        <DropDown
          data={list}
          props={{ mt: 4 }}
          onChange={data => changeGroup(data)}
          value={selectedAddresses}
          label="Выберите адрес"
          errorLabel="Не выбран адрес!"
        />
        <Box
          sx={{
            mt: 2,
            width: '100%',
            pl: 3,
          }}></Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни один адрес!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName={'Изменить'}
        />
      </Box>
    )
  }
)
