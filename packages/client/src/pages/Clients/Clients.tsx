import React, { useEffect, useState } from 'react'
import { Box, Container, Modal, Typography } from '@mui/material'
import { Message } from 'components/Message'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { menuData } from './data'
import { ChooseModal } from './Modals/ChooseModal'
import { headerForPages, mainHeaderForPages } from 'static/styles'

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
    <Container component="main" maxWidth="md" sx={mainHeaderForPages}>
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
      <Box component="div" sx={headerForPages}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '2.375rem' }}>
          Клиенты
        </Typography>
        {admin && (
          <DropDownMenu
            popover={'Добавить/Удалить'}
            data={menuData}
            divider={[2, 4]}
            onClick={checkClickMenu}
          />
        )}
      </Box>
    </Container>
  )
}
