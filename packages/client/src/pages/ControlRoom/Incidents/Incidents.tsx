import React, { useState } from 'react'
import { Box, Container, Modal, Typography, List } from '@mui/material'
import { Message } from 'components/Message/Message'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { menuData } from '.'
import { ChooseModal } from './Modals/ChooseModal'
import { headerForPages, mainHeaderForPages } from 'static/styles'
import { menuDispatcher } from './data'
import { doubleMenuForHeader } from 'static/styles/headerForPages'
// import { ServiceDataList } from './data'

export function IncidentsPage() {
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

  const checkClickMenuDispatcher = (name: string | null) => {
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
          Инциденты
        </Typography>
        <Box sx={doubleMenuForHeader}>
          {admin && (
            <DropDownMenu
              popover={'Добавить/Удалить'}
              data={menuData}
              divider={[1, 2]}
              onClick={checkClickMenu}
              vertical={'bottom'}
            />
          )}
          <DropDownMenu
            popover={'Меню диспетчера'}
            data={menuDispatcher}
            divider={[1, 2]}
            onClick={checkClickMenuDispatcher}
            vertical={'bottom'}
          />
        </Box>
      </Box>
    </Container>
  )
}
