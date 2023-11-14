import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, List, Modal } from '@mui/material'
import { useStructure } from 'hooks/structure/useStructure'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { ChooseModal } from './Modals'
import { Divisions } from './'
import { menuData } from './data'
import { useAuth } from 'hooks/auth/useAuth'
import { Message } from 'components/Message'
import { headerForPages, mainHeaderForPages } from 'static/styles'

export function UsersPage() {
  const modalRef = React.createRef()
  const [{ admin }] = useAuth()
  const [{ divisions }, { getDivisions }] = useStructure()
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

  useEffect(() => {
    getDivisions()
  }, [])

  return (
    <Container component="main" maxWidth="md" sx={mainHeaderForPages}>
      <Message />
      <Modal
        open={modal}
        onClose={setModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ChooseModal
          ref={modalRef}
          modalImage={modalImage}
          handleModal={handleModal}
        />
      </Modal>
      <Box component="div" sx={headerForPages}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '2.375rem' }}>
          Пользователи
        </Typography>
        {admin && (
          <DropDownMenu
            popover={'Добавить/Удалить'}
            data={menuData}
            divider={[5, 10]}
            onClick={checkClickMenu}
          />
        )}
      </Box>
      <List sx={{ width: '100%', p: 3, borderColor: 'border.default' }}>
        {divisions.map(value => (
          <Divisions
            divisionName={value.divisionName}
            division={value.division}
            id={value.id}
            key={value.id}
          />
        ))}
      </List>
    </Container>
  )
}
