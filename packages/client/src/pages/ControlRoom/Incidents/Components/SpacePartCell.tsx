import { memo } from 'react'
import { ISpacePart } from '../interfaces'
import { Box } from '@mui/material'
import { customCell } from '../data'

export const SpacePartCell = memo(({ value, denseTable }: ISpacePart) => {
  return <Box sx={{ ...customCell }}>{value ? value.join(', ') : ''}</Box>
})
