import React, { useState, useEffect } from 'react'
import { Box, Modal, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import {
  ChooseModalProps,
  AddValuesProps,
  answerModalAddAddressInObject,
} from './interfaces'
import { MapObjectInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useMessage } from 'hooks/message/useMessage'
import { Options } from 'components/DropDown/interface'
import { useObjects } from 'hooks/objects/useObjects'
import { useClients } from 'hooks/clients/useClients'
import { ModalAddAddressInObject } from './'

export const AddObject = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ clients }, { getClients }] = useClients()
    const [{ regions, addresses }, { getRegions, getAddresses, newAddress }] =
      useAddresses()
    const [{ objects }, { getObjects, newObject }] = useObjects()
    const [_, { setMessage }] = useMessage()
    const [client, setClient] = useState<Options>(emptyValue)
    const [region, setRegion] = useState<Options>(emptyValue)
    const [address, setAddress] = useState<Options>(emptyValue)
    const [newAddressName, setNewAddress] = useState<string>('')
    const [modal, setModal] = useState<boolean>(false)
    const modalRef = React.createRef()

    const { handleSubmit, control, register } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapObjectInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    const changeData = ({ list }: AddValuesProps) => {
      console.log('changeData')
      const isExistObject = objects.find(item => item.object === list[0].value)
      if (isExistObject) {
        setMessage({
          text: 'Такой объект уже существуeт',
          type: 'error',
        })
        return
      }
      const isExistIntNumber = objects.find(
        item => item.internalClientID === list[1].value
      )
      if (isExistIntNumber) {
        setMessage({
          text: 'Такой клиентский номер уже существуeт',
          type: 'error',
        })
        return
      }
      const isExistInt = objects.find(
        item => item.internalClientName === list[2].value
      )
      if (isExistInt) {
        setMessage({
          text: 'Такое клиентское название уже существуeт',
          type: 'error',
        })
        return
      }
      // newObject({
      //   object: list[0].value,
      //   internalClientID: list[1].value,
      //   internalClientName: list[2].value,
      //   id_client: client.id,
      //   id_address: address.id,
      //   id_region: region.id,
      // })
      handleModal(false)
    }

    useEffect(() => {
      getClients()
      getObjects()
      getAddresses()
      getRegions()
    }, [])

    const checkAddress = (text: string) => {
      const isAddress = addresses.find(item => item.address === text)
      if (isAddress || !text) return
      setNewAddress(text)
      setModal(true)
    }

    const setModalNewAddress = ({
      state,
      region,
    }: answerModalAddAddressInObject) => {
      if (state) {
        setRegion(region)
      }
      getAddresses()
      setModal(false)
    }

    console.log('objects = ', objects)

    return (
      <Box>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <ModalAddAddressInObject
            handleModal={setModalNewAddress}
            ref={modalRef}
            question={`Вы дествительно создать новый адрес: "${newAddressName}"`}
            address={newAddressName}
          />
        </Modal>
        <Box
          sx={modalStyle}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          <DropDown
            data={clients.map(item => {
              return {
                ['label']: item.client as string,
                ['id']: item.id as string,
              }
            })}
            props={{ mt: 3 }}
            onChange={setClient}
            value={client.label}
            label="Выберите клиента"
            errorLabel="Не выбран клиент!"
          />
          <Box sx={{ mt: 1, width: '90%' }}>
            {fields.map(({ id, label, validation, type, required }, index) => {
              return (
                <Controller
                  key={id}
                  control={control}
                  // name={`list.${index}.value`}
                  {...register(`list.${index}.value`)}
                  rules={validation}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      inputRef={field.ref}
                      label={label}
                      type={type}
                      variant="outlined"
                      required={required ?? true}
                      sx={{ width: '100%', mt: 3, height: 40 }}
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
          <DropDown
            data={addresses.map(item => {
              return {
                ['label']: item.address as string,
                ['id']: item.id as string,
              }
            })}
            props={{ mt: 3 }}
            onBlur={checkAddress}
            onChange={setAddress}
            value={address.label}
            label="Выберите адрес"
            errorLabel="Не выбран адрес!"
          />
          <DropDown
            data={regions.map(item => {
              return {
                ['label']: item.region as string,
                ['id']: item.id as string,
              }
            })}
            props={{ mt: 4 }}
            onChange={setRegion}
            value={region.label}
            label="Выберите регион"
            errorLabel="Не выбран регион!"
          />
          <ButtonsModalSection
            closeModal={() => handleModal(false)}
            btnName="Сохранить"
          />
        </Box>
      </Box>
    )
  }
)
