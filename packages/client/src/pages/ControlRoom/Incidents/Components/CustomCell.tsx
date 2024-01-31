import { memo } from 'react'
import { ICustomCell } from '../interfaces'
import { Box } from '@mui/material'
import { customCell } from '../data'

export const CustomCell = memo(({ value, denseTable }: ICustomCell) => {
  return <Box sx={{ ...customCell, p: denseTable ? 1 : 0 }}>{value}</Box>
})
