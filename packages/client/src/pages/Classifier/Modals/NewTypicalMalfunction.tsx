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
import { modalStyle, boxDataModal } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { Item } from 'components/CheckBoxGroup'

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
    const boxRef = React.createRef<HTMLDivElement>()
    const [equipment, setEquipment] = useState<Options>(emptyValue)
    const [selectedModels, setModels] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)

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
        typicalMalfunction: list[0].value,
        models: selectedModels,
      })
      handleModal(false)
    }

    const chooseClassifierEquipment = (data: Options) => {
      getClassifierModelsById(data.id)
      setEquipment(data)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      if (!checked) {
        setModels(selectedModels.filter(value => value !== id))
        return
      }
      setModels([...selectedModels, id])
      if ([...selectedModels, id] && errSelectedItems)
        setErrSelectedItems(false)
    }

    useEffect(() => {
      getClassifierModelsById('')
    }, [])

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
          Выберите модели для этой типовой неисправности:
        </Typography>
        <Box
          ref={boxRef}
          sx={{
            ...boxDataModal,
            height: 200,
            mt: 0,
          }}>
          {models.map(({ model, id }) => (
            <Item
              name={model}
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
