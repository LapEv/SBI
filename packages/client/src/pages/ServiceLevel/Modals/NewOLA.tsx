import React, { memo, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapOLAInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useSLA } from 'hooks/sla/useSLA'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'

export const NewOLA = memo(
  React.forwardRef<unknown, ChooseModalProps>(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    ({ handleModal, title }: ChooseModalProps, ref) => {
      const [{ typesOfWork }, { getTypesOfWork }] = useIncidents()
      const [_, { newOLA }] = useSLA()
      const [listTypes, setListTypes] = useState<Options[]>([])
      const [selectedType, setSelectedType] = useState<Options>(emptyValue)
      /* eslint-enable @typescript-eslint/no-unused-vars */
      const { handleSubmit, control } = useForm<AddValuesProps>({
        mode: 'onBlur',
        defaultValues: {
          list: MapOLAInputFields,
        },
      })
      const { errors } = useFormState({ control })
      const { fields } = useFieldArray({
        control,
        name: 'list',
      })

      function changeData({ list }: AddValuesProps) {
        newOLA({
          ola: list[0].value,
          days: list[1].value,
          time: list[3].value,
          timeStart: list[4].value,
          timeEnd: list[5].value,
          id_typeOfWork: selectedType.id,
        })
        handleModal(false)
      }

      useEffect(() => {
        const list = typesOfWork.map(({ typeOfWork, id }) => {
          return {
            label: typeOfWork,
            id: id as string,
          }
        })
        setListTypes(list)
      }, [typesOfWork])

      useEffect(() => {
        getTypesOfWork()
      }, [])

      return (
        <Box
          sx={modalStyle}
          component="form"
          onSubmit={handleSubmit(changeData)}>
          <Typography variant={'h6'}>{title}</Typography>
          {fields.map(
            ({ name, id, label, validation, type, required }, index) => {
              return (
                <Controller
                  key={id}
                  control={control}
                  name={`list.${index}.value`}
                  rules={validation}
                  render={({ field }) =>
                    name !== 'TypeOfWork' ? (
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        label={label}
                        type={type}
                        variant="outlined"
                        sx={{ width: '90%', m: 2, mt: 4, height: 40 }}
                        margin="normal"
                        required={required ?? true}
                        value={field.value || ''}
                        error={!!(errors?.list ?? [])[index]?.value?.message}
                        helperText={(errors?.list ?? [])[index]?.value?.message}
                      />
                    ) : (
                      <DropDown
                        data={listTypes}
                        props={{ mt: 2, width: '90%' }}
                        onChange={setSelectedType}
                        value={selectedType.label || ''}
                        label="Выберите тип работ"
                        errorLabel="Не выбрано ни одного типа работ!"
                      />
                    )
                  }
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
)
