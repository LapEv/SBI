import { useState } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { User } from 'storeAuth/interfaces'
import { RotateButton } from 'components/Buttons/RotateButton'
import { ProfileData } from './'
import { useAuth } from 'hooks/auth/useAuth'

export const ListUsers = (userData: User) => {
  const [{ user }, { getUser }] = useAuth()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
    getUser(userData.id as string)
  }

  return (
    <Box>
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
        <Box>
          <ListItemText
            primary={`${userData.lastName} ${userData.firstName} ${userData.middleName}`}
            sx={{ ml: 4 }}
          />
          <ListItemText
            primary={`${userData.post}`}
            sx={{ ml: 5 }}
            primaryTypographyProps={{ fontSize: '0.875rem!important' }}
          />
        </Box>
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', mt: 4, ml: 5 }}
        in={open}
        timeout="auto"
        unmountOnExit>
        <ProfileData {...userData} />
      </Collapse>
    </Box>
  )
}
