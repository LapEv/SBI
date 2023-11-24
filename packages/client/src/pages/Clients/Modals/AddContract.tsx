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
import { DropDown, DropDownMultiple, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'

export const AddContract = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ contracts }, { getContracts, newContract }] = useContracts()
    const [{ equipments }, { getClassifierEquipments }] = useClassifier()
    const [equipmentList, setEquipmentList] = useState<string[]>([])
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
      const isExist = contracts.find(item => item.contract === list[0].value)
      if (isExist) {
        setMessage({
          text: 'Такой контракт уже существует',
          type: 'error',
        })
        return
      }
      console.log('list = ', list)
      // newContract({ contract: list[0].value, number: list[1].value, date: list[2].value })
      // handleModal(false)
    }

    useEffect(() => {
      getContracts()
      getClassifierEquipments()
    }, [])

    const setEquipmentData = (data: Options[]) => {
      setEquipmentList(data.map(item => item.id as string))
    }

    console.log('equipmentList = ', equipmentList)

    return (
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
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

        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
