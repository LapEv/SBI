import React, { memo, useEffect, useState, SyntheticEvent } from 'react'
import { Box, ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton, EditButton } from 'components/Buttons'
import { classifier, classifierComponent } from 'static/styles'
import { ModalChangeName } from 'components/ModaQuestions'
import { useClients } from 'hooks/clients/useClients'
import { Clients } from 'store/slices/clients/interfaces'

export const ClientsList = memo(({ client, legalName, id }: Clients) => {
  const [{ activeClient }, { setActiveClient, changeClient }] = useClients()
  const modalRef = React.createRef()
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState<boolean>(false)

  const handleClick = () => {
    setOpen(!open)
    setActiveClient(id as string)
    // getClassifierModelsById(id as string)
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
        {/* {models.map(({ model, id, id_equipment }) => (
          <Models
            model={model}
            id_equipment={id_equipment}
            id={id as string}
            key={`${id_equipment}${id}`}
          />
        ))} */}
      </Collapse>
    </Box>
  )
})
