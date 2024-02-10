import React, { useEffect, useState } from 'react'
import { AddValuesProps, CloseINCProps } from './interfaces'
import { Box, Typography } from '@mui/material'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { TextField } from 'components/TextFields'
import { MapINCStatusCloseInputFields } from '../data'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'

export const ChangeStatus = React.forwardRef<unknown, CloseINCProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title, data }: CloseINCProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ typesCompletedWork }, { getTypesCompletedWork }] = useIncidents()
    const [typeCompletedWorkList, setTypeCompletedWorkList] = useState<
      Options[]
    >([])
    const [selectedTypeCompletedWork, setSelectedTypeCompletedWork] =
      useState<Options>(emptyValue)

    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapINCStatusCloseInputFields,
      },
    })
    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    const changeData = ({ list }: AddValuesProps) => {
      handleModal({
        state: true,
        commentCloseCheck: list[0].value,
        act: list[1].value,
        spaceParts: list[2].value,
        data,
      })
    }

    useEffect(() => {
      const list = typesCompletedWork.map(({ typeCompletedWork, id }) => {
        return {
          label: typeCompletedWork,
          id: id as string,
        }
      })
      setTypeCompletedWorkList(list)
    }, [typesCompletedWork])

    useEffect(() => {
      getTypesCompletedWork()
    }, [])

    return (
      <Box
        sx={{ ...modalStyle, paddingLeft: 5 }}
        component="form"
        onSubmit={handleSubmit(changeData)}>
        <Typography variant={'h6'}>{title}</Typography>
        <Box sx={{ mt: 2, width: '90%' }}>
          {fields.map(
            ({ id, label, validation, type, required, name }, index) => {
              return (
                <Controller
                  key={id}
                  control={control}
                  name={`list.${index}.value`}
                  rules={validation}
                  render={({ field }) => {
                    if (name === 'typeCompletedWork') {
                      return (
                        <DropDown
                          data={typeCompletedWorkList}
                          props={{ width: '100%', mb: 2 }}
                          onChange={setSelectedTypeCompletedWork}
                          value={selectedTypeCompletedWork.label || ''}
                          label={label}
                          errorLabel="Не выбран тип выполненных работ!"
                        />
                      )
                    }
                    return (
                      <TextField
                        {...field}
                        inputRef={field.ref}
                        label={label}
                        type={type}
                        variant="outlined"
                        required={required ?? true}
                        sx={{ width: '100%', mt: 2, height: 40 }}
                        margin="normal"
                        value={field.value || ''}
                        error={!!(errors?.list ?? [])[index]?.value?.message}
                        helperText={(errors?.list ?? [])[index]?.value?.message}
                      />
                    )
                  }}
                />
              )
            }
          )}
        </Box>
        <ButtonsModalSection
          closeModal={() => handleModal({ state: false, data })}
          btnName={'Сохранить'}
        />
      </Box>
    )
  }
)
