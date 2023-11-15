import { Box } from '@mui/material'
import { Button } from 'components/Buttons'

type Handle = {
  btnName: string
  btnSecondName: string
  btnHandle: () => void
  btnSecondHandle: () => void
  btnDisabled?: boolean
  btnSecondDisabled?: boolean
}

export const ButtonsSectionNoSubmit = ({
  btnHandle,
  btnSecondHandle,
  btnName,
  btnSecondName,
  btnDisabled,
  btnSecondDisabled,
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
        onClick={btnHandle}
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
