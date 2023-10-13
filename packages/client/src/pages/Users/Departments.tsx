import { useEffect, useState, memo } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { useAuth } from 'hooks/auth/useAuth'
import { ListUsers } from './ListUsers'
import { RotateButton } from 'components/Buttons/RotateButton'
import { DPR } from './interfaces'

export const Departments = ({
  departmentName,
  id_division,
  id_department,
}: DPR) => {
  const [{ users }, { getUsers }] = useAuth()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!open) {
      getUsers({ id_division, id_department })
    }
    setOpen(!open)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        width: '100%',
      }}>
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
        <ListItemText
          primary={departmentName}
          sx={{ ml: 2 }}
          primaryTypographyProps={{ fontSize: '1.175rem!important' }}
        />
        <RotateButton open={open} size={'2rem'} />
      </ListItemButton>
      <Collapse sx={{ width: '100%' }} in={open} timeout="auto" unmountOnExit>
        {users.map(value => (
          <ListUsers {...value} key={value.id} />
        ))}
      </Collapse>
    </Box>
  )
}
