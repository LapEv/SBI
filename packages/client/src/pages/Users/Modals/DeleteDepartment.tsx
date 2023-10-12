import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { style } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonSection } from './ButtonsSection'
import { useStructure } from 'hooks/structure/useStructure'

export const DeleteDepartment = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ departaments }, { deleteDepartment, getDepartments }] =
      useStructure()
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: any) => {
      event.preventDefault()
      if (!selectedDepartments.length) {
        setErrSelectedItems(true)
        return
      }
      handleModal(false)
      deleteDepartment(selectedDepartments)
    }

    const onChooseItems = (departament: string) => {
      const itemId = departaments.find(
        item => item.departmentName === departament
      )?.id
      if (selectedDepartments.includes(itemId as string)) {
        setSelectedDepartments(
          selectedDepartments.filter(value => value !== itemId)
        )
        return
      }
      setSelectedDepartments([...selectedDepartments, itemId as string])
      if ([...selectedDepartments, itemId as string] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getDepartments()
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
          {departaments.map(({ departmentName, id }, index) => (
            <Item
              nameRole={departmentName}
              id={`${id}${index}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбран ни один отдел!'}
        </Box>
        <ButtonSection handleModal={handleModal} btnName="Удалить" />
      </Box>
    )
  }
)
