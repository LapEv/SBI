import { Box } from '@mui/material'
import { Button } from 'components/Buttons'

type Handle = {
  btnName: string
  btnSecondName: string
  btnSecondHandle: () => void
  btnDisabled?: boolean
  btnSecondDisabled?: boolean
  onClick?: () => void
}

export const ButtonsSection = ({
  btnSecondHandle,
  btnName,
  btnSecondName,
  btnDisabled,
  btnSecondDisabled,
  onClick,
}: Handle) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '85%',
        mt: 2,
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
}
