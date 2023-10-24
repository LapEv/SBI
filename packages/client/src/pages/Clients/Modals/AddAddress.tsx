import React, { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapAddressInputFields, style, styleTextFieldProps } from '../data'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown } from 'components/DropDown/DropDown'
import { useAddresses } from 'hooks/addresses/useAddresses'
import { useMessage } from 'hooks/message/useMessage'

export const AddAddress = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ regions, addresses }, { getRegions, getAddresses, newAddress }] =
      useAddresses()
    const [_, { setMessage }] = useMessage()
    const [region, setRegion] = useState<string>('')
    const theme = useTheme()
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
      const isExist = addresses.find(item => item.address === list[0].value)
      if (isExist) {
        setMessage({
          text: 'Такой адрес уже существует',
          type: 'error',
        })
        return
      }
      newAddress({ address: list[0].value, coordinates: list[1].value })
      handleModal(false)
    }

    useEffect(() => {
      getAddresses()
      getRegions()
    }, [])

    return (
      <Box sx={style} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
        <DropDown
          data={regions.map(item => {
            return {
              ['categoryName']: item.region as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={setRegion}
          value={region}
          label="Выберите регион"
          errorLabel="Не выбран регион!"
        />
        <Box sx={{ mt: 2, width: '90%' }}>
          {fields.map(({ id, label, validation, type, value }, index) => {
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
                    inputProps={{
                      style: {
                        ...styleTextFieldProps.inputProps,
                        backgroundColor: theme.palette.background.paper,
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        ...styleTextFieldProps.inputLabelProps,
                        color: value
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
