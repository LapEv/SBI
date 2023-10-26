import React, { SyntheticEvent } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { Department } from 'store/slices/structure/interfaces'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { style, styleTextFieldProps } from 'static/styles'
import { SearchIconElement } from 'components/SearchIconElement'

export const DeleteDepartment = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const boxRef = React.createRef<HTMLDivElement>()
    const [height, setHeight] = useState<number | any>()
    const [{ divisions, departaments }, { deleteDepartment, getDepartments }] =
      useStructure()
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [filterText, setFilterText] = useState<string>('')
    const filteredDepartments = useFilteredData<Department>(
      departaments,
      filterText,
      'departmentName'
    )
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
      if (boxRef.current) {
        setHeight(boxRef.current!.offsetHeight)
      }
    }, [])

    const getDivisionName = (id_division: string) => {
      return divisions.find(item => item.id === id_division)?.divisionName
    }

    const setText = (text: string) => {
      if (!height && boxRef.current) {
        setHeight(boxRef.current!.offsetHeight)
      }
      setFilterText(text)
    }

    return (
      <Box
        sx={{ ...style, paddingLeft: 5 }}
        component="form"
        onSubmit={changeData}>
        <Typography variant={'h6'}>{title}</Typography>
        <TextField
          variant="outlined"
          sx={{ width: '90%', mt: 2, height: 40 }}
          label="Введите фильтр"
          margin="normal"
          value={filterText || ''}
          onChange={e => setText(e.target.value ?? '')}
          InputProps={{
            endAdornment: <SearchIconElement />,
          }}
          inputProps={{
            style: styleTextFieldProps.inputProps,
          }}
          InputLabelProps={{
            style: styleTextFieldProps.inputLabelProps,
          }}
          FormHelperTextProps={{
            style: styleTextFieldProps.formHelperTextProps,
          }}
        />
        <Box
          ref={boxRef}
          sx={{
            mt: 2,
            width: '100%',
            pl: 3,
            height: filterText ? height : 'auto',
          }}>
          {filteredDepartments.map(({ departmentName, id, id_division }) => (
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
