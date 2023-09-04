import { Box, Container, Modal } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'

export function WarehousePage() {
  const [{ user }, {}] = useAuth()

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
          border: '3px solid #1E515D',
          p: 3,
        }}>
        Warehouse
      </Box>
    </Container>
  )
}
