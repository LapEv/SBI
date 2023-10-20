import { Box } from '@mui/material'
import { Button } from 'components/Buttons'

type Handle = {
  btnName: string
  btnSecondName: string
  btnSecondHandle: () => void
  btnDisabled?: boolean
  btnSecondDisabled?: boolean
}

export const ButtonsSection = ({
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
        type="submit"
        sx={{ width: '40%', fontWeight: 'bold' }}
        disabled={btnDisabled ?? false}>
        {btnName ?? 'Изменить'}
      </Button>
      <Button
        sx={{ width: '40%', fontWeight: 'bold' }}
        onClick={btnSecondHandle}
        disabled={btnSecondDisabled ?? false}>
        {btnSecondName ?? ''}
      </Button>
    </Box>
  )
}
