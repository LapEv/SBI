import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import {
  ChooseModalProps,
  AddValuesProps2,
  IModalAddAddressInObject,
} from './interfaces'
import { MapAddressInputFields, MapNewAddressModalInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useMessage } from 'hooks/message/useMessage'
import { Options } from 'components/DropDown/interface'

export const ModalAddAddressInObject = React.forwardRef<
  unknown,
  IModalAddAddressInObject
>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, question, address }: IModalAddAddressInObject, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ regions }, { getRegions, newAddress }] = useAddresses()
    const [region, setRegion] = useState<Options>(emptyValue)
    const {
      control: controlADD,
      handleSubmit: handleSubmitAddAddress,
      register: registerADD,
    } = useForm<AddValuesProps2>({
      mode: 'onBlur',
      defaultValues: {
        list2: MapNewAddressModalInputFields,
      },
    })
    const { errors } = useFormState({ control: controlADD })
    const { fields } = useFieldArray({
      control: controlADD,
      name: 'list2',
    })

    const AddAddress = (data: any) => {
      console.log('data = ', data)
      // console.log('address = ', address)
      // console.log('coordinates = ', list[1].value)
      // console.log('id_region = ', region.id)
      // newAddress({
      //   address,
      //   coordinates: list[1].value,
      //   id_region: region.id,
      // })
      // handleModal({ state: true, region })
    }

    useEffect(() => {
      getRegions()
    }, [])

    return (
      <Box
        sx={modalStyle}
        component="form"
        key={2}
        onSubmit={() => handleSubmitAddAddress(AddAddress)}>
        <Typography variant={'h6'}>{question}</Typography>
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
          {fields.map(
            ({ id, label, validation, type, required, name }, index) => {
              return (
                <Controller
                  key={id}
                  control={controlADD}
                  {...registerADD(`list2.${index}.value`)}
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
                      value={name === 'address' ? address : field.value}
                      error={
                        name !== 'address'
                          ? !!(errors?.list2 ?? [])[index]?.value?.message
                          : false
                      }
                      helperText={
                        name !== 'address'
                          ? (errors?.list2 ?? [])[index]?.value?.message
                          : ''
                      }
                    />
                  )}
                />
              )
            }
          )}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal({ state: false, region })}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
