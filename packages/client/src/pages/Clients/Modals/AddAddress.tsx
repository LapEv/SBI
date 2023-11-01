import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapAddressInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useMessage } from 'hooks/message/useMessage'
import { Options } from 'components/DropDown/interface'

export const AddAddress = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ regions, addresses }, { getRegions, getAddresses, newAddress }] =
      useAddresses()
    const [_, { setMessage }] = useMessage()
    const [region, setRegion] = useState<Options>(emptyValue)
    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapAddressInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    const changeData = ({ list }: AddValuesProps) => {
      const isExist = addresses.find(
        item =>
          item.address === list[0].value || item.coordinates === list[1].value
      )
      if (isExist) {
        setMessage({
          text: 'Такой адрес или координаты уже существуют',
          type: 'error',
        })
        return
      }
      newAddress({
        address: list[0].value,
        coordinates: list[1].value,
        id_region: region.id,
      })
      handleModal(false)
    }

    useEffect(() => {
      getAddresses()
      getRegions()
    }, [])

    return (
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
        <DropDown
          data={regions.map(item => {
            return {
              ['label']: item.region as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={setRegion}
          value={region.label}
          label="Выберите регион"
          errorLabel="Не выбран регион!"
        />
        <Box sx={{ mt: 2, width: '90%' }}>
          {fields.map(({ id, label, validation, type }, index) => {
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
                    required
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
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
