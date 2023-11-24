import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle, boxDataModal } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useAuth } from 'hooks/auth/useAuth'
import { TextField } from 'components/TextFields'
import { User } from 'storeAuth/interfaces'
import { useFilteredData } from 'hooks/useFilteredData'
import { SearchIconElement } from 'components/Icons'

export const DeleteUser = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ users }, { deleteUser, getActiveUsers }] = useAuth()
    const boxRef = React.createRef<HTMLDivElement>()
    const [height, setHeight] = useState<number | any>()
    const [selectedUser, setSelectedUser] = useState<string>('')
    const [reasonOfDelete, setReason] = useState<string>('')
    const [errSelectedItems, setErrSelectedItems] = useState<string>('')
    const [filterText, setFilterText] = useState<string>('')
    const filteredusers = useFilteredData<User>(users, filterText, 'lastName')
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedUser.length) {
        setErrSelectedItems('Не выбрано ниодного пользователя!')
        return
      }
      if (!reasonOfDelete.length) {
        setErrSelectedItems('Не указана причина удаления!')
        return
      }
      handleModal(false)
      deleteUser(selectedUser, reasonOfDelete)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedUser('')
        return
      }
      setSelectedUser(id)
      if (id && reasonOfDelete.length) setErrSelectedItems('')
    }

    useEffect(() => {
      getActiveUsers({})
    }, [])

    const setText = (text: string) => {
      if (!height && boxRef.current) {
        setHeight(boxRef.current!.offsetHeight)
      }
      setFilterText(text)
    }

    return (
      <Box
        sx={{ ...modalStyle, paddingLeft: 5 }}
        component="form"
        onSubmit={changeData}>
        <Typography variant={'h6'}>{title}</Typography>
        <TextField
          variant="outlined"
          sx={{ width: '90%', mt: 2, height: 40 }}
          label="Фильтр по фамилии"
          margin="normal"
          value={filterText || ''}
          onChange={e => setText(e.target.value ?? '')}
          InputProps={{
            endAdornment: <SearchIconElement />,
          }}
        />
        <Box
          ref={boxRef}
          sx={{ ...boxDataModal, height: filterText ? height : 'auto' }}>
          {filteredusers.map(
            ({ lastName, firstName, middleName, post, id }) => (
              <Item
                name={`${lastName} ${firstName} ${middleName}`}
                comment={post as string}
                id={`${id}`}
                groupChecked={false}
                onChooseItems={onChooseItems}
                oneChecked={selectedUser === id ? true : false}
                key={id as string}
              />
            )
          )}
          <TextField
            label="Причина удаления"
            variant="outlined"
            required
            sx={{ width: '100%', mt: 3, height: 40 }}
            margin="normal"
            value={reasonOfDelete || ''}
            onChange={e => setReason(e.target.value ?? '')}
          />
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрано ниодного пользователя!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
