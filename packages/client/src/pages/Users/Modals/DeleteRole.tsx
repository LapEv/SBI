import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { style } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'

export const DeleteRole = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ roles }, { getRoles, deleteRoles }] = useRoles()
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedRoles.length) {
        setErrSelectedItems(true)
        return
      }

      handleModal(false)
      deleteRoles(selectedRoles)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedRoles(selectedRoles.filter(value => value !== id))
        return
      }
      setSelectedRoles([...selectedRoles, id])
      if ([...selectedRoles, id] && errSelectedItems) setErrSelectedItems(false)
    }

    useEffect(() => {
      getRoles()
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
          {roles.map(({ nameRole, id }) => (
            <Item
              name={nameRole}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни одна роль!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
