import React, { SyntheticEvent } from 'react'
import { ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { style, styleTextFieldProps } from '../data'
import { Item } from 'components/CheckBoxGroup/Item'
import { ButtonsModalSection } from 'components/Buttons'
import { useAddresses } from 'hooks/addresses/useAddresses'
import SearchIcon from '@mui/icons-material/Search'
import { useFilteredData } from 'hooks/useFilteredData'
import { Regions } from 'store/slices/addresses/interfaces'

export const DeleteRegion = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const boxRef = React.createRef<HTMLDivElement>()
    const [height, setHeight] = useState<number | any>()
    const [{ regions }, { deleteRegion, getRegions }] = useAddresses()
    const [selectedRegions, setSelectedRegions] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [filterText, setFilterText] = useState<string>('')
    const filteredRegions = useFilteredData<Regions>(
      regions,
      filterText,
      'region'
    )
    const theme = useTheme()

    const changeData = (event: SyntheticEvent<EventTarget>) => {
      event.preventDefault()
      if (!selectedRegions.length) {
        setErrSelectedItems(true)
        return
      }
      handleModal(false)
      deleteRegion(selectedRegions)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedRegions(selectedRegions.filter(value => value !== id))
        return
      }
      setSelectedRegions([...selectedRegions, id])
      if ([...selectedRegions, id] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getRegions()
    }, [])

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
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  htmlColor={
                    theme.palette.mode === 'light' ? '#C1EEE1' : '#1E515D'
                  }
                />
              </InputAdornment>
            ),
          }}
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
        />
        <Box
          sx={{
            mt: 2,
            width: '100%',
            pl: 3,
            height: filterText ? height : 'auto',
          }}>
          {filteredRegions.map(({ region, id }) => (
            <Item
              name={region}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id as string}
            />
          ))}
        </Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems && 'Не выбран ни один регион!'}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Удалить"
        />
      </Box>
    )
  }
)
