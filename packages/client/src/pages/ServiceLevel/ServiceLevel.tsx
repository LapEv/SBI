import React, { useEffect, useState } from 'react'
import { Box, Container, Modal, Typography, List } from '@mui/material'
import { Message } from 'components/Message/Message'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownMenu } from 'components/DropDownButtonMenu'
import { SLAList, menuData } from '.'
import { ChooseModal } from './Modals/ChooseModal'
import { headerForPages, mainHeaderForPages } from 'static/styles'
import { useSLA } from 'hooks/sla/useSLA'

export function ServiceLevelPage() {
  const modalClientRef = React.createRef()
  const [{ admin, user }] = useAuth()
  const [{ sla }, { getSLA }] = useSLA()
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
    getSLA()
  }, [])

  console.log('sla = ', sla)

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
          Уровни сервиса
        </Typography>
        {admin && (
          <DropDownMenu
            popover={'Добавить/Удалить'}
            data={menuData}
            divider={[2, 4]}
            onClick={checkClickMenu}
          />
        )}
      </Box>
      <List sx={{ width: '100%', p: 3, borderColor: 'border.default' }}>
        {sla.map(({ sla, id, time, timeStart, timeEnd }) => (
          <SLAList
            sla={sla}
            id={id}
            key={id}
            time={time}
            timeStart={timeStart}
            timeEnd={timeStart}
          />
        ))}
      </List>
    </Container>
  )
}
