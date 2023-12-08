import React from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect, SyntheticEvent } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle, boxDataModal } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { ButtonsModalSection } from 'components/Buttons'
import { useFilteredData } from 'hooks/useFilteredData'
import { SearchIconElement } from 'components/Icons'
import { TextField } from 'components/TextFields'
import { useSLA } from 'hooks/sla/useSLA'
import { SLA, TypesSLA } from 'store/slices/sla/interfaces'

export const DeleteTypesSLA = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const boxRef = React.createRef<HTMLDivElement>()
    const [height, setHeight] = useState<number | any>()
    const [{ typesSLA }, { deleteTypesSLA, getTypesSLA }] = useSLA()
    const [selectedTypesSLA, setSelectedTypesSLA] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [filterText, setFilterText] = useState<string>('')
    const filteredTypesSLA = useFilteredData<TypesSLA>(
      typesSLA,
      filterText,
      'typeSLA'
    )
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedTypesSLA.length) {
        setErrSelectedItems(true)
        return
      }
      handleModal(false)
      deleteTypesSLA(selectedTypesSLA)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedTypesSLA(selectedTypesSLA.filter(value => value !== id))
        return
      }
      setSelectedTypesSLA([...selectedTypesSLA, id])
      if ([...selectedTypesSLA, id] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getTypesSLA()
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
          sx={{ ...boxDataModal, height: filterText ? height : 'auto' }}>
          {filteredTypesSLA.map(({ typeSLA, id }) => (
            <Item
              name={typeSLA}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбран ни один тип SLA!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
