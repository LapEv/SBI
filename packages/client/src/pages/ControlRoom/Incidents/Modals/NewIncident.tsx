import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MultiTextField, TextField } from 'components/TextFields'
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
import { SLA } from 'store/slices/sla/interfaces'
import { DateTimeField } from 'components/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { getSLATime } from 'utils/getSLATime'
import { useAuth } from 'hooks/auth/useAuth'
import { convertDateToStringDDMMYYYYHHMMSS } from 'utils/convertDate'

export const NewIncident = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ user }] = useAuth()
    const [{ clients }, { getClients }] = useClients()
    const [{ contracts }, { getContractsByClientID, resetContracts }] =
      useContracts()
    const [
      { typesOfWork, incStatuses },
      { getTypesOfWork, newINC, getIncidentStatuses },
    ] = useIncidents()
    const [clientsList, setClientsList] = useState<Options[]>([])
    const [selectedClient, setSelectedClient] = useState<Options>(emptyValue)
    const [activeContract, setActiveContract] = useState<Contracts>()
    const [contractList, setContractList] = useState<Options[]>([])
    const [selectedContract, setSelectedContract] =
      useState<Options>(emptyValue)
    const [objectList, setObjectList] = useState<Options[]>([])
    const [selectedObject, setSelectedObject] = useState<Options>(emptyValue)
    const [dateValue, setDateValue] = useState<Dayjs>()
    const [slaList, setSLAList] = useState<Options[]>([])
    const [selectedSLA, setSelectedSLA] = useState<Options>(emptyValue)
    const [typeOfWorkList, setTypeOfWorkList] = useState<Options[]>([])
    const [selectedTypeOfWork, setSelectedTypeOfWork] =
      useState<Options>(emptyValue)
    const [equipmentList, setEquipmentList] = useState<Options[]>([])
    const [selectedEquipment, setSelectedEquipment] =
      useState<Options>(emptyValue)
    const [modelList, setModelList] = useState<Options[]>([])
    const [selectedModel, setSelectedModel] = useState<Options>(emptyValue)
    const [typicalMalfunctionList, setTypicalMalfunctionList] = useState<
      Options[]
    >([])
    const [selectedTypicalMalfunction, setSelectedTypicalMalfunction] =
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
      const id_incStatus = incStatuses.find(item =>
        item.statusINC.includes('Зарегистрирован')
      )?.id as string
      const newINCobject = {
        clientID: selectedClient.id,
        contractID: selectedContract.id,
        objectID: selectedObject.id,
        SLAID: selectedSLA.id,
        typeOfWorkID: selectedTypeOfWork.id,
        timeSLA: convertDateToStringDDMMYYYYHHMMSS(
          dayjs(dateValue).format('DD/MM/YYYYTHH:mm:ss')
        ),
        id_incStatus,
        clientINC: list[7].value,
        responsibleID: user.id as string,
        equipmentId: selectedEquipment.id,
        modelId: selectedModel.id,
        typicalMalfunctionID: selectedTypicalMalfunction.id,
        description: list[12].value,
        comment: list[13].value,
        applicant: list[9].value,
        applicantContacts: list[11].value,
        methodsReuqest: 'manually',
      }
      newINC(newINCobject)
      handleModal(false)
    }

    useEffect(() => {
      getIncidentStatuses()
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
      if (data.id) {
        const contract = contracts.filter(({ id }) => id === data.id)[0]
        setActiveContract(contract)
        const listObjects = contract.Objects?.map(
          ({ object, id, internalClientName, internalClientID }) => {
            return {
              label: object,
              id: id as string,
              description: internalClientName ?? '',
              descriptionID: internalClientID ?? '',
            }
          }
        ) as Options[]
        setObjectList(listObjects)
        const listSLAs = contract.SLAs?.map(({ sla, id }) => {
          return {
            label: sla,
            id: id as string,
          }
        }) as Options[]
        setSLAList(listSLAs)
        const listEquipment = contract.ClassifierEquipments?.map(
          ({ equipment, id }) => {
            return {
              label: equipment,
              id: id as string,
            }
          }
        ) as Options[]
        setEquipmentList(listEquipment)
      } else {
        setActiveContract(undefined)
        setObjectList([])
        setObjectList([])
        setEquipmentList([])
      }
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
      if (!data.id) {
        setSelectedTypeOfWork({
          label: '',
          id: '',
        })
        setDateValue(undefined)
        return
      }
      const slaData = activeContract?.SLAs?.find(item => item.id === data.id)
      const getTypeOfWork = slaData?.TypesOfWork
      const { days, time, timeEnd, timeStart } = slaData as SLA
      setSelectedTypeOfWork({
        label: getTypeOfWork?.typeOfWork as string,
        id: getTypeOfWork?.id as string,
      })
      getTypesOfWork()
      const timeSLA = getSLATime({ days, time, timeEnd, timeStart })

      const newdate = dayjs()
        .set('date', timeSLA.getDate())
        .set('month', timeSLA.getMonth())
        .set('year', timeSLA.getFullYear())
        .set('hour', timeSLA.getHours())
        .set('minute', timeSLA.getMinutes())
        .set('second', timeSLA.getSeconds())
      setDateValue(newdate)
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

    const setEquimpent = (data: Options) => {
      setSelectedEquipment(data)
      if (data.id) {
        const activeEquipment = activeContract?.ClassifierEquipments?.filter(
          item => item.id === data.id
        )[0]
        const listModels = activeEquipment?.ClassifierModels?.map(
          ({ model, id }) => {
            return {
              label: model,
              id: id as string,
            }
          }
        ) as Options[]
        setModelList(listModels)
      } else {
        setModelList([])
      }
    }

    const setModel = (data: Options) => {
      setSelectedModel(data)
      if (data.id) {
        const activeEquipment = activeContract?.ClassifierEquipments?.filter(
          item => item.id === selectedEquipment.id
        )[0]
        const activeModel = activeEquipment?.ClassifierModels?.filter(
          item => item.id === data.id
        )[0]
        const listTypical = activeModel?.TypicalMalfunctions?.map(
          ({ typicalMalfunction, id }) => {
            return {
              label: typicalMalfunction,
              id: id as string,
            }
          }
        ) as Options[]
        setTypicalMalfunctionList(listTypical)
      } else {
        setTypicalMalfunctionList([])
      }
    }

    return (
      <Box
        sx={{ ...modalStyle, width: '80%', minHeight: 500 }}
        component="form"
        onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-around"
          alignItems="flex-start"
          sx={{ flexWrap: 'wrap' }}>
          {fields.map(
            ({ id, name, label, validation, type, required }, index) => {
              return (
                <Controller
                  key={id}
                  control={control}
                  name={`list.${index}.value`}
                  rules={validation}
                  render={({ field }) => {
                    if (name === 'client') {
                      return (
                        <DropDown
                          data={clientsList}
                          props={{ width: '45%', m: 2 }}
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
                          props={{ width: '45%', m: 2 }}
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
                          props={{ width: '45%', m: 2 }}
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
                          props={{ width: '45%', m: 2 }}
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
                          props={{ width: '45%', m: 2 }}
                          onChange={setSelectedTypeOfWork}
                          value={selectedTypeOfWork.label || ''}
                          label={label}
                          errorLabel="Не выбран тип работ!"
                        />
                      )
                    }
                    if (name === 'equipment') {
                      return (
                        <DropDown
                          data={equipmentList}
                          props={{ width: '45%', m: 2 }}
                          onChange={setEquimpent}
                          value={selectedEquipment.label || ''}
                          label={label}
                          errorLabel="Не выбран классификатор!"
                        />
                      )
                    }
                    if (name === 'model') {
                      return (
                        <DropDown
                          data={modelList}
                          props={{ width: '45%', m: 2 }}
                          onChange={setModel}
                          value={selectedModel.label || ''}
                          label={label}
                          errorLabel="Не выбрана модель!"
                        />
                      )
                    }
                    if (name === 'typicalMalfunction') {
                      return (
                        <DropDown
                          data={typicalMalfunctionList}
                          props={{ width: '45%', m: 2 }}
                          onChange={setSelectedTypicalMalfunction}
                          value={selectedTypicalMalfunction.label || ''}
                          label={label}
                          errorLabel="Не выбрана типовая неисправность!"
                        />
                      )
                    }
                    if (name === 'timeSLA') {
                      return (
                        <DateTimeField
                          dateValue={dateValue as Dayjs}
                          setDateValue={setDateValue}
                          sx={{ width: '45%', m: 2 }}
                        />
                      )
                    }
                    if (name === 'description' || name === 'comments') {
                      return (
                        <MultiTextField
                          {...field}
                          inputRef={field.ref}
                          label={label}
                          type={type}
                          required={required ?? true}
                          variant="outlined"
                          sx={{ width: '45%', m: 2 }}
                          margin="normal"
                          multiline
                          maxRows={3}
                          value={field.value || ''}
                          error={!!(errors?.list ?? [])[index]?.value?.message}
                          helperText={
                            (errors?.list ?? [])[index]?.value?.message
                          }
                          inputProps={{ step: 1 }}
                        />
                      )
                    }
                    return (
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        label={label}
                        type={type}
                        required={required ?? true}
                        variant="outlined"
                        sx={{ width: '45%', m: 2 }}
                        margin="normal"
                        value={field.value || ''}
                        error={!!(errors?.list ?? [])[index]?.value?.message}
                        helperText={(errors?.list ?? [])[index]?.value?.message}
                        inputProps={{ step: 1 }}
                      />
                    )
                  }}
                />
              )
            }
          )}
        </Stack>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
