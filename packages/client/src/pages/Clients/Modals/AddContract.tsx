import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapNewContractInputFields } from '../data'
import { classifierChild2Component, modalStyle } from 'static/styles'
import { ButtonsModalSection, RotateButton } from 'components/Buttons'
import { useMessage } from 'hooks/message/useMessage'
import { useContracts } from 'hooks/contracts/useContracts'
import { DateField } from 'components/DatePicker'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { Options } from 'components/DropDown/interface'
import { useSLA } from 'hooks/sla/useSLA'
import { DropDown, DropDownMultiple, emptyValue } from 'components/DropDown'
import { useObjects } from 'hooks/objects/useObjects'
import { useClients } from 'hooks/clients/useClients'
import { convetStringToDate } from 'utils/convertDate'
import dayjs from 'dayjs'
import { CheckBoxGroup } from 'components/CheckBoxGroup'

export const AddContract = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [openList, setOpenList] = useState(false)
    const [{ clients }, { getClients }] = useClients()
    const [{ contracts }, { getContracts, newContract }] = useContracts()
    const [{ equipments, models }, { getClassifierEquipments }] =
      useClassifier()
    const [{ sla }, { getSLA }] = useSLA()
    const [{ objects }, { getObjects }] = useObjects()
    const [client, setClient] = useState<Options>(emptyValue)
    const [slaList, setSLAList] = useState<Options[]>([])
    const [objectList, setObjectList] = useState<Options[]>([])
    const [selectedEquipments, setSelectedEquipments] = useState<string[]>([])
    const [selectedModels, setSelectedModels] = useState<string[]>([])
    const [errEquipment, setErrEquipment] = useState<boolean>(false)
    const [errSLA, setErrSLA] = useState<boolean>(false)
    const [errObject, setErrObject] = useState<boolean>(false)
    const [_, { setMessage }] = useMessage()
    const [dateValue, setDateValue] = useState<string>('')
    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapNewContractInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    const changeData = ({ list }: AddValuesProps) => {
      const isExist = contracts.find(item => item.contract === list[0].value)
      if (isExist) {
        setMessage({
          text: 'Такой контракт уже существует',
          type: 'error',
        })
        return
      }
      // if (!equipmentList.length) {
      //   setErrEquipment(true)
      //   return
      // }
      if (!slaList.length) {
        setErrSLA(true)
        return
      }
      if (!objectList.length) {
        setErrObject(true)
        return
      }
      const date = convetStringToDate(
        dayjs(dateValue).format('DD/MM/YYYY'),
        '/'
      )
      console.log('selectedEquipments = ', selectedEquipments)
      // newContract({
      //   contract: list[0].value,
      //   number: list[1].value,
      //   date: date,
      //   sla: slaList.map(item => item.id),
      //   equipment: selectedEquipments,
      //   model: selectedModels,
      //   objects: objectList.map(item => item.id),
      //   id_client: client.id,
      // })
      // handleModal(false)
    }

    useEffect(() => {
      getContracts()
      getClients()
      getClassifierEquipments()
      getSLA()
      getObjects()
    }, [])

    const onChooseGroup = (checked: boolean, id: string) => {
      if (!checked) {
        const groupArr = selectedEquipments.filter(value => value !== id)
        setSelectedEquipments(groupArr)
        if (!groupArr.length) {
          setSelectedModels([])
        }
        return
      }
      if (!selectedEquipments.includes(id)) {
        setSelectedEquipments([...selectedEquipments, id])
      }
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setSelectedModels(selectedModels.filter(value => value !== id))
        return
      }
      if (!selectedModels.includes(id)) {
        setSelectedModels([...selectedModels, id])
      }
    }

    return (
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit(changeData)}>
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
                  sx={{ width: '90%', mt: 3, height: 40 }}
                  margin="normal"
                  value={field.value || ''}
                  error={!!(errors?.list ?? [])[index]?.value?.message}
                  helperText={(errors?.list ?? [])[index]?.value?.message}
                />
              )}
            />
          )
        })}
        <DateField dateValue={dateValue} setDateValue={setDateValue} />
        <DropDownMultiple
          data={sla.map(item => {
            return {
              ['label']: item.sla as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={setSLAList}
          value={slaList}
          label="Выберите уровни сервиса"
          errorLabel="Не выбраны уровни сервиса!"
          error={errSLA}
        />
        <ListItemButton
          divider={openList}
          sx={{ ...classifierChild2Component, mt: 1 }}
          onClick={() => setOpenList(!openList)}>
          <ListItemText
            primary={'Выбор классификатора'}
            sx={{ ml: 2 }}
            primaryTypographyProps={{ fontSize: '1rem!important' }}
          />
          <RotateButton open={openList} size={'2rem'} />
        </ListItemButton>
        <Collapse
          sx={{ ...classifierChild2Component, width: '85%' }}
          in={openList}
          timeout="auto"
          unmountOnExit>
          {equipments.map(({ equipment, id, ClassifierModels }) => {
            const groupData = {
              id: id as string,
              group: equipment,
              checkedGroup: selectedEquipments.includes(id as string),
              items: ClassifierModels?.map(({ model, id }) => {
                return {
                  item: model,
                  id: id as string,
                  checkedItems: selectedModels.includes(id as string),
                }
              }) as [],
            }
            return (
              <CheckBoxGroup
                key={`${id}`}
                data={groupData}
                onChooseGroup={onChooseGroup}
                onChooseItems={onChooseItems}
              />
            )
          })}
        </Collapse>
        <DropDownMultiple
          data={objects.map(item => {
            return {
              ['label']: item.object as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={setObjectList}
          value={objectList}
          label="Выберите объекты"
          errorLabel="Не выбраны объекты!"
          error={errObject}
        />

        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
