import { useState, ChangeEvent, useEffect, memo } from 'react'
import { Checkbox, FormControlLabel, Box, useTheme } from '@mui/material'
import { IItem } from './interface'

export const Item = memo(
  ({
    name,
    id,
    groupChecked,
    onChooseItems,
    comment,
    initChecked,
    oneChecked,
    props,
  }: IItem) => {
    const [checked, setChecked] = useState<boolean>(initChecked! ?? false) // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    const theme = useTheme()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked)
      onChooseItems(event.target.checked, id)
    }

    useEffect(() => {
      if (groupChecked === null) return
      groupChecked ? setChecked(true) : setChecked(false)
    }, [groupChecked])

    useEffect(() => {
      if (!oneChecked) {
        setChecked(false)
      }
    }, [oneChecked])

    useEffect(() => {
      setChecked(initChecked as boolean)
    }, [initChecked])

    return (
      <>
        <FormControlLabel
          label={name}
          id={id}
          name={`${name}`}
          sx={{ ...props, width: '100%' }}
          control={
            <Checkbox checked={checked || false} onChange={handleChange} />
          }
        />
        {comment?.length && (
          <Box
            sx={{ fontSize: 12, color: theme.palette.text.secondary, ml: 5 }}>
            {comment}
          </Box>
        )}
      </>
    )
  }
)
