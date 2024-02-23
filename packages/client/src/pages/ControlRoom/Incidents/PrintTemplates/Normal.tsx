import { Box, Typography } from '@mui/material'
import { useIncidents } from 'hooks/incidents/useINC'
import { memo } from 'react'

export const Normal = memo(() => {
  const [{ incidents }] = useIncidents()

  const container = {
    width: '100%',
    height: 264,
    border: '3px solid #000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    p: 1,
  }

  const containerData = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

  const cellLeft = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  }

  const cellRight = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }

  const label = {
    fontSize: 14,
  }

  const data = {
    ml: 1,
    fontSize: 15,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 20,
  }

  const footer1 = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 40,
    mt: 0.5,
    borderBottom: '1px solid #000000',
  }

  const footer2 = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 40,
    mt: 0.5,
  }

  const labelComments = {
    fontSize: 14,
    height: 20,
    verticalAlign: 'top',
  }

  const dataComments = {
    ml: 1,
    width: '95%',
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '18px',
    maxHeight: '36px',
    webkitLineClamp: 2,
    webkitBoxOrient: 'vertical',
    textAlign: 'left',
    verticalAlign: 'bottom',
  }

  return (
    <Box sx={{ width: '100%', height: 'auto' }}>
      {incidents.map(
        ({
          incident,
          clientINC,
          timeSLA,
          client,
          object,
          address,
          coordinates,
          equipment,
          model,
          typicalMalfunction,
          responsible,
          executor,
          applicant,
          applicantContacts,
          description,
          comment,
        }) => {
          return (
            <Box sx={{ p: 1, color: '#000000' }} key={`normal${incident}`}>
              <Box sx={container}>
                <Box sx={containerData}>
                  <Box sx={{ width: '49%', textAlign: 'left' }}>
                    <Typography sx={{ fontSize: 18 }}>
                      Номер инцидента: {incident}
                    </Typography>
                    <Box sx={cellLeft}>
                      <Box sx={label}>Номер клиента:</Box>
                      <Box sx={data}>{clientINC}</Box>
                    </Box>
                    <Box sx={cellLeft}>
                      <Box sx={label}>Клиент: </Box>
                      <Box sx={data}>{client}</Box>
                    </Box>
                    <Box sx={cellLeft}>
                      <Box sx={label}>Объект:</Box>
                      <Box sx={data}>{object}</Box>
                    </Box>
                    <Box sx={cellLeft}>
                      <Box sx={label}>Адрес: </Box>
                      <Box sx={data}>{address}</Box>
                    </Box>
                    <Box sx={cellLeft}>
                      <Box sx={label}>Координаты: </Box>
                      <Box sx={data}>{coordinates}</Box>
                    </Box>
                    <Box sx={cellLeft}>
                      <Box sx={label}>Заявитель: </Box>
                      <Box sx={data}>{applicant}</Box>
                    </Box>
                  </Box>
                  <Box sx={{ width: '49%', textAlign: 'right' }}>
                    <Typography sx={{ fontSize: 16 }}>
                      Крайний срок: {timeSLA}
                    </Typography>
                    <Box sx={cellRight}>
                      <Box sx={label}>'Ответственный:</Box>
                      <Box sx={data}>{responsible}</Box>
                    </Box>
                    <Box sx={cellRight}>
                      <Box sx={label}>Исполнитель:</Box>
                      <Box sx={data}>{executor}</Box>
                    </Box>
                    <Box sx={cellRight}>
                      <Box sx={label}>Классифиактор:</Box>
                      <Box sx={data}>{equipment}</Box>
                    </Box>
                    <Box sx={cellRight}>
                      <Box sx={label}>Модель:</Box>
                      <Box sx={data}>{model}</Box>
                    </Box>
                    <Box sx={cellRight}>
                      <Box sx={label}>Неисправность:</Box>
                      <Box sx={data}>{typicalMalfunction}</Box>
                    </Box>
                    <Box sx={cellRight}>
                      <Box sx={label}>Контакты: </Box>
                      <Box sx={data}>{applicantContacts}</Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={footer1}>
                  <Box sx={label}>Описание:</Box>
                  <Box sx={dataComments}>{description}</Box>
                </Box>
                <Box sx={footer2}>
                  <Box sx={labelComments}>Комментарии:</Box>
                  <Box sx={dataComments}>{comment}</Box>
                </Box>
              </Box>
            </Box>
          )
        }
      )}
    </Box>
  )
})
