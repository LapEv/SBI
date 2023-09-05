import { Box, Container, Typography, List } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { useRoles } from 'hooks/roles/useRoles'
import { useEffect } from 'react'
import { Divisions } from './Divisions'
import { useStructure } from 'hooks/structure/useStructure'

export function UsersPage() {
  const [{ roles, rolesGroup }, { getRoles, getRolesGroup }] = useRoles()
  const [{ users }, { getUsers }] = useAuth()
  const [{ divisions }, { getDivisions }] = useStructure()
  console.log('divisions = ', divisions)

  console.log('roles = ', roles)
  console.log('rolesGroup = ', rolesGroup)
  console.log('users = ', users)

  useEffect(() => {
    getRoles()
    getRolesGroup()
    getUsers()
    getDivisions()
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
      <List sx={{ width: '100%' }}>
        {divisions.map(value => (
          <Divisions divisionName={value.divisionName} />
        ))}
      </List>
    </Container>
  )
}
