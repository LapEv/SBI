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
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [checkedGroup, setCheckedGroup] = useState<boolean>(data.checkedGroup)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    if (!event.target.checked) {
      setSelectedGroup('')
      setSelectedItems([])
      onChooseGroup(event.target.checked, event.target.value)
      setCheckedGroup(event.target.checked)
      return
    }
    setSelectedGroup(event.target.value)
    setSelectedItems(data.items.map(({ id }) => id))
    const temp = data.items.map(item => {
      return { ...item, checkedItems: true }
    })
    data.items = temp
    console.log('temp = ', temp)
    setCheckedGroup(event.target.checked)
    onChooseGroup(event.target.checked, event.target.value)
  }

  const onItemsChange = (checked: boolean, id: string) => {
    console.log('onItemsChange selectedItems = ', selectedItems)
    onChooseGroup(checked, data.id)
    setChecked(true)
    onChooseItems(checked, id)
  }

  console.log('selectedItems = ', selectedItems)

  // useEffect(() => {
  //   setChecked(data.checkedGroup)
  // }, [data.checkedGroup])

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
