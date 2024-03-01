import React, { memo, useEffect, useState } from 'react'
import { Box, Container, Modal, Typography, List } from '@mui/material'
import { Message } from 'components/Message/Message'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { menuData, Equipments } from './'
import { ChooseModal } from './Modals/ChooseModal'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { headerForPages, mainHeaderForPages } from 'static/styles'

export const ClassifierPage = memo(() => {
  const modalClientRef = React.createRef()
  const [{ admin }] = useAuth()
  const [{ equipments }, { getClassifierEquipments, setActiveEquipment }] =
    useClassifier()
  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')

  const checkClickMenu = (name: string | null) => {
    if (name) {
      setModal(true)
      setModalImage(name)
      setActiveEquipment('')
    }
  }

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  useEffect(() => {
    getClassifierEquipments()
  }, [])

  console.log('equipments = ', equipments)

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
            divider={[3, 6]}
            onClick={checkClickMenu}
          />
        )}
      </Box>
      <List sx={{ width: '100%', p: 3, borderColor: 'border.default' }}>
        {equipments.map(
          ({ equipment, id, ClassifierModels, TypicalMalfunctions }) => (
            <Equipments
              equipment={equipment}
              id={id}
              key={id}
              ClassifierModels={ClassifierModels}
              TypicalMalfunctions={TypicalMalfunctions}
            />
          )
        )}
      </List>
    </Container>
  )
})
