import React, { SyntheticEvent } from 'react'
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
import { ClassifierModels } from 'store/slices/classifier/interfaces'

export const DeleteClassifierModel = React.forwardRef<
  unknown,
  ChooseModalProps
>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const boxRef = React.createRef<HTMLDivElement>()
    const [height, setHeight] = useState<number | any>()
    const [
      { models, equipments },
      { deleteClassifierModel, getClassifierModels },
    ] = useClassifier()
    const [selectedModels, setSelectedModels] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [filterText, setFilterText] = useState<string>('')
    const filteredModels = useFilteredData<ClassifierModels>(
      models,
      filterText,
      'model'
    )
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedModels.length) {
        setErrSelectedItems(true)
        return
      }
      deleteClassifierModel(selectedModels)
      handleModal(false)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedModels(selectedModels.filter(value => value !== id))
        return
      }
      setSelectedModels([...selectedModels, id])
      if ([...selectedModels, id] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getClassifierModels()
      if (boxRef.current) {
        setHeight(boxRef.current!.offsetHeight)
      }
    }, [])

    const getEquipmentName = (id_equipment: string) => {
      return equipments.find(item => item.id === id_equipment)?.equipment
    }

    const setText = (text: string) => {
      if (!height && boxRef.current) {
        setHeight(boxRef.current!.offsetHeight)
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
          {filteredModels.map(({ model, id, id_equipment }) => (
            <Item
              name={model}
              comment={getEquipmentName(id_equipment as string)}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбран ни одна модель!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
