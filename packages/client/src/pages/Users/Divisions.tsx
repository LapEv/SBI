import { useStructure } from 'hooks/structure/useStructure'
import { useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import { Departments } from './'
import { Division } from 'store/slices/structure/interfaces'
import Collapse from '@mui/material/Collapse'
import { RotateButton } from 'components/Buttons/RotateButton'

export const Divisions = ({ divisionName, id }: Division) => {
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
    <Box
      sx={{
        display: 'flex',
        borderRadius: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        width: '100%',
        mt: 2,
        borderWidth: 2,
        borderColor: 'icon.default',
        borderStyle: 'solid',
        boxShadow: 5,
        p: 2,
      }}>
      <ListItemButton
        divider={open}
        sx={{
          fontWeight: 'bold',
          fontSize: '1.9rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'space-between',
          justifyContent: 'space-between',
        }}
        onClick={handleClick}>
        <ListItemText
          primary={divisionName}
          primaryTypographyProps={{ fontSize: '1.375rem!important' }}
        />
        <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
      </ListItemButton>
      <Collapse sx={{ width: '100%' }} in={open} timeout="auto" unmountOnExit>
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
}
