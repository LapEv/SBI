import React, { memo, useEffect, useState, SyntheticEvent } from 'react'
import { Box, ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton, EditButton } from 'components/Buttons'
import { ClassifierEquipment } from 'store/slices/classifier/interfaces'
import { classifier, classifierComponent } from 'static/styles'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { ModalChangeName } from 'components/ModaQuestions'
import { useSLA } from 'hooks/sla/useSLA'
import { SLA } from 'store/slices/sla/interfaces'

export const SLAList = memo(({ sla, id, time, timeStart, timeEnd }: SLA) => {
  const [{ activeSLA }, { setActiveSLA }] = useSLA()
  const modalRef = React.createRef()
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState<boolean>(false)

  const handleClick = () => {
    setOpen(!open)
    setActiveSLA(id as string)
    // getClassifierModelsById(id as string)
  }

  const editEquipment = (event: SyntheticEvent<EventTarget>) => {
    event.stopPropagation()
    setModal(true)
  }

  const changeEquipment = (answer: boolean, text: string) => {
    setModal(false)
    // if (!answer) return
    // changeClassifierEquipment({
    //   equipment: text,
    //   id: id as string,
    // })
  }

  useEffect(() => {
    if (activeSLA !== id) {
      setOpen(false)
    }
  }, [activeSLA])

  return (
    <Box sx={classifier}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalChangeName
          answer={changeEquipment}
          handleModal={setModal}
          ref={modalRef}
          question="Введите новое наименование классификатора"
        />
      </Modal>
      <ListItemButton
        divider={open}
        sx={classifierComponent}
        onClick={handleClick}>
        <ListItemText
          primary={sla}
          primaryTypographyProps={{ fontSize: '1.375rem!important' }}
        />
        <EditButton handleClick={editEquipment} size={'1.7rem'} />
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {/* {sla.map(({ model, id, id_equipment }) => (
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
