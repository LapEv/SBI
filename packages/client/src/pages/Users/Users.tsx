import { Box, Container, Typography, List } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { useRoles } from 'hooks/roles/useRoles'
import { useEffect } from 'react'
import { Divisions } from './Divisions'
import { useStructure } from 'hooks/structure/useStructure'

export function UsersPage() {
  const [{ divisions }, { getDivisions }] = useStructure()
  console.log('divisions = ', divisions)

  useEffect(() => {
    getDivisions()
  }, [])

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <Box
        component="div"
        sx={{
          width: '100%',
          height: 60,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          border: '3px solid #1E515D',
          boxShadow: 5,
        }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '2.375rem' }}>
          Пользователи
        </Typography>
      </Box>
      <List sx={{ width: '100%', p: 3 }}>
        {divisions.map(value => (
          <Divisions
            divisionName={value.divisionName}
            division={value.division}
            id={value.id}
          />
        ))}
      </List>
    </Container>
  )
}
