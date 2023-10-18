import { useState, ChangeEvent, useEffect } from 'react'
import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { ListBoxGroup } from './ListBoxGroup'
import { ICheckBoxGroup } from './interface'

export const CheckBoxGroup = ({
  data,
  onChooseGroup,
  onChooseItems,
  oneGroup,
  selectedGroup,
}: ICheckBoxGroup) => {
  const [checked, setChecked] = useState<boolean>(
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
          data={data.items}
          groupId={data.id}
          groupChecked={checked}
          onChooseItems={onChooseItems}
        />
      </>
    </Box>
  )
}
