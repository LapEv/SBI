import { useState, ChangeEvent, useEffect } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { Nullable } from 'utils/nullableType'
type NullableString = Nullable<string>

interface Item {
  nameRole: NullableString
  id: string
  key: string
  groupChecked: boolean
}
export const Item = ({ nameRole, id, groupChecked }: Item) => {
  const [checked, setChecked] = useState([true, false])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked])
    console.log('Item checked')
    console.log('nameRole = ', nameRole)
    console.log('id = ', id)
  }

  useEffect(() => {
    console.log('Item checked groupChecked = ', groupChecked)
    groupChecked ? setChecked([true, true]) : setChecked([false, false])
  }, [groupChecked])

  return (
    <FormControlLabel
      label={nameRole}
      sx={{ width: '100%' }}
      control={<Checkbox checked={checked[1]} onChange={handleChange} />}
    />
  )
}
