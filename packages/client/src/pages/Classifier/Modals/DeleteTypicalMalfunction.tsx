import React, { SyntheticEvent, memo } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { modalStyle, boxDataModal } from 'static/styles'
import { SearchIconElement } from 'components/Icons'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { TypicalMalfunctions } from 'store/slices/classifier/interfaces'

export const DeleteTypicalMalfunction = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const boxRef = React.createRef<HTMLDivElement>()
      const [height, setHeight] = useState<string>('')
      const [
        { typicalMalfunctions, equipments },
        { deleteTypicalMalfunction, getTypicalMalfunctions },
      ] = useClassifier()
      const [selectedTypicalMalfunctions, setSelectedTypicalMalfunctions] =
        useState<string[]>([])
      const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
      const [filterText, setFilterText] = useState<string>('')
      const filteredTypicalMalfunctions = useFilteredData<TypicalMalfunctions>(
        typicalMalfunctions,
        filterText,
        'typicalMalfunction'
      )
      const theme = useTheme()

      const changeData = (event: SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        if (!selectedTypicalMalfunctions.length) {
          setErrSelectedItems(true)
          return
        }
        deleteTypicalMalfunction(selectedTypicalMalfunctions)
        handleModal(false)
      }

      const onChooseItems = (checked: boolean, id: string) => {
        if (!checked) {
          setSelectedTypicalMalfunctions(
            selectedTypicalMalfunctions.filter(value => value !== id)
          )
          return
        }
        setSelectedTypicalMalfunctions([...selectedTypicalMalfunctions, id])
        if ([...selectedTypicalMalfunctions, id] && errSelectedItems)
          setErrSelectedItems(false)
      }

      useEffect(() => {
        getTypicalMalfunctions()
        if (boxRef.current) {
          setHeight(boxRef.current.offsetHeight.toString())
        }
      }, [])

      const getEquipmentName = (id_equipment: string) => {
        return equipments.find(item => item.id === id_equipment)?.equipment
      }

      const setText = (text: string) => {
        if (!height && boxRef.current) {
          setHeight(boxRef.current.offsetHeight.toString())
        }
        setFilterText(text)
      }

      return (
        <Box
          ref={ref}
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
            {filteredTypicalMalfunctions.map(
              ({ typicalMalfunction, id, id_equipment }) => (
                <Item
                  name={typicalMalfunction}
                  comment={getEquipmentName(id_equipment as string)}
                  id={`${id}`}
                  groupChecked={false}
                  onChooseItems={onChooseItems}
                  key={id as string}
                />
              )
            )}
          </Box>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems && 'Не выбрана ни одна типовая неисправность!'}
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
