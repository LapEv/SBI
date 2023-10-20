import { Box, Container, Modal } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { deepEqual } from 'utils/deepEqual'
import { ProfileHeader } from './ProfileHeader'
import { ProfileMain } from './ProfileMain'
import { useAuth } from 'hooks/auth/useAuth'
import { ProfileChangePassword } from './ProfileChangePassword'
import { FileProps } from 'storeAuth/interfaces'
import { isEmptyObjField } from 'utils/isEmptyObject'
import { Message } from 'components/Message/Message'

export function ProfilePage() {
  const [
    { user, userData },
    { changeProfile, changeAvatar, changePassword, updateUserData, checkUser },
  ] = useAuth()
  const [file, setFile] = useState<FileProps>()
  const [modal, setModal] = useState<boolean>(false)

  // useEffect(() => {
  //   if (editStatus === 'cancel') {
  //     updateUserData(user!)
  //     updateEditStatus('info')
  //     setFile({} as FileProps)
  //     return
  //   }
  //   const checkUser = deepEqual(user, userData)
  //   if (checkUser && editStatus === 'save') {
  //     updateEditStatus('info')
  //   }
  //   if (!checkUser && editStatus === 'save') {
  //     changeProfile(userData!)
  //     updateEditStatus('info')
  //   }
  //   if (file && !isEmptyObjField(file! as object) && editStatus === 'save') {
  //     changeAvatar(file!)
  //     updateEditStatus('info')
  //   }
  // }, [editStatus])

  const onChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    // const reader = new FileReader()
    // reader.onloadend = () => {
    //   if (!event.target.files) return
    //   setFile({ info: event.target?.files[0], data: reader.result })
    //   if (editStatus === 'info') {
    //     updateEditStatus('edit')
    //   }
    // }
    // event.target.files instanceof FileList
    //   ? reader.readAsDataURL(event.target.files[0])
    //   : console.log('handle exception')
  }

  return (
    <Container component="main" maxWidth="md" sx={{ m: 5 }}>
      <Box
        sx={{
          display: 'flex',
          borderRadius: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          my: 10,
          borderWidth: 2,
          borderColor: 'border.default',
          borderStyle: 'solid',
          p: 3,
        }}>
        <Message />
        <Modal
          open={modal}
          onClose={setModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <>
            <ProfileChangePassword
              handleModal={setModal}
              userId={user.id as string}
            />
          </>
        </Modal>
        <ProfileHeader
          component="header"
          onChooseFile={onChooseFile}
          fileData={file?.data}
          avatar={user!.avatar}
        />
        <ProfileMain setModal={() => setModal(prev => !prev)} data={user} />
      </Box>
    </Container>
  )
}
