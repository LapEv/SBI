import { useState, ChangeEvent, useEffect } from 'react'
import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { ListBoxGroup } from './ListBoxGroup'
import { ICheckBoxGroup } from './interface'

export const CheckBoxGroup = ({
  data,
  onChooseGroup,
  onChooseItems,
}: ICheckBoxGroup) => {
  const [checked, setChecked] = useState<boolean>(data.checkedGroup)
  const [checkedGroup, setCheckedGroup] = useState<boolean>(data.checkedGroup)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    setCheckedGroup(event.target.checked)
    onChooseGroup(event.target.checked, event.target.value)
  }

  const onItemsChange = (checked: boolean, id: string) => {
    onChooseGroup(checked, data.id)
    setChecked(true)
    onChooseItems(checked, id)
  }

  useEffect(() => {
    setChecked(data.checkedGroup)
  }, [data.checkedGroup])

  return (
    <Box
      component="main"
      maxWidth="md"
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
      }}>
      <>
        <FormControlLabel
          name={data.group}
          label={''}
          value={data.id}
          control={<Checkbox checked={checked} onChange={handleChange} />}
        />
        <ListBoxGroup
          key={`${data.id}${data.group}`}
          groupName={data.group}
          data={data.items}
          groupId={data.id}
          groupChecked={checkedGroup}
          onChooseItems={onItemsChange}
        />
      </>
    </Box>
  )
}
