import React, { useState } from 'react'
import { Box, Container, Modal, Typography, List } from '@mui/material'
import { Message } from 'components/Message/Message'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { ServiceList, menuData } from '.'
import { ChooseModal } from './Modals/ChooseModal'
import { headerForPages, mainHeaderForPages } from 'static/styles'
import { ServiceDataList } from './data'

export function ServiceLevelPage() {
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
          Уровни сервиса
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
      <List sx={{ width: '100%', p: 3, borderColor: 'border.default' }}>
        {ServiceDataList.map(({ name, label }, index) => (
          <ServiceList name={name} label={label} key={`${label}${index}`} />
        ))}
      </List>
    </Container>
  )
}
