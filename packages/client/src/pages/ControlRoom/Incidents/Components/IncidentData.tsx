import React, { useEffect } from 'react'
import { Box, styled } from '@mui/material'
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
    '&::-webkit-scrollbar': {
      backgroundColor: '#2b2b2b',
      borderRadius: 8,
      width: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      backgroundColor: '#6b6b6b',
      minHeight: 24,
      border: '3px solid #2b2b2b',
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
        <Box sx={{ width: '33%' }}>
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
          <StyledBoxContainer>
            <StyledBoxLabel>Координаты: </StyledBoxLabel>
            <StyledBox>{`  ${values.coordinates ?? ''}`}</StyledBox>
          </StyledBoxContainer>
        </Box>
        <Box sx={{ width: '33%' }}>
          <StyledBoxContainer>
            <StyledBoxLabel>Категория: </StyledBoxLabel>
            <StyledBox>{`  ${values.equipment ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Модель: </StyledBoxLabel>
            <StyledBox>{`  ${values.model ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Проблема: </StyledBoxLabel>
            <StyledBox>{`  ${values.typicalMalfunction ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Описание: </StyledBoxLabel>
            <StyledBox
              sx={{
                overflowY: 'auto',
                height: 75,
                maxHeight: 75,
                scrollbarColor: '#6b6b6b #2b2b2b',
                scrollbarWidth: 'thin',
              }}>{`  ${values.description ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Комментарий: </StyledBoxLabel>
            <StyledBox
              sx={{
                overflowY: 'auto',
                height: 75,
                maxHeight: 75,
                scrollbarColor: '#6b6b6b #2b2b2b',
                scrollbarWidth: 'thin',
              }}>{`  ${values.comment ?? ''}`}</StyledBox>
          </StyledBoxContainer>
        </Box>
        <Box sx={{ width: '33%' }}>
          <StyledBoxContainer>
            <StyledBoxLabel>Время регистрации: </StyledBoxLabel>
            <StyledBox>{`  ${values.timeRegistration ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Кто принял: </StyledBoxLabel>
            <StyledBox>{`  ${values.userAccepted ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Время в работу: </StyledBoxLabel>
            <StyledBox>{`  ${values.timeInWork ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Исполнитель: </StyledBoxLabel>
            <StyledBox>{`  ${values.executor ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Ответственный: </StyledBoxLabel>
            <StyledBox>{`  ${values.responsible ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Время выполнения: </StyledBoxLabel>
            <StyledBox>{`  ${values.timeCloseCheck ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Перевел в выполнение: </StyledBoxLabel>
            <StyledBox>{`  ${values.userClosing ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Время закрытия: </StyledBoxLabel>
            <StyledBox>{`  ${values.timeClose ?? ''}`}</StyledBox>
          </StyledBoxContainer>
          <StyledBoxContainer>
            <StyledBoxLabel>Закрыл: </StyledBoxLabel>
            <StyledBox>{`  ${values.userClosing ?? ''}`}</StyledBox>
          </StyledBoxContainer>
        </Box>
      </Box>
    )
  }
