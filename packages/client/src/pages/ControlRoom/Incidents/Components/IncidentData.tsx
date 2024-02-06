import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography, styled, TableRow } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MultiTextField, TextField } from 'components/TextFields'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { MapIncidentFields } from '../data'
import { useIncidents } from 'hooks/incidents/useINC'
import { DropDown, emptyValue } from 'components/DropDown'
import { useClients } from 'hooks/clients/useClients'
import { Options } from 'components/DropDown/interface'
import { useContracts } from 'hooks/contracts/useContracts'
import { Contracts } from 'store/slices/contracts/interfaces'
import { SLA } from 'store/slices/sla/interfaces'
import { DateTimeField } from 'components/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { getSLATime } from 'utils/getSLATime'
import { useAuth } from 'hooks/auth/useAuth'
import { convertDateToStringDDMMYYYYHHMMSS } from 'utils/convertDate'
import { AddValuesProps, ChooseModalProps } from '../Modals/interfaces'
import { ThemeMode } from '../../../../themes/themeConfig'

export interface IncidentDataProps {
  values: any
  setHeight: (height: number) => void
  // handleModal: (state: boolean) => void
  // title?: string
}

const StyledBoxContainer = styled(Box)(({ theme }) => ({
  '&.MuiBox-root': {
    display: 'flex',
    flexDirection: 'row',
    color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
    width: '100%',
  },
}))

const StyledBoxLabel = styled(Box)(({ theme }) => ({
  '&.MuiBox-root': {
    fontSize: '0.875rem',
    margin: 5,
    width: '35%',
    minWidth: '35%',

    [theme.breakpoints.up('md')]: {
      width: '33%',
      minWidth: '33%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '27%',
      minWidth: '27%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '20%',
      minWidth: '20%',
    },
  },
}))

const StyledBox = styled(Box)(({ theme }) => ({
  '&.MuiBox-root': {
    fontSize: '0.925rem',
    fontWeight: 'bold',
    margin: 5,
    width: '60%',
    minWidth: '60%',

    [theme.breakpoints.up('md')]: {
      width: '62%',
      minWidth: '62%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '69%',
      minWidth: '69%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '75%',
      minWidth: '75%',
    },
  },
}))

export const IncidentData =
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ values, setHeight }: IncidentDataProps) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const boxRef = React.createRef<HTMLDivElement>()
    // const [top, setTop] = useState<number>()

    useEffect(() => {
      setHeight(boxRef?.current?.clientHeight ?? 0)
      // setTop(Number(boxRef?.current?.clientHeight) / 2)
    }, [])

    console.log('values = ', values.incident)
    console.log('values = ', values)

    return (
      <Box
        ref={boxRef}
        sx={{
          position: 'absolute',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          minWidth: 625,
          p: 1,
          pl: 2,
        }}>
        <Box sx={{ width: '50%' }}>
          <StyledBoxContainer>
            <StyledBoxLabel>Инцидент: </StyledBoxLabel>
            <StyledBox>{`  ${values.incident ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Номер: </StyledBoxLabel>
            <StyledBox>{`  ${values.numberINC ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Номер клиента: </StyledBoxLabel>
            <StyledBox>{`  ${values.clientINC ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Клиент: </StyledBoxLabel>
            <StyledBox>{`  ${values.client ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Контракт: </StyledBoxLabel>
            <StyledBox>{`  ${values.contract ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Объект: </StyledBoxLabel>
            <StyledBox>{`  ${values.object ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Регион: </StyledBoxLabel>
            <StyledBox>{`  ${values.region ?? ''}`}</StyledBox>
          </StyledBoxContainer>

          <StyledBoxContainer>
            <StyledBoxLabel>Адрес: </StyledBoxLabel>
            <StyledBox>{`  ${values.address ?? ''}`}</StyledBox>
          </StyledBoxContainer>
        </Box>
        <Box sx={{ width: '50%' }}>
          <StyledBoxContainer>
            <StyledBoxLabel>Категория: </StyledBoxLabel>
            <StyledBox>{`  ${values.equipment ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Модель: </StyledBoxLabel>
            <StyledBox>{`  ${values.model ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Неисправность: </StyledBoxLabel>
            <StyledBox>{`  ${values.typicalMalfunction ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Описание: </StyledBoxLabel>
            <StyledBox
              sx={{
                overflowY: 'auto',
                height: 75,
                maxHeight: 75,
              }}>{`  ${values.description ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Комментарий: </StyledBoxLabel>
            <StyledBox
              sx={{
                overflowY: 'auto',
                height: 75,
                maxHeight: 75,
              }}>{`  ${values.comment ?? ''}`}</StyledBox>
          </StyledBoxContainer>
        </Box>
      </Box>
    )
  }
