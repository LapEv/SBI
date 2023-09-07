import { useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import { useAuth } from 'hooks/auth/useAuth'
import { User } from 'storeAuth/interfaces'
import { ListUsers } from './ListUsers'
import { RotateButton } from 'components/Buttons/RotateButton'

interface DPR extends User {
  departmentName: string
}

export const Departments = ({
  departmentName,
  id_division,
  id_department,
}: DPR) => {
  const [{ users }, { getUsers }] = useAuth()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        width: '100%',
      }}>
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
        }}
        onClick={handleClick}>
        <ListItemText primary={departmentName} sx={{ ml: 2 }} />
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse sx={{ width: '100%' }} in={open} timeout="auto" unmountOnExit>
        {users
          .filter(
            value =>
              value.id_division === id_division &&
              value.id_department === id_department
          )
          .map(value => (
            <ListUsers
              firstName={value.firstName}
              lastName={value.lastName}
              key={value.id}
            />
          ))}
      </Collapse>
    </Box>
  )
}
