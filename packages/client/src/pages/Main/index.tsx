import { Box, Container } from '@mui/material'

export function MainPage() {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}></Box>
    </Container>
  )
}
