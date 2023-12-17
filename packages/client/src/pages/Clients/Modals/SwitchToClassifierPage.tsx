import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsSection } from 'components/Buttons'

export const SwitchToClassifierPage = React.forwardRef<
  unknown,
  ChooseModalProps
>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const navigate = useNavigate()

    const changeData = () => {
      handleModal(false)
      navigate('/classifier')
    }

    return (
      <Box sx={{ ...modalStyle, paddingLeft: 5 }}>
        <Typography variant={'h6'} sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <ButtonsSection
          btnSecondHandle={() => handleModal(false)}
          btnName="Перейти"
          btnSecondName="Отмена"
          btnDisabled={false}
          btnSecondDisabled={false}
          onClick={changeData}
        />
      </Box>
    )
  }
)
