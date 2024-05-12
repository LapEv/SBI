import { Typography } from '@mui/material'
import { memo } from 'react'

interface IPopoverTypography {
  text: string
}

export const PopoverTypography = memo(({ text }: IPopoverTypography) => {
  return (
    <Typography sx={{ p: 1, fontSize: 12, color: 'text.primary' }}>
      {text}
    </Typography>
  )
})
