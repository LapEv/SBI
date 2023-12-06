import React, { useEffect, useState, MouseEvent } from 'react'
import {
  Box,
  Container,
  Modal,
  Typography,
  List,
  IconButton,
  useTheme,
  Popover,
} from '@mui/material'
import { Message } from 'components/Message'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { menuData } from './data'
import { ChooseModal } from './Modals/ChooseModal'
import { headerForPages, mainHeaderForPages } from 'static/styles'
import { useClients } from 'hooks/clients/useClients'
import { ClientsList } from './ClientsList'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export function ClientsPage() {
  const modalClientRef = React.createRef()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const openPopover = Boolean(anchorEl)
  const [{ admin }] = useAuth()
  const [{ clients }, { getClients }] = useClients()
  const theme = useTheme()

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
        <IconButton
          onMouseEnter={(event: MouseEvent<HTMLElement>) =>
            setAnchorEl(event.currentTarget)
          }
          onMouseLeave={() => setAnchorEl(null)}
          onClick={AddNewClient}
          size="medium"
          sx={{
            ml: 5,
            width: 40,
            height: 40,
            borderRadius: '20%',
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            boxShadow: 5,
          }}>
          <AddCircleOutlineIcon />
          <Popover
            sx={{
              pointerEvents: 'none',
              background: 'none',
            }}
            open={openPopover}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            onClose={(event: MouseEvent<HTMLElement>) =>
              setAnchorEl(event.currentTarget)
            }
            disableRestoreFocus
            container={anchorEl}>
            <Typography sx={{ p: 1, fontSize: 12, color: 'text.primary' }}>
              Добавить клиента
            </Typography>
          </Popover>
        </IconButton>
      )}
    </Container>
  )
}
