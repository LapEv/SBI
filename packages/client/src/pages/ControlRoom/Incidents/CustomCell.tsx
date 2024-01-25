import { memo } from 'react'
import { ICustomCell } from './interfaces'
import { Box } from '@mui/material'
import { customCell } from './data'

export const CustomCell = memo(({ value }: ICustomCell) => {
  return <Box sx={{ ...customCell }}>{value}</Box>
})
