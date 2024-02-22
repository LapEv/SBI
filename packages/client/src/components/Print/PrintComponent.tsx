import { Box, Typography } from '@mui/material'
import ReactToPrint from 'react-to-print'

export const PrintComponent = (contentToPrint: any) => {
  return (
    <Box sx={{ textAlign: 'center' }} style={{ display: 'none' }}>
      <ReactToPrint
        // trigger={() => <Link>Print</Link>}
        content={() => contentToPrint.current!}
      />

      <Box ref={contentToPrint} sx={{ textAlign: 'center' }}>
        <br />

        <Typography variant="h4">Booking details</Typography>
      </Box>
    </Box>
  )
}
