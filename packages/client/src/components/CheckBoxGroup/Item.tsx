import { useState, ChangeEvent, useEffect } from 'react'
import { Checkbox, FormControlLabel, Box, useTheme } from '@mui/material'
import { IItem } from './interface'

export const Item = ({
  name,
  id,
  groupChecked,
  onChooseItems,
  comment,
}: IItem) => {
  const [checked, setChecked] = useState<boolean>(true)
  const theme = useTheme()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    onChooseItems(event.target.checked, id)
  }

  useEffect(() => {
    groupChecked ? setChecked(true) : setChecked(false)
  }, [groupChecked])

  return (
    <>
      <FormControlLabel
        label={name}
        id={id}
        name={`${name}`}
        sx={{ width: '100%' }}
        control={<Checkbox checked={checked} onChange={handleChange} />}
      />
      {comment?.length && (
        <Box sx={{ fontSize: 12, color: theme.palette.text.secondary, ml: 5 }}>
          {comment}
        </Box>
      )}
    </>
  )
}
