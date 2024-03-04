import React, { memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle, boxDataModal } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { useFilteredData } from 'hooks/useFilteredData'
import { SearchIconElement } from 'components/Icons'
import { Division } from 'store/slices/structure/interfaces'
import { TextField } from 'components/TextFields'

export const DeleteDivision = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    ({ handleModal, title }: ChooseModalProps, ref) => {
      /* eslint-enable @typescript-eslint/no-unused-vars */
      const boxRef = React.createRef<HTMLDivElement>()
      const [height, setHeight] = useState<string>('')
      const [{ divisions }, { deleteDivision, getDivisions }] = useStructure()
      const [selectedDivisions, setSelectedDivisions] = useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredDivisions = useFilteredData<Division>(
        divisions,
        filterText,
        'divisionName'
      )
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
        if (boxRef.current) {
          setHeight(boxRef.current.offsetHeight.toString())
        }
      }, [])

      const setText = (text: string) => {
        if (!height && boxRef.current) {
          setHeight(boxRef.current.offsetHeight.toString())
        }
        setFilterText(text)
      }

      return (
        <Box
          sx={{ ...modalStyle, paddingLeft: 5 }}
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
          />
          <Box
            ref={boxRef}
            sx={{ ...boxDataModal, height: filterText ? height : 'auto' }}>
            {filteredDivisions.map(({ divisionName, id }) => (
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
)
