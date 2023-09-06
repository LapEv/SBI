import { useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton, List } from '@mui/material'
import { Department } from 'store/slices/structure/interfaces'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useAuth } from 'hooks/auth/useAuth'
import { User } from 'storeAuth/interfaces'
import { ListUsers } from './ListUsers'

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
    console.log('open = ', open)
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
        <ListItemText primary={departmentName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {open ? (
        <List sx={{ width: '100%', ml: 2 }}>
          {users
            .filter(value => value.id_division === id_division)
            .map(value => (
              <ListUsers
                firstName={value.firstName}
                lastName={value.lastName}
              />
            ))}
        </List>
      ) : (
        <></>
      )}
    </Box>
  )
}
