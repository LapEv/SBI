import React, { memo, useEffect, useState, SyntheticEvent } from 'react'
import { Box, ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton, EditButton } from 'components/Buttons'
import { ClassifierEquipment } from 'store/slices/classifier/interfaces'
import { classifier, classifierComponent } from 'static/styles'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { ModalChangeName } from 'components/ModaQuestions'
import { useSLA } from 'hooks/sla/useSLA'
import { IServiceListData, SLA } from 'store/slices/sla/interfaces'
import { SLAPage } from './'

export const SLAList = memo((item: IServiceListData) => {
  const [{ activeSLA }, { setActiveSLA, changeSLA, changeOLA }] = useSLA()
  const modalRef = React.createRef()
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState<boolean>(false)

  const handleClick = () => {
    setOpen(!open)
    setActiveSLA(item.id as string)
    // getClassifierModelsById(id as string)
  }

  const editSLA = (event: SyntheticEvent<EventTarget>) => {
    event.stopPropagation()
    setModal(true)
  }

  const changeServiceLevel = (answer: boolean, text: string) => {
    setModal(false)
    if (!answer) return
    // changeClassifierEquipment({
    //   equipment: text,
    //   id: id as string,
    // })
  }

  useEffect(() => {
    if (activeSLA !== item.id) {
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
          answer={changeServiceLevel}
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
          primary={item.sla ?? item.ola}
          primaryTypographyProps={{ fontSize: '1.375rem!important' }}
        />
        <EditButton handleClick={editSLA} size={'1.7rem'} />
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {item.map(({ sla, ola, time } as  , index) => (
          <SLAPage
            sla={sla}
            ola={ola}
            time={time}
            timeStart={timeStart}
            timeEnd={timeEnd}
            id={id as string}
            key={`${id}`}
          />
        ))}
      </Collapse>
    </Box>
  )
})
