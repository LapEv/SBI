import { useStructure } from 'hooks/structure/useStructure'
import { useEffect, useState } from 'react'
import { Box, List, ListItemText, ListItemButton } from '@mui/material'
import { Departments } from './Departments'
import { Division } from 'store/slices/structure/interfaces'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export const Divisions = ({ divisionName, division, id }: Division) => {
  const [{ departaments }, { getDepartments }] = useStructure()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    getDepartments()
  }, [])

  const handleClick = () => {
    console.log('open = ', open)
    setOpen(!open)
  }

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
        border: '3px solid #1E515D',
        boxShadow: 5,
        p: 2,
      }}>
      <ListItemButton
        divider={open}
        sx={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'space-between',
          justifyContent: 'space-between',
        }}
        onClick={handleClick}>
        <ListItemText primary={divisionName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {open ? (
        <List sx={{ width: '100%', ml: 2 }}>
          {departaments
            .filter(value => value.id_division === id)
            .map(value => (
              <Departments
                departmentName={value.departmentName as string}
                id_department={value.id as string}
                id_division={id as string}
              />
            ))}
        </List>
      ) : (
        <></>
      )}
    </Box>
  )
}
