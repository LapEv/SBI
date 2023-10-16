import { useState, ChangeEvent, useEffect } from 'react'
import { Checkbox, FormControlLabel, Box, useTheme } from '@mui/material'
import { Nullable } from 'utils/nullableType'
type NullableString = Nullable<string>

interface Item {
  nameRole: NullableString
  id: string
  key: string
  groupChecked?: boolean
  comment?: string
  onChooseItems: (data: string) => void
}
export const Item = ({
  nameRole,
  id,
  groupChecked,
  onChooseItems,
  comment,
}: Item) => {
  const [checked, setChecked] = useState([true, false])
  const theme = useTheme()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked])
    onChooseItems(event.target.name, id)
  }

  useEffect(() => {
    groupChecked ? setChecked([true, true]) : setChecked([false, false])
  }, [groupChecked])

  return (
    <>
      <FormControlLabel
        label={nameRole}
        id={id}
        name={`${nameRole}`}
        sx={{ width: '100%' }}
        control={<Checkbox checked={checked[1]} onChange={handleChange} />}
      />
      {comment?.length && (
        <Box sx={{ fontSize: 12, color: theme.palette.text.secondary, ml: 5 }}>
          {comment}
        </Box>
      )}
    </>
  )
}
