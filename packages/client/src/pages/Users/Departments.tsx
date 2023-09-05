import { useStructure } from 'hooks/structure/useStructure'
import { useEffect, useState } from 'react'
import {
  Box,
  ListItemText,
  ListItemButton,
  List,
  TextField,
} from '@mui/material'
import { Department } from 'store/slices/structure/interfaces'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export const Departments = ({ departmentName }: Department) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    console.log('open = ', open)
    setOpen(!open)
  }

  return (
    <ListItemButton
      sx={{
        fontWeight: 'bold',
        fontSize: '1rem',
        weight: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
      }}
      onClick={handleClick}>
      <ListItemText primary={departmentName} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  )
}
