import { useEffect } from 'react'
import { Box, Stack, Collapse } from '@mui/material'
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
import { SLAValues } from 'store/slices/sla/interfaces'
import { useSLA } from 'hooks/sla/useSLA'
import { MapContractInputFields } from './data'
import { useAuth } from 'hooks/auth/useAuth'
import { Contracts, IContractData } from 'store/slices/contracts/interfaces'
import { DateField } from 'components/DatePicker'
import {
  convertDateToStringYYYYMMDD,
  convetStringToDate,
} from 'utils/convertDate'
import { Item } from 'components/CheckBoxGroup'

export function ContractPage({
  contract,
  id,
  number,
  date,
  SLAs,
  ClassifierEquipment,
  Objects,
  id_client,
}: Contracts) {
  const [_, { changeSLA, changeOLA }] = useSLA()
  const [{ admin }] = useAuth()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [slaData, setSLAData] = useState<string>('')
  const [openSLA, setOpenSLA] = useState(false)

  const [contractData, setContractData] = useState<IContractData>({
    contract,
    id,
    number,
    date: convertDateToStringYYYYMMDD(date),
    // sla,
    // equipment,
    // objects,
    id_client,
  })

  const { handleSubmit, control, reset } = useForm<SLAValues>({
    mode: 'onBlur',
    defaultValues: {
      list: MapContractInputFields.map(data => ({
        ...data,
        value: contractData![data.name as keyof typeof contractData],
      })),
    },
  })
  const { errors } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  const changeData = ({ list }: SLAValues) => {
    console.log('list = ', list)
  }

  const checkForChange = (newData: IContractData) => {
    if (!admin) return
    setbtnDisabled(deepEqual(newData, contractData))
  }

  const clearChange = () => {
    setbtnDisabled(true)
    const newSLA = {
      contract,
      id,
      number,
      date: convertDateToStringYYYYMMDD(date),
      id_client,
    }
    setContractData(newSLA)
    reset({
      list: MapContractInputFields.map(data => ({
        ...data,
        value: newSLA![data.name as keyof typeof newSLA],
      })),
    })
  }

  const onChooseItems = (checked: boolean, id: string) => {
    // if (!checked) {
    //   setType(
    //     type.map(item =>
    //       item.id !== id
    //         ? item
    //         : {
    //             ...item,
    //             models: item.models.filter(value => value !== id_model),
    //           }
    //     )
    //   )
    //   setSelectedTypes(selectedTypes.filter(value => value !== id))
    //   return
    // }
    // setType(type.map(item => (item.id !== id ? item : checkArrayPush(item))))
    // setSelectedTypes([...selectedTypes, id])
  }

  useEffect(() => {
    // const listData = sla.map(item => {
    //   return {
    //     name: item.typicalMalfunction,
    //     id: item.id as string,
    //     initChecked: item.models.includes(id as string),
    //   }
    // })
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
                        ...contractData!,
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
      {/* <Collapse
        sx={{ width: '100%', p: 2, pl: 5, pr: 5, height: 'auto' }}
        in={openSLA}
        timeout="auto"
        unmountOnExit>
        {sla?.map(({ sla, id }) => (
          <Item
            name={sla}
            id={`${id}`}
            groupChecked={null}
            onChooseItems={onChooseItems}
            // initChecked={initChecked}
            key={id as string}
          />
        ))}
      </Collapse> */}
      {/* <Box sx={{ color: theme.palette.error.main, height: 20, ml: 5 }}>
        {errSelectedItems && 'Контракт не может быть без !'}
      </Box> */}

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
