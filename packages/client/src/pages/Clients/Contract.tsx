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
import { MapContractInputFields } from './data'
import { useAuth } from 'hooks/auth/useAuth'
import { Contracts, IContractData } from 'store/slices/contracts/interfaces'

export function ContractPage({
  contract,
  id,
  number,
  date,
  sla,
  equipment,
  objects,
  id_client,
}: Contracts) {
  const [_, { changeSLA, changeOLA }] = useSLA()
  const [{ admin }] = useAuth()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [contractData, setContractData] = useState<IContractData>({
    contract,
    id,
    number,
    date,
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
      date,
      // sla,
      // equipment,
      // objects,
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
