import { useState, ChangeEvent } from 'react'
import {
  Box,
  FormControlLabel,
  ListItemButton,
  ListItemText,
  Checkbox,
} from '@mui/material'
import { RolesGroup } from 'storeRoles/interfaces'
import { Nullable } from 'utils/nullableType'
import { ListBoxGroup } from './ListBoxGroup'

type NullableString = Nullable<string>
export interface CheckBoxGroup {
  data: {
    group: NullableString
    roles: string[]
    id: string
    groupName: NullableString
  }
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
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <>
        <FormControlLabel
          label={''}
          control={<Checkbox checked={checked[1]} onChange={handleChange} />}
        />
        <ListBoxGroup
          listName={data.groupName}
          roles={data.roles}
          id={data.id}
        />
      </>
    </Box>
  )
}
