import { Box } from '@mui/material'
import { Button } from 'components/Buttons'

type Handle = {
  handleModal: (state: boolean) => void
  btnName: string
}

export const ButtonSection = ({ handleModal, btnName }: Handle) => {
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
        onClick={() => handleModal(false)}>
        Отмена
      </Button>
    </Box>
  )
}
