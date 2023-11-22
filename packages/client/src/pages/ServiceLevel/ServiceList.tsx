import { memo, useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton } from 'components/Buttons'
import { IServiceList, IServiceListData } from 'store/slices/sla/interfaces'
import { useSLA } from 'hooks/sla/useSLA'
import { classifier, classifierComponent } from 'static/styles'
import { SLAList } from '.'

export const ServiceList = memo(({ name, label }: IServiceList) => {
  const [{ sla, ola, activeList }, { setActiveList, getSLA, getOLA }] = useSLA()
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<IServiceListData[]>([])

  const handleClick = () => {
    setOpen(!open)
    setActiveList(name as string)
  }

  useEffect(() => {
    setData(
      sla.map(({ sla, id, time, timeStart, timeEnd }) => {
        return {
          sla,
          id,
          time,
          timeStart,
          timeEnd,
        }
      })
    )
  }, [sla])

  useEffect(() => {
    setData(
      ola.map(({ ola, id, time, timeStart, timeEnd }) => {
        return {
          ola,
          id,
          time,
          timeStart,
          timeEnd,
        }
      })
    )
  }, [ola])

  useEffect(() => {
    if (activeList !== name) {
      setOpen(false)
    }
    if (activeList === 'ola') {
      getOLA()
      return
    }
    getSLA()
  }, [activeList])

  return (
    <Box sx={classifier}>
      <ListItemButton
        divider={open}
        sx={classifierComponent}
        onClick={handleClick}>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ fontSize: '1.375rem!important' }}
        />
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {data.map(({ sla, ola, time, timeStart, timeEnd, id }) => (
          <SLAList
            sla={sla}
            ola={ola}
            time={time}
            timeStart={timeStart}
            timeEnd={timeEnd}
            id={id as string}
            key={`${id}`}
          />
        ))}
      </Collapse>
    </Box>
  )
})
