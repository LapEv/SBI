import { useState, ChangeEvent, useEffect } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { Nullable } from 'utils/nullableType'
type NullableString = Nullable<string>

interface Item {
  nameRole: NullableString
  id: string
  key: string
  groupChecked: boolean
  onChooseItems: (data: string) => void
}
export const Item = ({ nameRole, id, groupChecked, onChooseItems }: Item) => {
  const [checked, setChecked] = useState([true, false])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked])
    onChooseItems(event.target.name)
  }

  useEffect(() => {
    groupChecked ? setChecked([true, true]) : setChecked([false, false])
  }, [groupChecked])

  return (
    <FormControlLabel
      label={nameRole}
      id={id}
      name={`${nameRole}`}
      sx={{ width: '100%' }}
      control={<Checkbox checked={checked[1]} onChange={handleChange} />}
    />
  )
}
