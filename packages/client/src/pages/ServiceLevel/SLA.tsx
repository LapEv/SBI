import { Box, Stack } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { User } from 'storeAuth/interfaces'
import { ChangeEvent, useEffect, useState } from 'react'
import { TextField } from 'components/TextFields'
import { Button, ButtonsSection } from 'components/Buttons'
import { deepEqual } from 'utils/deepEqual'
import { IServiceListData, SLAValues } from 'store/slices/sla/interfaces'
import { useSLA } from 'hooks/sla/useSLA'
import {
  MapOLAInputFields,
  MapOLAViewInputFields,
  MapSLAInputFields,
  MapSLAViewInputFields,
} from './data'

export function SLAPage({
  sla,
  ola,
  time,
  timeStart,
  timeEnd,
  id,
}: IServiceListData) {
  const [_, { changeSLA, changeOLA }] = useSLA()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [slaData, setSlaData] = useState<IServiceListData>(
    sla ? { sla, time, timeStart, timeEnd } : { ola, time, timeStart, timeEnd }
  )

  const fieldsData = sla ? MapSLAViewInputFields : MapOLAViewInputFields

  const { handleSubmit, control, reset } = useForm<SLAValues>({
    mode: 'onBlur',
    defaultValues: {
      list: fieldsData.map(data => ({
        ...data,
        value: slaData![data.name as keyof typeof slaData],
      })),
    },
  })
  const { errors, isValid } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })
  const changeData = () => {
    // if (!deepEqual(userData, data)) {
    //   updateUser(userData)
    // }
  }

  const checkForChange = (newData: IServiceListData) => {
    console.log('newData = ', newData)
  }

  const clearChange = () => {
    // updateUserData(data)
    // reset({
    //   list: MapProfileInputFields.map(item => ({
    //     ...item,
    //     value: data![item.name as keyof typeof data],
    //   })),
    // })
  }

  console.log('slaData = ', slaData)

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(changeData)}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          p: 3,
          width: '95%',
        }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{ flexWrap: 'wrap' }}>
          {fields.map(({ id, name, label, validation, type, value }, index) => {
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
                    required
                    variant="outlined"
                    sx={{ width: '48%', height: 80 }}
                    margin="normal"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => (
                      field.onChange(event),
                      checkForChange({
                        ...slaData!,
                        ...{ [name]: event.target.value },
                      })
                    )}
                    error={!!(errors?.list ?? [])[index]?.value?.message}
                    helperText={(errors?.list ?? [])[index]?.value?.message}
                  />
                )}
              />
            )
          })}
        </Stack>
      </Box>
      <ButtonsSection
        btnSecondHandle={clearChange}
        btnName="Сохранить"
        btnDisabled={btnDisabled}
        btnSecondDisabled={btnDisabled}
        btnSecondName="Отменить изменения"
      />
    </Box>
  )
}
