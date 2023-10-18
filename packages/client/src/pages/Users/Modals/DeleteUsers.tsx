import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { style } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonSection } from './ButtonsSection'
import { useAuth } from 'hooks/auth/useAuth'

export const DeleteUsers = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ users }, { deleteUsers, getActiveUsers }] = useAuth()
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      if (!selectedUsers.length) {
        setErrSelectedItems(true)
        return
      }
      handleModal(false)
      deleteUsers(selectedUsers)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedUsers(selectedUsers.filter(value => value !== id))
        return
      }
      setSelectedUsers([...selectedUsers, id])
      if ([...selectedUsers, id] && errSelectedItems) setErrSelectedItems(false)
    }

    useEffect(() => {
      getActiveUsers({})
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
          {users.map(({ lastName, firstName, middleName, post, id }, index) => (
            <Item
              name={`${lastName} ${firstName} ${middleName}`}
              comment={post as string}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрано ниодного пользователя!'}
        </Box>
        <ButtonSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
