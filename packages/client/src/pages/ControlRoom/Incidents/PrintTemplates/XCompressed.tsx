import { Box, Typography } from '@mui/material'
import { useIncidents } from 'hooks/incidents/useINC'
import { memo } from 'react'

export const XCompressed = memo(() => {
  const [{ incidents }] = useIncidents()

  const container = {
    width: '100%',
    height: 177,
    border: '1px solid #000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    p: 0.5,
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
    height: 15,
  }

  const cellRight = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 15,
    alignItems: 'flex-end',
  }

  const label = {
    fontSize: 10,
    verticalAlign: 'center',
  }

  const data = {
    ml: 1,
    fontSize: 10,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'center',
  }

  const footer1 = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 25,
    mt: 0.5,
    borderBottom: '1px solid #000000',
  }

  const footer2 = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 25,
    mt: 0.5,
  }

  const labelComments = {
    fontSize: 9,
    height: 20,
    verticalAlign: 'top',
  }

  const dataComments = {
    ml: 1,
    width: '95%',
    fontSize: 9,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineHeight: '11px',
    maxHeight: '22px',
    webkitLineClamp: 2,
    webkitBoxOrient: 'vertical',
    textAlign: 'left',
    verticalAlign: 'bottom',
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {incidents.map(
        (
          {
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
          },
          index
        ) => {
          return (
            <Box
              sx={{
                p: 1,
                pb: 0.5,
                pt: index <= 1 ? 1 : 0.5,
                pl: index % 2 === 0 ? 1 : 0.5,
                pr: index % 2 === 0 ? 0.5 : 1,
                color: '#000000',
                width: '50%',
                display: 'flex',
              }}
              key={`normal${incident}`}>
              <Box sx={container}>
                <Box sx={containerData}>
                  <Box sx={{ width: '49%', textAlign: 'left' }}>
                    <Typography sx={{ fontSize: 11 }}>
                      Инцидент: {incident}
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
                    <Typography sx={{ fontSize: 10 }}>
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
