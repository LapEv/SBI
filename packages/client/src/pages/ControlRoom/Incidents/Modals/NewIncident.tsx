import React, { useEffect, useState, ChangeEvent } from 'react'
import { Box, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { MapINCInputFields } from '../data'
import { useIncidents } from 'hooks/incidents/useINC'
import { DropDown, emptyValue } from 'components/DropDown'
import { useClients } from 'hooks/clients/useClients'
import { Options } from 'components/DropDown/interface'

export const NewIncident = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ clients }, { getClients }] = useClients()
    const [_, { newIncidentStatuses }] = useIncidents()
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [clientsList, setClientsList] = useState<Options[]>([])
    const [selectedClient, setSelectedClient] = useState<Options>(emptyValue)

    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapINCInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    function changeData({ list }: AddValuesProps) {
      newIncidentStatuses({
        statusINC: list[0].value,
      })
      handleModal(false)
    }

    useEffect(() => {
      getClients()
    }, [])

    useEffect(() => {
      const list = clients.map(({ client, id }) => {
        return {
          label: client,
          id: id as string,
        }
      })
      setClientsList(list)
    }, [clients])

    return (
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
        {fields.map(
          ({ id, name, label, validation, type, required }, index) => {
            return (
              <Controller
                key={id}
                control={control}
                name={`list.${index}.value`}
                rules={validation}
                render={({ field }) => {
                  if (type === 'text') {
                    return (
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        label={label}
                        type={type}
                        required={required ?? true}
                        variant="outlined"
                        sx={{ width: '90%', height: 60 }}
                        margin="normal"
                        error={!!(errors?.list ?? [])[index]?.value?.message}
                        helperText={(errors?.list ?? [])[index]?.value?.message}
                        inputProps={{ step: 1 }}
                      />
                    )
                  }
                  if (name === 'client') {
                    return (
                      <DropDown
                        data={clientsList}
                        props={{ mt: 1, width: '90%' }}
                        onChange={data => setSelectedClient(data)}
                        value={selectedClient.label || ''}
                        label="Выберите тип SLA"
                        errorLabel="Не выбран тип SLA!"
                      />
                    )
                  }
                  return <></>
                }}
              />
            )
          }
        )}
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
