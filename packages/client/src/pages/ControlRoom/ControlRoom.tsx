import { Box, Container } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'

export function ControlRoomPage() {
  const [{ user }] = useAuth()

  return (
    <Container component="main" maxWidth="md">
      <Box
        bgcolor="background.paper"
        sx={{
          display: 'flex',
          borderRadius: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          my: 10,
          borderWidth: 2,
          borderBlockColor: 'icon.default',
          borderStyle: 'solid',
          p: 3,
        }}>
        ControlRoom
      </Box>
    </Container>
  )
}
