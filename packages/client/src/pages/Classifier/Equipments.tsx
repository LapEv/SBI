import { memo, useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { RotateButton } from 'components/Buttons'
import { ClassifierEquipment } from 'store/slices/classifier/interfaces'
import { classifier, classifierComponent } from 'static/styles'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { Models } from './Models'

export const Equipments = memo(({ equipment, id }: ClassifierEquipment) => {
  const [
    { models, activeEquipment },
    { getClassifierModelsById, setActiveEquipment },
  ] = useClassifier()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log('getClassifierModelsById')
    getClassifierModelsById(id as string)
  }, [])

  const handleClick = () => {
    setOpen(!open)
    setActiveEquipment(id as string)
  }

  useEffect(() => {
    if (activeEquipment !== id) {
      setOpen(false)
    }
  }, [activeEquipment])

  return (
    <Box sx={classifier}>
      <ListItemButton
        divider={open}
        sx={classifierComponent}
        onClick={handleClick}>
        <ListItemText
          primary={equipment}
          primaryTypographyProps={{ fontSize: '1.375rem!important' }}
        />
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse sx={{ width: '100%' }} in={open} timeout="auto" unmountOnExit>
        {models.map(({ model, id, id_equipment }) => (
          <Models
            model={model}
            id_equipment={id_equipment}
            id={id as string}
            key={`${id_equipment}${id}`}
          />
        ))}
      </Collapse>
    </Box>
  )
})
