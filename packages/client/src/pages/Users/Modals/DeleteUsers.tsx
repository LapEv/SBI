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
    const [{ users }, { deleteUser, getUsers }] = useAuth()
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      if (!selectedUsers.length) {
        setErrSelectedItems(true)
        return
      }
      // handleModal(false)
      console.log('selectedUsers = ', selectedUsers)
      // deleteUser(selectedUsers)
    }

    const onChooseItems = (user: string) => {
      console.log('user = ', user)
      const itemId = users.find(
        item =>
          user.includes(item.firstName as string) &&
          user.includes(item.lastName as string) &&
          user.includes(item.middleName as string)
      )?.id
      if (selectedUsers.includes(itemId as string)) {
        setSelectedUsers(selectedUsers.filter(value => value !== itemId))
        return
      }
      setSelectedUsers([...selectedUsers, itemId as string])
      if ([...selectedUsers, itemId as string] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getUsers({})
    }, [])

    console.log('users = ', users)

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
              nameRole={`${lastName} ${firstName} ${middleName}`}
              comment={post as string}
              id={`${id}${index}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрано ниодного пользователя!'}
        </Box>
        <ButtonSection handleModal={handleModal} btnName="Удалить" />
      </Box>
    )
  }
)
