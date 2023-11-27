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
  AddValuesPropsTwoForms,
  IModalAddAddressInObject,
} from './interfaces'
import { MapAddressInputFields, MapNewAddressModalInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection, ButtonsSectionNoSubmit } from 'components/Buttons'
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

    MapNewAddressModalInputFields[0].value = address
    const [region, setRegion] = useState<Options>(emptyValue)
    const {
      control: controlADD,
      handleSubmit: handleSubmitAddAddress,
      register: registerADD,
    } = useForm<AddValuesPropsTwoForms>({
      mode: 'onBlur',
      defaultValues: {
        list2: MapNewAddressModalInputFields,
      },
    })
    const { errors: errorsModal } = useFormState({ control: controlADD })
    const { fields: filedsModal } = useFieldArray({
      control: controlADD,
      name: 'list2',
    })

    const AddAddress = ({ list2 }: AddValuesPropsTwoForms) => {
      console.log('address = ', list2[0].value)
      console.log('coordinates = ', list2[1].value)
      console.log('id_region = ', region.id)
      newAddress({
        address: list2[0].value,
        coordinates: list2[1].value,
        id_region: region.id,
      })
      handleModal({ state: true, region, address: { label: address, id: '' } })
    }

    useEffect(() => {
      getRegions()
    }, [])

    const onErrors = (errors: any) => console.error(errors)

    return (
      <Box
        sx={modalStyle}
        component="form"
        key={2}
        onSubmit={handleSubmitAddAddress(AddAddress, onErrors)}>
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
          {filedsModal.map(
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
                      value={field.value || ''}
                      error={
                        !!(errorsModal?.list2 ?? [])[index]?.value?.message
                      }
                      helperText={
                        (errorsModal?.list2 ?? [])[index]?.value?.message
                      }
                    />
                  )}
                />
              )
            }
          )}
        </Box>
        <ButtonsModalSection
          closeModal={() =>
            handleModal({
              state: false,
              region,
              address: { label: address, id: '' },
            })
          }
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
