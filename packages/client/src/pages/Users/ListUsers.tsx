import { useState, memo, useEffect } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { User } from 'storeAuth/interfaces'
import { RotateButton } from 'components/Buttons'
import { ProfileData } from './'
import { useAuth } from 'hooks/auth/useAuth'

export const ListUsers = memo((user: User) => {
  const [{ activeUserInfo }, { getUserInfo, setActiveUserInfo }] = useAuth()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!open) {
      setActiveUserInfo(user.id as string)
    }

    setOpen(!open)
    getUserInfo(user.id as string)
  }

  useEffect(() => {
    if (activeUserInfo !== user.id) {
      setOpen(false)
    }
  }, [activeUserInfo])

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
            primary={`${user.lastName} ${user.firstName} ${user.middleName}`}
            sx={{ ml: 4 }}
          />
          <ListItemText
            primary={`${user.post}`}
            sx={{ ml: 5 }}
            primaryTypographyProps={{ fontSize: '0.875rem!important' }}
          />
        </Box>
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', mt: 4, ml: 5, height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        <ProfileData {...user} />
      </Collapse>
    </Box>
  )
})
