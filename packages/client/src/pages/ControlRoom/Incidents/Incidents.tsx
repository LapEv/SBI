import { useEffect, memo } from 'react'
import { Box, Container } from '@mui/material'
import { Message } from 'components/Message/Message'
import { useAuth } from 'hooks/auth/useAuth'
import { TableIncidents } from '.'
import { mainHeaderForINCPage } from 'static/styles'
import { useIncidents } from 'hooks/incidents/useINC'

export const IncidentsPage = memo(() => {
  const [, { getFieldEngineers, getDispatchers }] = useAuth()
  const [, { getIncidentStatuses, getTypesCompletedWork }] = useIncidents()

  useEffect(() => {
    getFieldEngineers()
    getDispatchers()
    getIncidentStatuses()
    getTypesCompletedWork()
  }, [])

  return (
    <Container component="main" maxWidth="md" sx={mainHeaderForINCPage}>
      <Message />
      <Box sx={{ width: '100%', padding: 1 }}>
        <TableIncidents />
      </Box>
    </Container>
  )
})
