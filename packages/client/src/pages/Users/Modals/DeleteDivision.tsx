import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { style } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonSection } from './ButtonsSection'
import { useStructure } from 'hooks/structure/useStructure'

export const DeleteDivision = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ divisions }, { deleteDivision, getDivisions }] = useStructure()
    const [selectedDivisions, setSelectedDivisions] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      if (!selectedDivisions.length) {
        setErrSelectedItems(true)
        return
      }
      handleModal(false)
      deleteDivision(selectedDivisions)
    }

    const onChooseItems = (division: string) => {
      const itemId = divisions.find(item => item.divisionName === division)?.id
      if (selectedDivisions.includes(itemId as string)) {
        setSelectedDivisions(
          selectedDivisions.filter(value => value !== itemId)
        )
        return
      }
      setSelectedDivisions([...selectedDivisions, itemId as string])
      if ([...selectedDivisions, itemId as string] && errSelectedItems)
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
          {divisions.map(({ divisionName, id }, index) => (
            <Item
              nameRole={divisionName}
              id={`${id}${index}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбран ни один дивизион!'}
        </Box>
        <ButtonSection handleModal={handleModal} btnName="Удалить" />
      </Box>
    )
  }
)
