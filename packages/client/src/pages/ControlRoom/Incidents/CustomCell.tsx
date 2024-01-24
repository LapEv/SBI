import { memo, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDown } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IExecutor } from './interfaces'
import { TextField } from 'components/TextFields'
import { Box } from '@mui/material'
import { customCellHeight } from './data'

export const CustomCell = memo(({ value, id }: IExecutor) => {
  // const [{ fieldEngineers, user }] = useAuth()
  // const [_, { changeExecutor, changeResponsible }] = useIncidents()
  // const [executor, setExecutor] = useState<Options>({ label: value, id: '' })

  // const setData = (data: Options) => {
  //   setExecutor(data)
  //   changeExecutor({ id, id_incExecutor: data.id })
  //   changeResponsible({ id, id_incResponsible: user.id })
  // }

  return <Box sx={{ widht: 300, height: customCellHeight }}>{value}</Box>
})
