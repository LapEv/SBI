import { useEffect } from 'react'
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
import { SLAValues } from 'store/slices/sla/interfaces'
import { MapContractInputFields } from './data'
import { useAuth } from 'hooks/auth/useAuth'
import { Contracts, IContractData } from 'store/slices/contracts/interfaces'
import { convertDateToStringYYYYMMDD } from 'utils/convertDate'
import { ContractSLAList } from './ContractSLAList'
import { isEqualArr } from 'utils/isEqualArr'
import { useContracts } from 'hooks/contracts/useContracts'

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
  const [{ admin }] = useAuth()
  const [_, { changeContract }] = useContracts()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [slaDisabled, setSLADisabled] = useState<boolean>(true)
  const [dataDisabled, setDataDisabled] = useState<boolean>(true)
  const [slaID, setSLAID] = useState<string[]>([])
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
    changeContract({
      id,
      number: list[0].value as string,
      date: list[1].value as string,
      sla: slaID,
    })
  }

  const checkForChange = (newData: IContractData) => {
    if (!admin) return
    setDataDisabled(deepEqual(newData, contractData))
  }

  const onChooseSLAs = (checked: boolean, id: string) => {
    if (checked) {
      const newSLAs = [...slaID]
      newSLAs.push(id)
      setSLADisabled(isEqualArr(newSLAs, SLAs?.map(({ id }) => id) as string[]))
      setSLAID(newSLAs)
      return
    }
    const newSLAs = slaID.filter(item => item !== id)
    setSLADisabled(isEqualArr(newSLAs, SLAs?.map(({ id }) => id) as string[]))
    setSLAID(newSLAs)
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
    setSLAID(SLAs?.map(({ id }) => id) as string[])
  }

  useEffect(() => {
    setSLAID(SLAs?.map(({ id }) => id) as string[])
  }, [])

  useEffect(() => {
    if (!slaDisabled || !dataDisabled) {
      setbtnDisabled(false)
      return
    }
    setbtnDisabled(true)
  }, [dataDisabled, slaDisabled])

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
      <ContractSLAList slaID={slaID} onChooseItems={onChooseSLAs} />
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
