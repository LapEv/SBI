import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { style } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'

export const DeleteDivision = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ divisions }, { deleteDivision, getDivisions }] = useStructure()
    const [selectedDivisions, setSelectedDivisions] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedDivisions.length) {
        setErrSelectedItems(true)
        return
      }
      handleModal(false)
      deleteDivision(selectedDivisions)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedDivisions(selectedDivisions.filter(value => value !== id))
        return
      }
      setSelectedDivisions([...selectedDivisions, id])
      if ([...selectedDivisions, id] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getDivisions()
    }, [])

    return (
      <Box
        sx={{ ...style, paddingLeft: 5 }}
        component="form"
        onSubmit={changeData}>
        <Typography variant={'h6'}>{title}</Typography>
        <Box
          sx={{
            mt: 2,
            width: '100%',
            pl: 3,
          }}>
          {divisions.map(({ divisionName, id }) => (
            <Item
              name={divisionName}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбран ни один дивизион!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
