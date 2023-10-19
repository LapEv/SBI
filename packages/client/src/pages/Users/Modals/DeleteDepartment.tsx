import React, { SyntheticEvent } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { style } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'

export const DeleteDepartment = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ divisions, departaments }, { deleteDepartment, getDepartments }] =
      useStructure()
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedDepartments.length) {
        setErrSelectedItems(true)
        return
      }
      handleModal(false)
      deleteDepartment(selectedDepartments)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedDepartments(
          selectedDepartments.filter(value => value !== id)
        )
        return
      }
      setSelectedDepartments([...selectedDepartments, id])
      if ([...selectedDepartments, id] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getDepartments()
    }, [])

    const getDivisionName = (id_division: string) => {
      return divisions.find(item => item.id === id_division)?.divisionName
    }

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
          {departaments.map(({ departmentName, id, id_division }) => (
            <Item
              name={departmentName}
              comment={getDivisionName(id_division as string)}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбран ни один отдел!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
