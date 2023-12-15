import { useState, ChangeEvent, useEffect } from 'react'
import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { ListBoxGroup } from './ListBoxGroup'
import { ICheckBoxGroups } from './interface'
import { Group } from './Group'

export const CheckBoxGroups = ({
  data,
  onChooseGroup,
  onChooseItems,
  props,
}: ICheckBoxGroups) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const changeGroup = (checked: boolean, id: string) => {
    if (!checked) {
      const newSelectedGroup = selectedGroups.filter(value => value !== id)
      setSelectedGroups(newSelectedGroup)
      onChooseGroup(newSelectedGroup)
      return
    }
    setSelectedGroups([...selectedGroups, id])
    onChooseGroup([...selectedGroups, id])
  }

  const changeItems = (checked: boolean, id: string) => {
    if (!checked) {
      const newSelectedItems = selectedItems.filter(value => value !== id)
      setSelectedItems(newSelectedItems)
      onChooseItems(newSelectedItems)
      return
    }
    setSelectedItems([...selectedItems, id])
    onChooseItems([...selectedItems, id])
  }

  const changeItemsGroup = (checked: boolean, ids: string[]) => {
    if (!checked) {
      const newSelectedItems = selectedItems.filter(
        value => !ids.includes(value)
      )
      setSelectedItems(newSelectedItems)
      onChooseItems(newSelectedItems)
      return
    }
    setSelectedItems([...new Set([...selectedItems, ...ids])])
    onChooseItems([...new Set([...selectedItems, ...ids])])
  }

  return (
    <>
      {data.map(item => (
        <Group
          key={item.id}
          data={item}
          onChooseGroup={changeGroup}
          onChooseItems={changeItems}
          onChooseItemsGroup={changeItemsGroup}
        />
      ))}
    </>
  )
}
