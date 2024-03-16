import React, { memo, useEffect, useState } from 'react'
import { Box, Container, Modal, Typography, List } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { menuData } from './data'
import { ChooseModal } from './Modals/ChooseModal'
import { headerForPages, mainHeaderForPages, popoverIcon } from 'static/styles'
import { useClients } from 'hooks/clients/useClients'
import { ClientsList } from './ClientsList'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { IconPopoverButton } from 'components/Buttons'

export const ClientsPage = memo(() => {
  const modalClientRef = React.createRef()
  const [{ admin }] = useAuth()
  const [{ clients }, { getClients }] = useClients()

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
    getClients()
  }, [])

  const AddNewClient = () => {
    setModal(true)
    setModalImage('newClient')
  }

  return (
    <Container component="main" maxWidth="md" sx={mainHeaderForPages}>
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
            divider={[5, 8]}
            onClick={checkClickMenu}
          />
        )}
      </Box>
      <List sx={{ width: '100%', p: 3, borderColor: 'border.default' }}>
        {clients.map(({ client, legalName, id }) => (
          <ClientsList client={client} legalName={legalName} id={id} key={id} />
        ))}
      </List>
      {admin && (
        <IconPopoverButton
          popover={'Добавить клиента'}
          onClick={AddNewClient}
          icon={<AddCircleOutlineIcon />}
          propsPopover={{ ml: -1 }}
          sx={popoverIcon}
        />
      )}
    </Container>
  )
})
