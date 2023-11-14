import React, { useState, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsSection } from 'components/Buttons'
import { TextField } from 'components/TextFields'
import { IModalChangeName } from './interface'

export const ModalChangeName = React.forwardRef<unknown, IModalChangeName>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, question, answer }: IModalChangeName, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [text, setText] = useState<string>('')
    const [errSelectedItems, setErrSelectedItems] = useState<string>('')
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      handleModal(false)
      answer(true, text)
    }

    return (
      <Box
        sx={{ ...modalStyle, paddingLeft: 5 }}
        component="form"
        onSubmit={changeData}>
        <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
          {question}
        </Typography>
        <Box
          sx={{
            mt: 2,
            width: '100%',
            pl: 3,
          }}>
          <TextField
            label="Введите новое наименование"
            variant="outlined"
            required
            sx={{ width: '100%', mt: 2, height: 40 }}
            margin="normal"
            value={text || ''}
            onChange={e => setText(e.target.value ?? '')}
          />
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems}
        </Box>
        <ButtonsSection
          btnSecondHandle={() => answer(false, '')}
          btnName="Сохранить"
          btnSecondName="Отмена"
          btnDisabled={false}
          btnSecondDisabled={false}
        />
      </Box>
    )
  }
)
