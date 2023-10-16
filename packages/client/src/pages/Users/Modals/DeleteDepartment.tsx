import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { style } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonSection } from './ButtonsSection'
import { useStructure } from 'hooks/structure/useStructure'
import { Nullable } from 'utils/nullableType'
type NullableString = Nullable<string>

export const DeleteDepartment = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ divisions, departaments }, { deleteDepartment, getDepartments }] =
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

    const getDivisionName = (id_division: NullableString) => {
      return divisions.find(item => item.id === id_division)?.divisionName
    }

    console.log('depart = ', departaments)

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
          {departaments.map(({ departmentName, id, id_division }, index) => (
            <Item
              nameRole={departmentName}
              comment={getDivisionName(id_division as NullableString) as string}
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
