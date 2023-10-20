import { Box, Container, Modal } from '@mui/material'
import { useState } from 'react'
import { ProfileMain } from './ProfileMain'
import { useAuth } from 'hooks/auth/useAuth'
import { ProfileChangePassword } from './ProfileChangePassword'
import { Message } from 'components/Message/Message'

export function ProfilePage() {
  const [{ user }] = useAuth()
  const [modal, setModal] = useState<boolean>(false)

  return (
    <Container component="main" maxWidth="md" sx={{ m: 5 }}>
      <Box
        sx={{
          display: 'flex',
          borderRadius: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          my: 10,
          borderWidth: 2,
          borderColor: 'border.default',
          borderStyle: 'solid',
          p: 3,
        }}>
        <Message />
        <Modal
          open={modal}
          onClose={setModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <>
            <ProfileChangePassword
              handleModal={setModal}
              userId={user.id as string}
            />
          </>
        </Modal>
        <ProfileMain setModal={() => setModal(prev => !prev)} data={user} />
      </Box>
    </Container>
  )
}
