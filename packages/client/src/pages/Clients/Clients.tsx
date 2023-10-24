import React, { useEffect, useState } from 'react'
import { Box, Container, Modal, Typography } from '@mui/material'
import { Message } from 'components/Message/Message'
import { useAuth } from 'hooks/auth/useAuth'
import DropDownMenu from 'components/DropDownButtonMenu'
import { menuData } from './data'
import { ChooseModal } from './Modals/ChooseModal'

export function ClientsPage() {
  const modalClientRef = React.createRef()
  const [{ admin }] = useAuth()

  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')

  const checkClickMenu = (name: string | null) => {
    if (name) {
      setModal(true)
      setModalImage(name)
    }
  }

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <Message />
      <Modal
        open={modal}
        onClose={setModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ChooseModal
          ref={modalClientRef}
          modalImage={modalImage}
          handleModal={handleModal}
        />
      </Modal>
      <Box
        component="div"
        sx={{
          width: '100%',
          height: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 5,
          pl: 5,
          pr: 2,
        }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '2.375rem' }}>
          Клиенты
        </Typography>
        {admin && (
          <DropDownMenu
            popover={'Добавить/Удалить'}
            data={menuData}
            divider={[5]}
            onClick={checkClickMenu}
          />
        )}
      </Box>
    </Container>
  )
}
