import { memo } from 'react'
import { IconButton, Tooltip, useTheme } from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'

interface PrintData {
  onPrint: () => void
}

export const PrintBar = memo(({ onPrint }: PrintData) => {
  const theme = useTheme()

  return (
    <Tooltip title={'Печать'}>
      <IconButton
        onClick={onPrint}
        sx={{ color: theme.palette.background.paper }}>
        <PrintIcon />
      </IconButton>
    </Tooltip>
  )
})
