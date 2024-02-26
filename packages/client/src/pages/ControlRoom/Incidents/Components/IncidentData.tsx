import React, { memo, useEffect } from 'react'
import { Box, styled, useTheme } from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { ThemeMode } from '../../../../themes/themeConfig'
import { useApp } from 'hooks/app/useApp'

export interface IncidentDataProps {
  values: any
  setHeight: (height: number) => void
}

interface CellProps {
  label: string
  value: string
}

const Cell = ({ label, value }: CellProps) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        color: theme.palette.mode === ThemeMode.dark ? '#C1EEE1' : '#1E515D',
        width: '100%',
        margin: '3px',
      }}>
      <Box sx={{ fontSize: '0.875rem', width: 120, minWidth: 120 }}>
        {label}
      </Box>
      <Tooltip
        slotProps={{
          popper: {
            sx: {
              [`&.${tooltipClasses.popper}[data-popper-placement="top-start"] .${tooltipClasses.tooltip}`]:
                {
                  margin: 0,
                },
            },
          },
        }}
        arrow
        title={value ?? ''}
        placement="top-start">
        <StyledBox>{value ?? ''}</StyledBox>
      </Tooltip>
    </Box>
  )
}

const StyledBox = styled(Box)(({ theme }) => ({
  '&.MuiBox-root': {
    fontSize: '0.925rem',
    fontWeight: 'bold',
    width: '100%',
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
  memo(({ values, setHeight }: IncidentDataProps) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const boxRef = React.createRef<HTMLDivElement>()
    // const [top, setTop] = useState<number>()
    const [{ dataWidth }] = useApp()

    useEffect(() => {
      setHeight(boxRef?.current?.clientHeight ?? 0)
    }, [])

    return (
      <Box
        ref={boxRef}
        sx={{
          position: 'absolute',
          display: 'flex',
          // flexWrap: 'no-wrap',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: dataWidth,
          // p: 1,
          pl: 1,
          pt: 1,
          pb: 2,
          pr: 5,
        }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Box sx={{ width: 420, minWidth: 420 }}>
            <Cell
              label={'Статус SLA: '}
              value={values.overdue ? 'Просрочен' : 'Не просрочен'}
            />
            <Cell label={'Инцидент: '} value={values.incident} />
            <Cell label={'Номер: '} value={values.numberINC} />
            <Cell label={'Номер клиента: '} value={values.clientINC} />
            <Cell label={'Клиент: '} value={values.legalName} />
            <Cell label={'Клиент (кратко): '} value={values.client} />
            <Cell label={'Контракт: '} value={values.contract} />
            <Cell label={'Объект: '} value={values.object} />
            <Cell label={'Регион: '} value={values.region} />
            <Cell label={'Регион: '} value={values.address} />
            <Cell label={'Координаты: '} value={values.coordinates} />
            {/* <StyledBoxContainer>
              <StyledBoxLabel>Описание: </StyledBoxLabel>
              <StyledBox
                sx={{
                  overflowY: 'auto',
                  height: 75,
                  scrollbarColor: '#6b6b6b #2b2b2b',
                  scrollbarWidth: 'thin',
                  lineHeight: '18px',
                  webkitLineClamp: 2,
                  webkitBoxOrient: 'vertical',
                  textAlign: 'left',
                  verticalAlign: 'bottom',
                  whiteSpace: 'pre-line',
                }}>{values.description ?? ''}</StyledBox>
            </StyledBoxContainer> */}
          </Box>
          <Box sx={{ width: 320, minWidth: 320 }}>
            <Cell label={'Категория: '} value={values.equipment} />
            <Cell label={'Модель: '} value={values.model} />
            <Cell label={'Проблема: '} value={values.typicalMalfunction} />
            <Cell label={'Заявитель: '} value={values.applicant} />
            <Cell label={'Контакты: '} value={values.applicantContacts} />
            <Cell label={'Исполнитель: '} value={values.executor} />
            <Cell label={'Кто принял: '} value={values.userAccepted} />
            <Cell label={'Ответственный: '} value={values.responsible} />
            <Cell label={'SLA: '} value={values.timeSLA} />
            <Cell label={'Регистрация: '} value={values.timeRegistration} />
            <Cell label={'Время в работу: '} value={values.timeInWork} />
          </Box>
          <Box sx={{ width: 'auto' }}>
            <Cell label={'Выполнение: '} value={values.timeCloseCheck} />
            <Cell label={'Перевел: '} value={values.userClosingCheck} />
            <Cell label={'Комментарии: '} value={values.commentCloseCheck} />
            <Cell label={'Акты: '} value={values.act} />
            <Cell label={'ЗИП: '} value={values.spaceParts} />
            <Cell label={'Закрытие: '} value={values.timeClose} />
            <Cell label={'Закрыл: '} value={values.userClosing} />
            <Cell label={'Комментарии: '} value={values.commentClose} />
            <Cell label={'Оценка: '} value={values.rating} />
            <Cell label={'Родительский: '} value={values.parentalIncident} />
            <Cell label={'Связанный: '} value={values.relatedIncident} />
          </Box>
        </Box>
      </Box>
    )
  })
