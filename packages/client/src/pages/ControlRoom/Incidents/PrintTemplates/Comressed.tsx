import { Box, Typography } from '@mui/material'
import { useIncidents } from 'hooks/incidents/useINC'
import { memo } from 'react'

export const Comressed = memo(() => {
  const [{ incidents }] = useIncidents()

  return (
    <Box sx={{ width: '100%', height: 'auto' }}>
      {incidents.map(
        ({ incident, clientINC, timeSLA, client, object, address }) => {
          return (
            <Box sx={{ p: 1 }} key={`comressed${incident}`}>
              <Box
                sx={{
                  width: '100%',
                  height: 262,
                  border: '3px solid #000000',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  p: 1,
                }}>
                <Box>
                  <Typography>Номер инцидента: {incident}</Typography>
                  <Box>Номер клиента: {clientINC}</Box>
                </Box>
                <Box>
                  <Typography>Крайний срок: {timeSLA}</Typography>
                </Box>
              </Box>
            </Box>
          )
        }
      )}
    </Box>
  )
})
