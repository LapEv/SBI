import { Box, Stack, useTheme } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { ChangeEvent, useEffect, useState } from 'react'
import { TextField } from 'components/TextFields'
import { ButtonsSection } from 'components/Buttons'
import { deepEqual } from 'utils/deepEqual'
import {
  IServiceListData,
  SLAList,
  SLAValues,
} from 'store/slices/sla/interfaces'
import { useSLA } from 'hooks/sla/useSLA'
import { MapOLAViewInputFields, MapSLAViewInputFields } from './data'
import { useAuth } from 'hooks/auth/useAuth'
import { Options } from 'components/DropDown/interface'
import { DropDown, emptyValue } from 'components/DropDown'

export function SLAPage({
  sla,
  ola,
  time,
  timeStart,
  timeEnd,
  id,
  id_typeSLA,
  TypesSLA,
}: IServiceListData) {
  const [{ typesSLA }, { changeSLA, changeOLA, getTypesSLA }] = useSLA()
  const [{ admin }] = useAuth()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [listTypes, setListTypes] = useState<Options[]>([])
  const [selectedType, setSelectedType] = useState<Options>(emptyValue)
  const [errSelectedItems, setErrSelectedItems] = useState<string>('')
  const [slaData, setSlaData] = useState<SLAList>(
    sla
      ? { sla, time, timeStart, timeEnd, id, id_typeSLA, TypesSLA }
      : { ola, time, timeStart, timeEnd, id, id_typeSLA, TypesSLA }
  )

  const fieldsData = sla ? MapSLAViewInputFields : MapOLAViewInputFields
  const theme = useTheme()

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
    if (!selectedType) {
      setErrSelectedItems('Не выбрана тип SLA')
      setSelectedType(emptyValue)
      return
    }
    console.log('selectedType = ', selectedType)
    if (sla) {
      changeSLA({
        sla: list[0].value as string,
        time: list[1].value as string,
        timeStart: list[2].value as string,
        timeEnd: list[3].value as string,
        id,
        id_typeSLA: selectedType.id,
      })
    }
    if (ola) {
      changeOLA({
        ola: list[0].value as string,
        time: list[1].value as string,
        timeStart: list[2].value as string,
        timeEnd: list[3].value as string,
        id,
        id_typeSLA: selectedType.id,
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
      ? {
          sla,
          time,
          timeStart,
          timeEnd,
          id,
          id_typeSLA: selectedType.id,
          TypesSLA,
        }
      : {
          ola,
          time,
          timeStart,
          timeEnd,
          id,
          id_typeSLA: selectedType.id,
          TypesSLA,
        }
    setSlaData(newSLA)
    reset({
      list: fieldsData.map(data => ({
        ...data,
        value: newSLA![data.name as keyof typeof newSLA],
      })),
    })
    setSelectedType({
      label: TypesSLA?.typeSLA as string,
      id: TypesSLA?.id as string,
    })
  }

  const changeSelectedTypes = (data: Options) => {
    if (!data) return
    setSelectedType(data)
    checkForChange({
      ...slaData!,
      ...{
        TypesSLA: {
          ...TypesSLA,
          id: data.id,
          typeSLA: data.label,
        },
      },
    })
  }

  useEffect(() => {
    const list = typesSLA.map(({ typeSLA, id }) => {
      return {
        label: typeSLA,
        id: id as string,
      }
    })
    setListTypes(list)
    setSelectedType({
      label: TypesSLA?.typeSLA as string,
      id: TypesSLA?.id as string,
    })
  }, [typesSLA])

  useEffect(() => {
    getTypesSLA()
  }, [])

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
                render={({ field }) =>
                  name !== 'TypeSLA' ? (
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
                  ) : (
                    <DropDown
                      data={listTypes}
                      props={{ mt: 1, width: '48%' }}
                      onChange={data => changeSelectedTypes(data)}
                      value={selectedType.label || ''}
                      label="Выберите тип SLA"
                      errorLabel="Не выбран тип SLA!"
                    />
                  )
                }
              />
            )
          })}
        </Stack>
      </Box>
      {/* <DropDown
        data={listTypes}
        props={{ mt: 1, width: '50%' }}
        onChange={data => changeSelectedTypes(data)}
        value={selectedType.label || ''}
        label="Выберите тип SLA"
        errorLabel="Не выбран тип SLA!"
      /> */}

      <Box sx={{ color: theme.palette.error.main, height: 20 }}>
        {errSelectedItems}
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
