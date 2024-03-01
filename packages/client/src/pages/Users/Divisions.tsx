import { useStructure } from 'hooks/structure/useStructure'
import { memo, useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import { Departments } from './'
import { Division } from 'store/slices/structure/interfaces'
import Collapse from '@mui/material/Collapse'
import { RotateButton } from 'components/Buttons'
import { classifier, classifierComponent } from 'static/styles'

export const Divisions = memo(({ divisionName, id }: Division) => {
  const [
    { departaments, activeDivision },
    { getDepartments, setActiveDivision },
  ] = useStructure()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getDepartments()
  }, [])

  const handleClick = () => {
    setOpen(!open)
    setActiveDivision(id as string)
  }

  useEffect(() => {
    if (activeDivision !== id) {
      setOpen(false)
    }
  }, [activeDivision])

  return (
    <Box sx={classifier}>
      <ListItemButton
        divider={open}
        sx={classifierComponent}
        onClick={handleClick}>
        <ListItemText
          primary={divisionName}
          primaryTypographyProps={{ fontSize: '1.375rem!important' }}
        />
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {departaments
          .filter(value => value.id_division === id)
          .map(value => (
            <Departments
              departmentName={value.departmentName as string}
              id_department={value.id as string}
              id_division={id as string}
              key={value.id}
            />
          ))}
      </Collapse>
    </Box>
  )
})
