import React, { SyntheticEvent } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useFilteredData } from 'hooks/useFilteredData'
import { TextField } from 'components/TextFields'
import { Addresses } from 'store/slices/addresses/interfaces'
import { modalStyle } from 'static/styles/modals'
import { SearchIconElement } from 'components/Icons'
import { useObjects } from 'hooks/objects/useObjects'
import { Objects } from 'store/slices/objects/interfaces'

export const DeleteObjects = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const boxRef = React.createRef<HTMLDivElement>()
    const [height, setHeight] = useState<number | any>()
    const [{ objects }, { deleteObjects, getObjects }] = useObjects()
    const [selectedObjects, setSelectedObjects] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [filterText, setFilterText] = useState<string>('')
    const filteredObjects = useFilteredData<Objects>(
      objects,
      filterText,
      'object'
    )
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedObjects.length) {
        setErrSelectedItems(true)
        return
      }
      handleModal(false)
      deleteObjects(selectedObjects)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedObjects(selectedObjects.filter(value => value !== id))
        return
      }
      setSelectedObjects([...selectedObjects, id])
      if ([...selectedObjects, id] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getObjects()
      if (boxRef.current) {
        setHeight(boxRef.current!.offsetHeight)
      }
    }, [])

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
          sx={{
            mt: 2,
            width: '100%',
            pl: 3,
            height: filterText ? height : 'auto',
          }}>
          {filteredObjects.map(({ object, id, Client }) => (
            <Item
              name={object}
              comment={Client?.client as string}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбран ни один адрес!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
