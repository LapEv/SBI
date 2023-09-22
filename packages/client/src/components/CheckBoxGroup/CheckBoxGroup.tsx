import { useState, ChangeEvent, useEffect } from 'react'
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
  key: string
  onChooseGroup: (data: string) => void
  onChooseItems: (data: string) => void
  oneGroup: boolean
  selectedGroup: NullableString[]
}

export const CheckBoxGroup = ({
  data,
  onChooseGroup,
  onChooseItems,
  oneGroup,
  selectedGroup,
}: CheckBoxGroup) => {
  const [checked, setChecked] = useState([true, false])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked])
    if (event.target.checked) {
      onChooseGroup(event.target.name)
    }
  }

  useEffect(() => {
    if (!oneGroup) return
    if (!selectedGroup.includes(data.group as string)) {
      setChecked([false, false])
    }
  }, [selectedGroup])

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
          name={data.groupName as string}
          label={''}
          control={<Checkbox checked={checked[1]} onChange={handleChange} />}
        />
        <ListBoxGroup
          groupName={data.groupName}
          roles={data.roles}
          groupId={data.id}
          groupChecked={checked[1]}
          onChooseItems={onChooseItems}
        />
      </>
    </Box>
  )
}
