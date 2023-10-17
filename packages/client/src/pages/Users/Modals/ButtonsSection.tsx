import { Box } from '@mui/material'
import { Button } from 'components/Buttons'

type Handle = {
  closeModal: (state: boolean) => void
  btnName: string
}

export const ButtonSection = ({ closeModal, btnName }: Handle) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        mt: 3,
        width: '100%',
      }}>
      <Button type="submit" sx={{ width: '40%', fontWeight: 'bold' }}>
        {btnName ?? 'Изменить'}
      </Button>
      <Button
        sx={{ width: '40%', fontWeight: 'bold' }}
        onClick={() => closeModal(false)}>
        Отмена
      </Button>
    </Box>
  )
}
