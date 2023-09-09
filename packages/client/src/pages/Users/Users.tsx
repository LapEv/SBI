import { Box, Container, Typography, List, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { Divisions } from './Divisions'
import { useStructure } from 'hooks/structure/useStructure'
import DropDownMenu from 'components/DropDownMenu'
import { menuData } from './data'

export function UsersPage() {
  const [{ divisions }, { getDivisions }] = useStructure()
  const [modal, setModal] = useState<boolean>(false)
  const [modalImage, setModalImage] = useState<string>('')

  useEffect(() => {
    getDivisions()
  }, [])

  const checkClickMenu = (name: string | null) => {
    console.log('checkClickMenu = ', name)
    if (name) {
      setModal(true)
      setModalImage(name)
      console.log('modalImage = ', modalImage)
    }
  }

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <Modal
        open={modal}
        onClose={setModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <></>
      </Modal>

      <Box
        component="div"
        sx={{
          width: '100%',
          height: 60,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: 5,
          pl: 5,
          pr: 2,
        }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '2.375rem' }}>
          Пользователи
        </Typography>
        <DropDownMenu
          popover={'Добавить/Удалить'}
          data={menuData}
          divider={[3]}
          onClick={checkClickMenu}
        />
      </Box>
      <List sx={{ width: '100%', p: 3 }}>
        {divisions.map(value => (
          <Divisions
            divisionName={value.divisionName}
            division={value.division}
            id={value.id}
            key={value.id}
          />
        ))}
      </List>
    </Container>
  )
}
