import { useEffect, useState } from 'react'
import { Box, ListItemText, ListItemButton } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { useAuth } from 'hooks/auth/useAuth'
import { ListUsers } from './ListUsers'
import { RotateButton } from 'components/Buttons'
import { DPR } from './interfaces'
import { useStructure } from 'hooks/structure/useStructure'
import { classifierChildComponent, flexColumn_FS_SA } from 'static/styles'

export const Departments = ({
  departmentName,
  id_division,
  id_department,
}: DPR) => {
  const [{ users }, { getActiveUsers }] = useAuth()
  const [{ activeDepartment }, { setActiveDepartment }] = useStructure()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (!open) {
      getActiveUsers({ id_division, id_department })
      setActiveDepartment(id_department as string)
    }
    setOpen(!open)
  }

  useEffect(() => {
    if (activeDepartment !== id_department) {
      setOpen(false)
    }
  }, [activeDepartment])

  return (
    <Box sx={flexColumn_FS_SA}>
      <ListItemButton
        divider={open}
        sx={classifierChildComponent}
        onClick={handleClick}>
        <ListItemText
          primary={departmentName}
          sx={{ ml: 2 }}
          primaryTypographyProps={{ fontSize: '1.175rem!important' }}
        />
        <RotateButton open={open} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', height: 'auto' }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {users.map(value => (
          <ListUsers {...value} key={value.id} />
        ))}
      </Collapse>
    </Box>
  )
}
