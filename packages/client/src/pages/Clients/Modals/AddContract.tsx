import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapContractInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useMessage } from 'hooks/message/useMessage'
import { useContracts } from 'hooks/contracts/useContracts'
import { DateField } from 'components/DatePicker'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { Options } from 'components/DropDown/interface'
import { useSLA } from 'hooks/sla/useSLA'
import { DropDownMultiple } from 'components/DropDown'
import { useObjects } from 'hooks/objects/useObjects'

export const AddContract = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ contracts }, { getContracts, newContract }] = useContracts()
    const [{ equipments }, { getClassifierEquipments }] = useClassifier()
    const [{ sla }, { getSLA }] = useSLA()
    const [{ objects }, { getObjects }] = useObjects()
    const [equipmentList, setEquipmentList] = useState<string[]>([])
    const [slaList, setSLAList] = useState<string[]>([])
    const [objectList, setObjectList] = useState<string[]>([])
    const [_, { setMessage }] = useMessage()
    const [dateValue, setDateValue] = useState<string>('')
    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapContractInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    const changeData = ({ list }: AddValuesProps) => {
      console.log('change')
      const isExist = contracts.find(item => item.contract === list[0].value)
      console.log('isExist = ', isExist)
      if (isExist) {
        setMessage({
          text: 'Такой контракт уже существует',
          type: 'error',
        })
        return
      }
      console.log('list = ', list)
      console.log('sla = ', slaList)
      console.log('equipment = ', equipmentList)
      console.log('objects = ', objectList)
      // newContract({
      //   contract: list[0].value,
      //   number: list[1].value,
      //   date: list[2].value,
      // })
      handleModal(false)
    }

    useEffect(() => {
      getContracts()
      getClassifierEquipments()
      getSLA()
      getObjects()
    }, [])

    const setEquipmentData = (data: Options[]) => {
      setEquipmentList(data.map(item => item.id as string))
    }

    const setSLAData = (data: Options[]) => {
      setSLAList(data.map(item => item.id as string))
    }

    const setObjectData = (data: Options[]) => {
      setObjectList(data.map(item => item.id as string))
    }

    return (
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
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
          data={equipments.map(item => {
            return {
              ['label']: item.equipment as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={setEquipmentData}
          value={equipmentList}
          label="Выберите оборудование"
          errorLabel="Не выбрано оборудование!"
        />
        <DropDownMultiple
          data={sla.map(item => {
            return {
              ['label']: item.sla as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={setSLAData}
          value={slaList}
          label="Выберите уровни сервиса"
          errorLabel="Не выбраны уровни сервиса!"
        />
        <DropDownMultiple
          data={objects.map(item => {
            return {
              ['label']: item.object as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={setObjectData}
          value={objectList}
          label="Выберите объекты"
          errorLabel="Не выбраны объекты!"
        />

        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
