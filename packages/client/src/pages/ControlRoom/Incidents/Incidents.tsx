import React, { useEffect, useState } from 'react'
import { Box, Container, Modal, Typography, useTheme } from '@mui/material'
import { Message } from 'components/Message/Message'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { menuData } from '.'
import { ChooseModal } from './Modals/ChooseModal'
import { headerForPages, mainHeaderForPages } from 'static/styles'
import { doubleMenuForHeader } from 'static/styles/headerForPages'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate'
import { IconPopoverButton } from 'components/Buttons'
import { useClassifier } from 'hooks/classifier/useClassifier'

export function IncidentsPage() {
  const modalClientRef = React.createRef()
  const [{ admin }] = useAuth()
  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')

  const [
    { models, equipments, typicalMalfunctions },
    { getClassifierModels, getClassifierEquipments, getTypicalMalfunctions },
  ] = useClassifier()

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
    getClassifierEquipments()
    getClassifierModels()
    getTypicalMalfunctions()
  }, [])

  console.log('equipments = ', equipments)
  console.log('models = ', models)
  console.log('typicalMalfunctions = ', typicalMalfunctions)

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
              divider={[2, 4, 6]}
              onClick={checkClickMenu}
              vertical={'bottom'}
            />
          )}
          <IconPopoverButton
            popover={'Создать инцидент'}
            onClick={() => checkClickMenu('newIncident')}
            vertical={'bottom'}
            propsPopover={{ ml: -1, mt: 1 }}
            icon={<AddCircleOutlineIcon />}
          />
          <IconPopoverButton
            popover={'Создать запрос'}
            onClick={() => checkClickMenu('newRequest')}
            vertical={'bottom'}
            propsPopover={{ ml: -1, mt: 1 }}
            icon={<ControlPointDuplicateIcon />}
          />
        </Box>
      </Box>
    </Container>
  )
}
