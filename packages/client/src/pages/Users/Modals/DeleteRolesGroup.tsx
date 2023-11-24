import React, { SyntheticEvent } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import { modalStyle, boxDataModal } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { Item } from 'components/CheckBoxGroup'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { SearchIconElement } from 'components/Icons'
import { RolesGroup } from 'storeRoles/interfaces'

export const DeleteRolesGroup = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ rolesGroup }, { getRoles, getRolesGroup, deleteRolesGroup }] =
      useRoles()
    const boxRef = React.createRef<HTMLDivElement>()
    const [height, setHeight] = useState<number | any>()
    const [selectedGroup, setGroup] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [filterText, setFilterText] = useState<string>('')
    const filteredRolesGroups = useFilteredData<RolesGroup>(
      rolesGroup,
      filterText,
      'groupName'
    )
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedGroup.length) {
        setErrSelectedItems(true)
        return
      }
      deleteRolesGroup(selectedGroup)
      handleModal(false)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setGroup(selectedGroup.filter(value => value !== id))
        return
      }
      setGroup([...selectedGroup, id])
      if ([...selectedGroup, id] && errSelectedItems) setErrSelectedItems(false)
    }

    useEffect(() => {
      getRoles()
      getRolesGroup()
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
          {filteredRolesGroups.map(({ groupName, id }) => (
            <Item
              name={groupName}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
