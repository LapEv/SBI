import React, { memo } from 'react'
import { ModalProps } from './interfaces'
import { useState, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsSection } from 'components/Buttons'
import { TextField } from 'components/TextFields'

export const DeleteUserModal = memo(
  React.forwardRef<unknown, ModalProps>(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    ({ handleModal, title, answerFromModal }: ModalProps, ref) => {
      /* eslint-enable @typescript-eslint/no-unused-vars */
      const [reasonOfDelete, setReason] = useState<string>('')
      const [errSelectedItems, setErrSelectedItems] = useState<string>('')
      const theme = useTheme()

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!reasonOfDelete.length) {
          setErrSelectedItems('Не указана причина удаления!')
          return
        }
        handleModal(false)
        answerFromModal(true, reasonOfDelete)
      }

      return (
        <Box
          sx={{ ...modalStyle, paddingLeft: 5 }}
          component="form"
          onSubmit={changeData}>
          <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <Box
            sx={{
              mt: 2,
              width: '100%',
              pl: 3,
            }}>
            <TextField
              label="Причина удаления"
              variant="outlined"
              required
              sx={{ width: '100%', mt: 2, height: 40 }}
              margin="normal"
              value={reasonOfDelete || ''}
              onChange={e => setReason(e.target.value ?? '')}
            />
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems}
          </Box>
          <ButtonsSection
            btnSecondHandle={() => answerFromModal(false, reasonOfDelete)}
            btnName="Удалить"
            btnSecondName="Отмена"
            btnDisabled={false}
            btnSecondDisabled={false}
          />
        </Box>
      )
    }
  )
)
