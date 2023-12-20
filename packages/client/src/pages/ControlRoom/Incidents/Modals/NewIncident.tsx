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
import { useContracts } from 'hooks/contracts/useContracts'
import { Contracts } from 'store/slices/contracts/interfaces'

export const NewIncident = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ clients }, { getClients }] = useClients()
    const [{ contracts }, { getContractsByClientID, resetContracts }] =
      useContracts()
    const [{ typesOfWork }, { newIncidentStatuses, getTypesOfWork }] =
      useIncidents()
    const [clientsList, setClientsList] = useState<Options[]>([])
    const [selectedClient, setSelectedClient] = useState<Options>(emptyValue)
    const [activeContract, setActiveContract] = useState<Contracts>()
    const [contractList, setContractList] = useState<Options[]>([])
    const [selectedContract, setSelectedContract] =
      useState<Options>(emptyValue)
    const [objectList, setObjectList] = useState<Options[]>([])
    const [selectedObject, setSelectedObject] = useState<Options>(emptyValue)
    const [slaList, setSLAList] = useState<Options[]>([])
    const [selectedSLA, setSelectedSLA] = useState<Options>(emptyValue)
    const [typeOfWorkList, setTypeOfWorkList] = useState<Options[]>([])
    const [selectedTypeOfWork, setSelectedTypeOfWork] =
      useState<Options>(emptyValue)

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
      resetContracts()
    }, [])

    const setClient = (data: Options) => {
      if (!data) return
      setSelectedClient(data)
      getContractsByClientID(data.id)
    }

    useEffect(() => {
      const list = clients.map(({ client, id }) => {
        return {
          label: client,
          id: id as string,
        }
      })
      setClientsList(list)
    }, [clients])

    const setContract = (data: Options) => {
      setSelectedContract(data)
      const contract = contracts.filter(({ id }) => id === data.id)[0]
      setActiveContract(contract)
      const listObjects = contract.Objects?.map(({ object, id }) => {
        return {
          label: object,
          id: id as string,
        }
      }) as Options[]
      setObjectList(listObjects)
      const listSLAs = contract.SLAs?.map(({ sla, id }) => {
        return {
          label: sla,
          id: id as string,
        }
      }) as Options[]
      setSLAList(listSLAs)
    }

    useEffect(() => {
      const listContracts = contracts.map(({ contract, id }) => {
        return {
          label: contract,
          id: id as string,
        }
      })
      setContractList(listContracts)
    }, [contracts])

    const setSLA = (data: Options) => {
      setSelectedSLA(data)
      const getTypeOfWork = activeContract?.SLAs?.find(
        item => item.id === data.id
      )?.TypesOfWork
      setSelectedTypeOfWork({
        label: getTypeOfWork?.typeOfWork as string,
        id: getTypeOfWork?.id as string,
      })
      getTypesOfWork()
    }

    useEffect(() => {
      const listTypesOfWork = typesOfWork.map(({ typeOfWork, id }) => {
        return {
          label: typeOfWork,
          id: id as string,
        }
      })
      setTypeOfWorkList(listTypesOfWork)
    }, [typesOfWork])

    console.log('contracts = ', contracts)

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
                        props={{ mt: 4, width: '90%' }}
                        onChange={setClient}
                        value={selectedClient.label || ''}
                        label={label}
                        errorLabel="Не выбран клиент!"
                      />
                    )
                  }
                  if (name === 'contract') {
                    return (
                      <DropDown
                        data={contractList}
                        props={{ mt: 4, width: '90%' }}
                        onChange={setContract}
                        value={selectedContract.label || ''}
                        label={label}
                        errorLabel="Не выбран контракт!"
                      />
                    )
                  }
                  if (name === 'object') {
                    return (
                      <DropDown
                        data={objectList}
                        props={{ mt: 4, width: '90%' }}
                        onChange={setSelectedObject}
                        value={selectedObject.label || ''}
                        label={label}
                        errorLabel="Не выбран объект!"
                      />
                    )
                  }
                  if (name === 'sla') {
                    return (
                      <DropDown
                        data={slaList}
                        props={{ mt: 4, width: '90%' }}
                        onChange={setSLA}
                        value={selectedSLA.label || ''}
                        label={label}
                        errorLabel="Не выбран SLA!"
                      />
                    )
                  }
                  if (name === 'typeOfWrok') {
                    return (
                      <DropDown
                        data={typeOfWorkList}
                        props={{ mt: 4, width: '90%' }}
                        onChange={setSelectedTypeOfWork}
                        value={selectedTypeOfWork.label || ''}
                        label={label}
                        errorLabel="Не выбран тип работ!"
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
