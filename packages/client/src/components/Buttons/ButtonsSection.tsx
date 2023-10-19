import { Box } from '@mui/material'
import { Button } from 'components/Buttons'

type Handle = {
  btnName: string
  btnSecondName: string
  btnSecondHandle: () => void
  btnDisabled?: boolean
}

export const ButtonsSection = ({
  btnSecondHandle,
  btnName,
  btnSecondName,
  btnDisabled,
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
        disabled={btnDisabled}>
        {btnName ?? 'Изменить'}
      </Button>
      <Button
        sx={{ width: '40%', fontWeight: 'bold' }}
        onClick={btnSecondHandle}>
        {btnSecondName ?? ''}
      </Button>
    </Box>
  )
}
