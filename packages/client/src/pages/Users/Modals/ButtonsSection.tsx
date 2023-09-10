import { Box } from '@mui/material'
import { Button } from 'components/Buttons'

type Handle = {
  handleModal: (state: boolean) => void
}

export const ButtonSection = ({ handleModal }: Handle) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        mt: 3,
        width: '100%',
      }}>
      <Button type="submit" sx={{ width: '40%' }}>
        Изменить
      </Button>
      <Button sx={{ width: '40%' }} onClick={() => handleModal(false)}>
        Отмена
      </Button>
    </Box>
  )
}
