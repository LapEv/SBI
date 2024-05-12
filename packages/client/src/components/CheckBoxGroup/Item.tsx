import { useState, ChangeEvent, useEffect, memo } from 'react'
import { Checkbox, FormControlLabel, ListItemText } from '@mui/material'
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
    noEmpty,
  }: IItem) => {
    const [checked, setChecked] = useState<boolean>(
      (initChecked as boolean) ?? false,
    )
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (oneChecked && noEmpty && checked) {
        if (!event.target.checked) {
          return
        }
      }
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
          <ListItemText
            secondary={comment}
            sx={{ ...props, ml: (props?.ml as number) + 5 }}
          />
        )}
      </>
    )
  },
)
