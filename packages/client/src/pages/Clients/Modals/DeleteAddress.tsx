import React, { SyntheticEvent } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { style, styleTextFieldProps } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonsModalSection } from 'components/Buttons'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useFilteredData } from 'hooks/useFilteredData'
import { TextField } from 'components/TextFields/TextFields'

export const DeleteAddress = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const boxRef = React.createRef<HTMLDivElement>()
    const [height, setHeight] = useState<number | any>()
    const [{ regions, addresses }, { deleteAddress, getAddresses }] =
      useAddresses()
    const [selectedAddresses, setSelectedAddresses] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [filterText, setFilterText] = useState<string>('')
    const filteredAddresses = useFilteredData(addresses, filterText)
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedAddresses.length) {
        setErrSelectedItems(true)
        return
      }
      handleModal(false)
      deleteAddress(selectedAddresses)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedAddresses(selectedAddresses.filter(value => value !== id))
        return
      }
      setSelectedAddresses([...selectedAddresses, id])
      if ([...selectedAddresses, id] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getAddresses()
      setHeight(boxRef.current!.offsetHeight)
    }, [])

    const getRegionName = (id_region: string) => {
      return regions.find(item => item.id === id_region)?.region
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
          onChange={e => setFilterText(e.target.value ?? '')}
          inputProps={{
            style: {
              ...styleTextFieldProps.inputProps,
              backgroundColor: theme.palette.background.paper,
            },
          }}
          InputLabelProps={{
            style: {
              ...styleTextFieldProps.inputLabelProps,
              color: filterText
                ? theme.palette.mode === 'dark'
                  ? '#C1EEE1'
                  : '#1E515D'
                : theme.palette.mode === 'dark'
                ? '#1E515D'
                : '#C1EEE1',
            },
          }}
          FormHelperTextProps={{
            style: { height: 0, marginTop: -1, zIndex: 999 },
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
          {filteredAddresses.map(({ address, id, id_region }) => (
            <Item
              name={address}
              comment={getRegionName(id_region as string)}
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
