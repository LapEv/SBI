import { useState, useEffect } from 'react'
import {
  Snackbar,
  Alert,
  AlertTitle,
  AlertColor,
  useTheme,
} from '@mui/material'
import Slide from '@mui/material/Slide'
import { useMessage } from 'hooks/message/useMessage'

function TransitionLeft(props: any) {
  return <Slide {...props} direction="up" />
}

export const Message = () => {
  const [show, setShow] = useState(false)
  const theme = useTheme()

  const [{ type }, { resetMessage }] = useMessage()

  // useEffect(() => {
  //   console.log('message = ', type)
  //   if (message.type) {
  //     setShow(true)
  //   }
  // }, [message.type])

  console.log('type = ', type)
  // console.log('type = ', type)

  return (
    <></>
    // <Snackbar
    //   open={show}
    //   autoHideDuration={3000}
    //   anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    //   message={text}
    //   TransitionComponent={TransitionLeft}
    //   onClose={() => (setShow(false), resetMessage())}>
    //   <Alert
    //     severity={(type as AlertColor) ?? 'success'}
    //     sx={{
    //       borderWidth: 2,
    //       borderStyle: 'solid',
    //       borderColor: theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
    //       borderRadius: 2,
    //       boxShadow: 20,
    //     }}>
    //     <AlertTitle>
    //       {type === 'error'
    //         ? 'Ошибка'
    //         : type === 'warning'
    //         ? 'Предупреждение'
    //         : type === 'info'
    //         ? 'Информация'
    //         : type === 'success'
    //         ? 'Успешно'
    //         : ''}
    //     </AlertTitle>
    //     {text}
    //   </Alert>
    // </Snackbar>
  )
}
