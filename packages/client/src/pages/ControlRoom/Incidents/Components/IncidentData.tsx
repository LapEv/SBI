import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MultiTextField, TextField } from 'components/TextFields'
import { modalStyle } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { MapIncidentFields } from '../data'
import { useIncidents } from 'hooks/incidents/useINC'
import { DropDown, emptyValue } from 'components/DropDown'
import { useClients } from 'hooks/clients/useClients'
import { Options } from 'components/DropDown/interface'
import { useContracts } from 'hooks/contracts/useContracts'
import { Contracts } from 'store/slices/contracts/interfaces'
import { SLA } from 'store/slices/sla/interfaces'
import { DateTimeField } from 'components/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { getSLATime } from 'utils/getSLATime'
import { useAuth } from 'hooks/auth/useAuth'
import { convertDateToStringDDMMYYYYHHMMSS } from 'utils/convertDate'
import { AddValuesProps, ChooseModalProps } from '../Modals/interfaces'

export const IncidentData = () => {
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return (
    <Box sx={{ position: 'absolute', display: 'flex', flexWrap: 'wrap' }}>
      {MapIncidentFields.map(value => {
        return (
          <TextField
            key={value.name}
            type={value.type}
            required={value.required ?? true}
            variant="outlined"
            sx={{ width: '35%', m: 2 }}
            margin="normal"
            value={value.name || ''}
            // error={!!(errors?.list ?? [])[index]?.value?.message}
            // helperText={(errors?.list ?? [])[index]?.value?.message}
            // inputProps={{ step: 1 }}
          />
        )
      })}
    </Box>
  )
}
