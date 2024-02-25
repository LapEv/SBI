import { Box, Container } from '@mui/material'

export function ClientTechSupport() {
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
        TechSupport
      </Box>
    </Container>
  )
}
