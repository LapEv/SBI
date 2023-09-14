import { useState, useEffect } from 'react'
import { Box, Collapse, ListItemButton, ListItemText } from '@mui/material'
import { RotateButton } from 'components/Buttons/RotateButton'
import { Nullable } from 'utils/nullableType'
import { useRoles } from 'hooks/roles/useRoles'
import { RolesGroupObject } from 'storeRoles/interfaces'
import { Item } from './Item'
type NullableString = Nullable<string>

interface ListBoxGroup {
  groupName: NullableString
  roles: RolesGroupObject[]
  groupId: string
  groupChecked: boolean
}

export const ListBoxGroup = ({
  groupName,
  roles,
  groupId,
  groupChecked,
}: ListBoxGroup) => {
  const [open, setOpen] = useState(false)
  const [{ activeRolesGroup }, { setActiveRolesGroup }] = useRoles()

  const handleClick = () => {
    setOpen(!open)
    !open ? setActiveRolesGroup(groupId) : setActiveRolesGroup('')
  }

  useEffect(() => {
    if (activeRolesGroup !== groupId) {
      setOpen(false)
    }
  }, [activeRolesGroup])

  useEffect(() => {
    groupChecked && activeRolesGroup !== groupId
      ? (setOpen(true), setActiveRolesGroup(groupId))
      : null
  }, [groupChecked])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <ListItemButton
        divider={open}
        sx={{
          fontWeight: 'bold',
          fontSize: '1rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'space-between',
          justifyContent: 'space-between',
          padding: 0,
        }}
        onClick={handleClick}>
        <>
          <ListItemText
            primary={groupName}
            primaryTypographyProps={{ fontSize: '1rem!important' }}
          />
          <RotateButton open={open} handleClick={handleClick} size={'1.5rem'} />
        </>
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {roles.map(({ nameRole, id }) => (
          <Item
            nameRole={nameRole}
            id={id}
            groupChecked={groupChecked}
            key={id}
          />
        ))}
      </Collapse>
    </Box>
  )
}
