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
import { MapOLAInputFields } from '../data'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useSLA } from 'hooks/sla/useSLA'
import { DropDown, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'

export const NewOLA = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ typesSLA }, { newOLA, getTypesSLA }] = useSLA()
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
        time: list[1].value,
        timeStart: list[2].value,
        timeEnd: list[3].value,
        id_typeSLA: selectedType.id,
      })
      handleModal(false)
    }

    useEffect(() => {
      const list = typesSLA.map(({ typeSLA, id }) => {
        return {
          label: typeSLA,
          id: id as string,
        }
      })
      setListTypes(list)
    }, [typesSLA])

    useEffect(() => {
      getTypesSLA()
    }, [])

    return (
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit(changeData)}>
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
                  name !== 'TypeSLA' ? (
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
                      label="Выберите тип SLA"
                      errorLabel="Не выбран тип SLA!"
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
