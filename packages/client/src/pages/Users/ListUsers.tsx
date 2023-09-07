import { useStructure } from 'hooks/structure/useStructure'
import { useEffect, useState } from 'react'
import { ListItemText, ListItemButton } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import { User } from 'storeAuth/interfaces'
import { RotateButton } from 'components/Buttons/RotateButton'

export const ListUsers = ({ firstName, lastName }: User) => {
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
    <ListItemButton
      divider={open}
      sx={{
        fontWeight: 'bold',
        fontSize: '1rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between',
      }}
      onClick={handleClick}>
      <ListItemText primary={firstName} sx={{ ml: 4 }} />
      <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
    </ListItemButton>
  )
}
