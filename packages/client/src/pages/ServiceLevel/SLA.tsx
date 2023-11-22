import { Box, Stack } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { ChangeEvent, useState } from 'react'
import { TextField } from 'components/TextFields'
import { ButtonsSection } from 'components/Buttons'
import { deepEqual } from 'utils/deepEqual'
import { IServiceListData, SLAValues } from 'store/slices/sla/interfaces'
import { useSLA } from 'hooks/sla/useSLA'
import { MapOLAViewInputFields, MapSLAViewInputFields } from './data'
import { useAuth } from 'hooks/auth/useAuth'

export function SLAPage({
  sla,
  ola,
  time,
  timeStart,
  timeEnd,
  id,
}: IServiceListData) {
  const [_, { changeSLA, changeOLA }] = useSLA()
  const [{ admin }] = useAuth()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [slaData, setSlaData] = useState<IServiceListData>(
    sla
      ? { sla, time, timeStart, timeEnd, id }
      : { ola, time, timeStart, timeEnd, id }
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
  const { errors } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  const changeData = ({ list }: SLAValues) => {
    if (sla) {
      changeSLA({
        sla: list[0].value,
        time: list[1].value,
        timeStart: list[2].value,
        timeEnd: list[3].value,
        id,
      })
    }
    if (ola) {
      changeOLA({
        ola: list[0].value,
        time: list[1].value,
        timeStart: list[2].value,
        timeEnd: list[3].value,
        id,
      })
    }
  }

  const checkForChange = (newData: IServiceListData) => {
    if (!admin) return
    setbtnDisabled(deepEqual(newData, slaData))
  }

  const clearChange = () => {
    setbtnDisabled(true)
    const newSLA = sla
      ? { sla, time, timeStart, timeEnd, id }
      : { ola, time, timeStart, timeEnd, id }
    setSlaData(newSLA)
    reset({
      list: fieldsData.map(data => ({
        ...data,
        value: newSLA![data.name as keyof typeof newSLA],
      })),
    })
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(changeData)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          width: '95%',
        }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{ flexWrap: 'wrap', width: '100%' }}>
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
                    sx={{ width: '48%', height: 60 }}
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
                    inputProps={{ step: 1 }}
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
