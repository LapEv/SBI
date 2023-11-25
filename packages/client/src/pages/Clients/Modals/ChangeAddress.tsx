import React from 'react'
import { AddValuesProps, ChooseModalProps } from './interfaces'
import { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { Options } from 'components/DropDown/interface'
import { Addresses, Regions } from 'store/slices/addresses/interfaces'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { MapNewAddressInputFields } from './data'

export const ChangeAddress = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [
      { addresses, regions },
      { getAddresses, getRegions, changeAddress },
    ] = useAddresses()
    const [listAddresses, setListAddresses] = useState<Options[]>([])
    const [listRegions, setListRegions] = useState<Options[]>([])
    const [selectedAddresses, setSelectedAddresses] =
      useState<Options>(emptyValue)
    const [selectedRegions, setSelectedRegions] = useState<Options>(emptyValue)
    const [errSelectedItems, setErrSelectedItems] = useState<string>('')
    const theme = useTheme()

    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapNewAddressInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    const changeData = ({ list }: AddValuesProps) => {
      if (!selectedAddresses) {
        setErrSelectedItems('Не выбран адрес')
        return
      }
      if (!selectedRegions) {
        setErrSelectedItems('Не выбран регион')
        setSelectedRegions(emptyValue)
        return
      }
      changeAddress(
        {
          address: list[0].value,
          coordinates: list[1].value,
          id_region: selectedRegions.id,
          active: true,
        },
        selectedAddresses.id
      )
      handleModal(false)
    }

    const changeSelectedAddresses = (data: Options) => {
      if (!data) return
      setSelectedAddresses(data)
      if (data.id && selectedRegions && errSelectedItems) {
        setErrSelectedItems('')
      }
      const newAddress = addresses.find(
        item => item.id === data.id
      ) as Addresses
      const newRegion = regions.find(
        item => item.id === newAddress.id_region
      ) as Regions
      setSelectedRegions({ label: newRegion.region, id: newAddress.id_region })
    }

    const changeSelectedRegions = (data: Options) => {
      if (!data) return
      setSelectedRegions(data)
      if (data.id && selectedAddresses && errSelectedItems) {
        setErrSelectedItems('')
      }
    }

    const checkAddressValue = (value: string) => {
      const isNew = addresses.findIndex(item => item.address === value)
      if (isNew < 0) {
        setSelectedAddresses(emptyValue)
      }
    }

    const checkRegionValue = (value: string) => {
      const isNew = regions.findIndex(item => item.region === value)
      if (isNew < 0) {
        setSelectedRegions(emptyValue)
      }
    }

    useEffect(() => {
      getAddresses()
      getRegions()
    }, [])

    useEffect(() => {
      setListAddresses(
        addresses.map(item => {
          return {
            ['label']: item.address as string,
            ['id']: item.id as string,
          }
        })
      )
    }, [addresses])

    useEffect(() => {
      setListRegions(
        regions.map(item => {
          return {
            ['label']: item.region as string,
            ['id']: item.id as string,
          }
        })
      )
    }, [regions])

    return (
      <Box
        sx={{ ...modalStyle, paddingLeft: 5 }}
        component="form"
        onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
        <DropDown
          data={listAddresses}
          props={{ mt: 4 }}
          onChange={data => changeSelectedAddresses(data)}
          value={selectedAddresses.label || ''}
          label="Выберите адрес"
          errorLabel="Не выбран адрес!"
          onBlur={text => checkAddressValue(text)}
        />
        <DropDown
          data={listRegions}
          props={{ mt: 4 }}
          onChange={data => changeSelectedRegions(data)}
          value={selectedRegions.label || ''}
          label="Выберите регион"
          errorLabel="Не выбран регион!"
          onBlur={text => checkRegionValue(text)}
        />
        <Box sx={{ mt: 2, width: '90%' }}>
          {fields.map(({ id, label, validation, type, required }, index) => {
            return (
              <Controller
                key={id}
                control={control}
                name={`list.${index}.value`}
                rules={validation}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputRef={field.ref}
                    label={label}
                    type={type}
                    variant="outlined"
                    required={required ?? true}
                    sx={{ width: '100%', mt: 2, height: 40 }}
                    margin="normal"
                    value={field.value || ''}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
        </Box>
        <Box
          sx={{
            mt: 2,
            width: '100%',
            pl: 3,
          }}></Box>
        <Box sx={{ color: theme.palette.error.main, height: 20 }}>
          {errSelectedItems}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName={'Изменить'}
        />
      </Box>
    )
  }
)
