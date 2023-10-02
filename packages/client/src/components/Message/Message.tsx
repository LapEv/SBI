import { useState, useEffect } from 'react'
import {
  Snackbar,
  Alert,
  AlertTitle,
  AlertColor,
  useTheme,
} from '@mui/material'
import { useRoles } from 'hooks/roles/useRoles'
import Slide from '@mui/material/Slide'

function TransitionLeft(props: any) {
  return <Slide {...props} direction="up" />
}

export const Message = () => {
  const [show, setShow] = useState(false)
  const theme = useTheme()

  const [{ message }, { resetMessage }] = useRoles()

  useEffect(() => {
    if (message.type) {
      setShow(true)
    }
  }, [message.type])

  return (
    <Snackbar
      open={show}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      message={message.text}
      TransitionComponent={TransitionLeft}
      onClose={() => (setShow(false), resetMessage())}>
      <Alert
        severity={(message.type as AlertColor) ?? 'success'}
        sx={{
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: theme.palette.mode === 'light' ? '#1E515D' : '#C1EEE1',
          borderRadius: 2,
          boxShadow: 20,
        }}>
        <AlertTitle>
          {message.type === 'error'
            ? 'Ошибка'
            : message.type === 'warning'
            ? 'Предупреждение'
            : message.type === 'info'
            ? 'Информация'
            : message.type === 'success'
            ? 'Успешно'
            : ''}
        </AlertTitle>
        {message.text}
      </Alert>
    </Snackbar>
  )
}
