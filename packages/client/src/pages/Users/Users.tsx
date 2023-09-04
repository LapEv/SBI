import { Box, Container, Typography } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { useRoles } from 'hooks/roles/useRoles'
import { useEffect } from 'react'

export function UsersPage() {
  const [{ roles, rolesGroup }, { getRoles, getRolesGroup }] = useRoles()
  const [{ users }, { getUsers }] = useAuth()

  console.log('roles = ', roles)
  console.log('rolesGroup = ', rolesGroup)
  console.log('users = ', users)

  useEffect(() => {
    getRoles()
    getRolesGroup()
    getUsers()
  }, [])

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <Box
        component="div"
        sx={{
          width: '100%',
          height: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          mt: 2.5,
        }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '2.375rem' }}>
          Пользователи
        </Typography>
      </Box>
      <Box
        bgcolor="background.paper"
        sx={{
          display: 'flex',
          borderRadius: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          my: 10,
          border: '3px solid #1E515D',
          p: 3,
        }}>
        Users
      </Box>
    </Container>
  )
}
