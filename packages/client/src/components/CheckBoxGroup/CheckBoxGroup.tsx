import { useState, ChangeEvent, useEffect } from 'react'
import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { RolesGroupObject } from 'storeRoles/interfaces'
import { ListBoxGroup } from './ListBoxGroup'

export interface CheckBoxGroup {
  data: {
    group: string
    roles: { name: string; id: string; nameId: string }[]
    id: string
    groupName: string
  }
  props?: object
  key: string
  onChooseGroup: (data: string, id?: string) => void
  onChooseItems: (checked: boolean, id: string) => void
  oneGroup: boolean
  selectedGroup: string | string[]
}

export const CheckBoxGroup = ({
  data,
  onChooseGroup,
  onChooseItems,
  oneGroup,
  selectedGroup,
}: CheckBoxGroup) => {
  const [checked, setChecked] = useState(
    data.group === selectedGroup ? true : false
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    if (event.target.checked) {
      onChooseGroup(event.target.value)
      return
    }
    onChooseGroup('')
  }

  useEffect(() => {
    if (!oneGroup) return
    if (!selectedGroup.includes(data.id)) {
      setChecked(false)
    }
  }, [selectedGroup])

  return (
    <Box
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        // height: '100%',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <>
        <FormControlLabel
          name={data.groupName}
          label={''}
          value={data.id}
          control={<Checkbox checked={checked} onChange={handleChange} />}
        />
        <ListBoxGroup
          groupName={data.groupName}
          data={data.roles}
          groupId={data.id}
          groupChecked={checked}
          onChooseItems={onChooseItems}
        />
      </>
    </Box>
  )
}
