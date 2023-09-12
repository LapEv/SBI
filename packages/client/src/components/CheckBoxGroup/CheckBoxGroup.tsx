import { useState, ChangeEvent } from 'react'
import {
  Box,
  FormControlLabel,
  Typography,
  List,
  Checkbox,
} from '@mui/material'
import { RolesGroup } from 'storeRoles/interfaces'

export interface CheckBoxGroup {
  data: {
    group: string
    roles: string[]
    id: string
  }[]
  props?: object
  onBlur?: (data: string) => void
}

export const CheckBoxGroup = ({ data }: CheckBoxGroup) => {
  console.log('CheckBoxGroup data = ', data)
  const [checked, setChecked] = useState([true, false])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked])
  }

  return (
    <Box
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <List sx={{ width: '100%', p: 3, borderColor: 'border.default' }}>
        {data.map(({ group }: RolesGroup) => (
          <>
            <FormControlLabel
              label={''}
              control={
                <Checkbox checked={checked[1]} onChange={handleChange} />
              }
            />
            {group}
          </>
        ))}
      </List>
    </Box>
  )
}
