import { Box, Container, Typography, List } from '@mui/material'
import { useEffect } from 'react'
import { Divisions } from './Divisions'
import { useStructure } from 'hooks/structure/useStructure'

export function UsersPage() {
  const [{ divisions }, { getDivisions }] = useStructure()

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
            key={value.id}
          />
        ))}
      </List>
    </Container>
  )
}
