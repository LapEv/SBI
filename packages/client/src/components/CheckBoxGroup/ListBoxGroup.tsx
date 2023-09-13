import { useState, useEffect, ChangeEvent } from 'react'
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { RotateButton } from 'components/Buttons/RotateButton'
import { Nullable } from 'utils/nullableType'
import { useRoles } from 'hooks/roles/useRoles'
import { CheckBoxList } from './CheckBoxList'
type NullableString = Nullable<string>

interface ListBoxGroup {
  listName: NullableString
  roles: string[]
  id: string
}

export const ListBoxGroup = ({ listName, roles, id }: ListBoxGroup) => {
  const [open, setOpen] = useState(false)
  const [{ activeRolesGroup }, { setActiveRolesGroup }] = useRoles()

  const handleClick = () => {
    console.log('Click')
    setOpen(!open)
    setActiveRolesGroup(id as string)
  }

  useEffect(() => {
    if (activeRolesGroup !== id) {
      setOpen(false)
    }
  }, [activeRolesGroup])

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
            primary={listName}
            primaryTypographyProps={{ fontSize: '1rem!important' }}
          />
          <RotateButton open={open} handleClick={handleClick} size={'1.5rem'} />
        </>
      </ListItemButton>
      <CheckBoxList open={open} roles={roles} id={id} />
    </Box>
  )
}
