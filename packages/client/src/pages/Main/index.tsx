import { Box, Container } from '@mui/material'

export function MainPage() {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}></Box>
    </Container>
  )
}
