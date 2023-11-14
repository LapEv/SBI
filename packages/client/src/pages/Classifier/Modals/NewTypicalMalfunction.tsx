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
import { MapTypMalfunctionInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useClassifier } from 'hooks/classifier/useClassifier'

export const NewTypicalMalfunction = React.forwardRef<
  unknown,
  ChooseModalProps
>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [
      { equipments, models },
      { newTypicalMalfunction, getClassifierModelsById },
    ] = useClassifier()
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [equipment, setEquipment] = useState<Options>(emptyValue)
    const [listModels, setModelsList] = useState<Options[]>([])
    const [model, setModel] = useState<Options>(emptyValue)
    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapTypMalfunctionInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    function changeData({ list }: AddValuesProps) {
      newTypicalMalfunction({
        id_equipment: equipment.id,
        id_model: model.id,
        typ,
      })
      handleModal(false)
    }

    const changeEquipment = (data: Options) => {
      setEquipment(data)
      if (!data) {
        setModel({
          label: '',
          id: '',
        })
        setModelsList([])
      }
      getClassifierModelsById(data.id)
      setModel(data)
    }

    useEffect(() => {
      const list = models.filter(item => item.id_equipment === model.id)
      setModelsList(
        list.map(item => {
          return {
            ['label']: item.model as string,
            ['id']: item.id as string,
          }
        })
      )
      setModel({
        label: '',
        id: '',
      })
    }, [models])

    return (
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
        <DropDown
          data={equipments.map(item => {
            return {
              ['label']: item.equipment as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={changeEquipment}
          value={equipment.label}
          label="Выберите классификатор оборудования"
          errorLabel="Не выбран классификатор оборудования!"
        />
        <DropDown
          data={models.map(item => {
            return {
              ['label']: item.model as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 3 }}
          onChange={setModel}
          value={model.label}
          label="Выберите модель оборудования"
          errorLabel="Не выбрана модель оборудования!"
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
        <ButtonsModalSection
          closeModal={() => handleModal(false)}
          btnName="Сохранить"
        />
      </Box>
    )
  }
)
