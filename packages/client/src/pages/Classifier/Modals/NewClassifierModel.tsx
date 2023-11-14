import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapModelsInputFields } from '../data'
import { modalStyle, boxDataModal } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { Item } from 'components/CheckBoxGroup'

export const NewClassifierModel = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [
      { equipments, typicalMalfunctions },
      { newClassifierModel, getTypicalMalfunctionsById },
    ] = useClassifier()
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const boxRef = React.createRef<HTMLDivElement>()
    const [equipment, setEquipment] = useState<Options>(emptyValue)
    const [selectedTypicalMalfunctions, setGroup] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)

    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapModelsInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    function changeData({ list }: AddValuesProps) {
      newClassifierModel({
        id_equipment: equipment.id,
        model: list[0].value,
        selectedTypicalMalfunctions,
      })
      handleModal(false)
    }

    const chooseClassifierEquipment = (data: Options) => {
      getTypicalMalfunctionsById(data.id)
      setEquipment(data)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setGroup(selectedTypicalMalfunctions.filter(value => value !== id))
        return
      }
      setGroup([...selectedTypicalMalfunctions, id])
      if ([...selectedTypicalMalfunctions, id] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getTypicalMalfunctionsById('')
    }, [])

    return (
      <Box
        sx={{ ...modalStyle, minHeight: 300 }}
        component="form"
        onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
        <DropDown
          data={equipments.map(item => {
            return {
              ['label']: item.equipment as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={chooseClassifierEquipment}
          value={equipment.label}
          label="Выберите классификатор оборудования"
          errorLabel="Не выбран классификатор оборудования!"
        />
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
                  sx={{ width: '90%', m: 2, mt: 4, height: 40 }}
                  margin="normal"
                  required
                  value={field.value || ''}
                  error={!!(errors?.list ?? [])[index]?.value?.message}
                  helperText={(errors?.list ?? [])[index]?.value?.message}
                />
              )}
            />
          )
        })}
        <Typography sx={{ fontSize: 14 }}>
          Выберите типовые неисправности для этой модели:
        </Typography>
        <Box
          ref={boxRef}
          sx={{
            ...boxDataModal,
            height: 200,
            mt: 0,
          }}>
          {typicalMalfunctions.map(({ typicalMalfunction, id }) => (
            <Item
              name={typicalMalfunction}
              id={`${id}`}
              groupChecked={false}
              onChooseItems={onChooseItems}
              key={id}
            />
          ))}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
