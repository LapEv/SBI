import { useState, ChangeEvent } from 'react'
import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { RolesGroupObject } from 'storeRoles/interfaces'
import { Nullable } from 'utils/nullableType'
import { ListBoxGroup } from './ListBoxGroup'

type NullableString = Nullable<string>
export interface CheckBoxGroup {
  data: {
    group: NullableString
    roles: RolesGroupObject[]
    id: string
    groupName: NullableString
  }
  props?: object
  onBlur?: (data: string) => void
  key: string
}

export const CheckBoxGroup = ({ data }: CheckBoxGroup) => {
  const [checked, setChecked] = useState([true, false])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked])
    console.log('Group checked')
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
          groupName={data.groupName}
          roles={data.roles}
          groupId={data.id}
          groupChecked={checked[1]}
        />
      </>
    </Box>
  )
}
