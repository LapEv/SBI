import React, { useEffect, useState } from 'react'
import { Box, Container, Modal, Typography, List } from '@mui/material'
import { Message } from 'components/Message/Message'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { menuData, Equipments } from './'
import { ChooseModal } from './Modals/ChooseModal'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { headerForPages, mainHeaderForPages } from 'static/styles'

export function ClassifierPage() {
  const modalClientRef = React.createRef()
  const [{ admin, user }] = useAuth()
  const [{ equipments }, { getClassifierEquipments }] = useClassifier()
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
    console.log('user = ', user)
    console.log(
      'если идет изменение прав в группе, надо эту группу менять везде'
    )
    getClassifierEquipments()
  }, [])

  console.log('user = ', user)
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
          Классификатор
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
      <List sx={{ width: '100%', p: 3, borderColor: 'border.default' }}>
        {equipments.map(({ equipment, id }) => (
          <Equipments equipment={equipment} id={id} key={id} />
        ))}
      </List>
    </Container>
  )
}
