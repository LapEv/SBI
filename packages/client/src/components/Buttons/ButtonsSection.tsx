import { Box } from '@mui/material'
import { Button } from 'components/Buttons'
import { memo } from 'react'
import { HandleSection } from './interfaces'

export const ButtonsSection = memo(
  ({
    btnSecondHandle,
    btnName,
    btnSecondName,
    btnDisabled,
    btnSecondDisabled,
    onClick,
  }: HandleSection) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '85%',
          mt: 2,
          mb: 2,
        }}>
        <Button
          type="submit"
          onClick={onClick}
          sx={{ width: '40%', fontWeight: 'bold' }}
          disabled={btnDisabled ?? true}>
          {btnName ?? 'Изменить'}
        </Button>
        <Button
          sx={{ width: '40%', fontWeight: 'bold' }}
          onClick={btnSecondHandle}
          disabled={btnSecondDisabled ?? true}>
          {btnSecondName ?? ''}
        </Button>
      </Box>
    )
  },
)
