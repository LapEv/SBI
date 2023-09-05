import { useStructure } from 'hooks/structure/useStructure'
import { useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton, List } from '@mui/material'
import { Departments } from './Departments'
import { Division } from 'store/slices/structure/interfaces'
import { Nullable } from 'utils/nullableType'

export const Divisions = ({ divisionName }: Division) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    console.log('open = ', open)
    setOpen(!open)
  }

  console.log('value = ', divisionName)
  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        width: '100%',
        mt: 5,
        border: '3px solid #1E515D',
        boxShadow: 5,
        p: 3,
      }}>
      <ListItemButton
        sx={{
          fontWeight: 'bold',
          fontSize: '1rem',
          weight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        onClick={handleClick}>
        <ListItemText primary={divisionName} />
        {/* {open ? (
          <List
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
              weight: '100%',
              height: 20,
              color: '#000',
            }}>
            <Departments />
          </List>
        ) : (
          <></>
        )} */}
      </ListItemButton>
    </Box>
  )
}
