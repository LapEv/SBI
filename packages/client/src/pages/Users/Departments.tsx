import { useStructure } from 'hooks/structure/useStructure'
import { useEffect, useState } from 'react'
import {
  Box,
  ListItemText,
  ListItemButton,
  List,
  TextField,
} from '@mui/material'

export const Departments = () => {
  const [{ departaments }, { getDepartments }] = useStructure()
  console.log('departaments = ', departaments)

  useEffect(() => {
    getDepartments()
  }, [])

  const [open, setOpen] = useState(true)

  const handleClick = () => {
    console.log('open = ', open)
    setOpen(!open)
  }

  return (
    <>
      {departaments.map(value => (
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
            <ListItemText primary={value.departmentName} />
            {open ? (
              <TextField
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  weight: '100%',
                  height: 20,
                  color: '#000',
                }}>
                Test
              </TextField>
            ) : (
              <></>
            )}
          </ListItemButton>
        </Box>
      ))}
    </>
  )
}
