import React, { memo, useEffect, useState, SyntheticEvent } from 'react'
import {
  Box,
  ListItemText,
  ListItemButton,
  Modal,
  IconButton,
} from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton, EditButton } from 'components/Buttons'
import { classifier, classifierComponent } from 'static/styles'
import { ModalChangeName } from 'components/ModaQuestions'
import { useClients } from 'hooks/clients/useClients'
import { Clients } from 'store/slices/clients/interfaces'
import { useContracts } from 'hooks/contracts/useContracts'
import { ContractsList } from './'
import { useAuth } from 'hooks/auth/useAuth'
import { ChooseModal } from 'pages/Users/Modals'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useTheme } from '@mui/material/styles'

export const ClientsList = memo(({ client, legalName, id }: Clients) => {
  const [{ activeClient }, { setActiveClient, changeClient }] = useClients()
  const [{ contracts }, { getContractsByClientID }] = useContracts()
  const modalRef = React.createRef()
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')
  const modalContractRef = React.createRef()
  const [modalNewContract, setModalNewContract] = useState<boolean>(false)
  const [{ admin }] = useAuth()
  const theme = useTheme()

  const handleClick = () => {
    setOpen(!open)
    setActiveClient(id as string)
    getContractsByClientID(activeClient as string)
  }

  const editClient = (event: SyntheticEvent<EventTarget>) => {
    event.stopPropagation()
    setModal(true)
  }

  const changeClientName = (answer: boolean, text: string) => {
    setModal(false)
    if (!answer) return
    changeClient({
      client: text,
      legalName,
      id: id as string,
    })
  }

  useEffect(() => {
    if (activeClient !== id) {
      setOpen(false)
    }
  }, [activeClient])

  const AddNewContract = () => {
    setModal(true)
    setModalImage('newContract')
  }

  return (
    <Box sx={classifier}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalChangeName
          answer={changeClientName}
          handleModal={setModal}
          ref={modalRef}
          question="Введите новое наименование клиента"
        />
      </Modal>
      <Modal
        open={modalNewContract}
        onClose={setModalNewContract}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ChooseModal
          ref={modalContractRef}
          modalImage={modalImage}
          handleModal={setModalNewContract}
        />
      </Modal>

      <ListItemButton
        divider={open}
        sx={classifierComponent}
        onClick={handleClick}>
        <ListItemText
          primary={client}
          secondary={legalName}
          primaryTypographyProps={{ fontSize: '1.375rem!important' }}
        />
        <EditButton handleClick={editClient} size={'1.7rem'} />
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {contracts.map(
          ({ contract, id, number, date, sla, equipment, objects }) => (
            <ContractsList
              contract={contract}
              id={id as string}
              number={number}
              date={date}
              sla={sla}
              equipment={equipment}
              objects={objects}
              id_client={id as string}
              key={id}
            />
          )
        )}
      </Collapse>
      {admin && (
        <IconButton
          onClick={AddNewContract}
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
        </IconButton>
      )}
    </Box>
  )
})
