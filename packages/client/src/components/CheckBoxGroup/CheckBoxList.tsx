import { useState, useEffect, ChangeEvent } from 'react'
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from '@mui/material'

interface ListBoxGroup {
  open: boolean
  roles: string[]
  id: string
}

export const CheckBoxList = ({ open, roles, id }: ListBoxGroup) => {
  const [checked, setChecked] = useState([true, false])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked])
  }

  return (
    <Collapse
      sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
      in={open}
      timeout="auto"
      unmountOnExit>
      {roles.map(value => (
        <FormControlLabel
          label={value}
          control={<Checkbox checked={checked[1]} onChange={handleChange} />}
        />
      ))}
    </Collapse>
  )
}
