import { useEffect } from 'react'
import {
  Box,
  Stack,
  Collapse,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { ChangeEvent, useState } from 'react'
import { TextField } from 'components/TextFields'
import { ButtonsSection, RotateButton } from 'components/Buttons'
import { deepEqual } from 'utils/deepEqual'
import { SLA, SLAValues } from 'store/slices/sla/interfaces'
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
import { classifierChild2Component } from 'static/styles'
import { DataList } from 'components/CheckBoxGroup/interface'

interface ISLAa {
  SLAs: SLA[]
}
export function ContractSLAList({ SLAs }: ISLAa) {
  const [{ sla }, { changeSLA, changeOLA, getSLA }] = useSLA()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [slaData, setSLAData] = useState<DataList[]>([])
  const [openSLA, setOpenSLA] = useState(false)

  const onChooseItems = (checked: boolean, id: string) => {
    console.log('clearChange')
  }

  const clearChange = () => {
    console.log('clearChange')
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

  const openSLAList = () => {
    setOpenSLA(!openSLA)
    getSLA()
  }

  useEffect(() => {
    const listData = sla.map(({ sla, id }) => {
      console.log('sla = ', sla)
      console.log('id = ', id)
      console.log('SLAs = ', SLAs?.find(item => item.id === id) ? true : false)
      return {
        name: sla,
        id: id as string,
        initChecked: SLAs?.find(item => item.id === id) ? true : false,
      }
    })
    setSLAData(listData)
  }, [sla])

  console.log('slaData = ', slaData)

  return (
    <Box sx={{ width: '95%' }}>
      <ListItemButton
        divider={openSLA}
        sx={classifierChild2Component}
        onClick={openSLAList}>
        <ListItemText
          primary={'Уровни сервиса'}
          sx={{ ml: 2 }}
          primaryTypographyProps={{ fontSize: '1rem!important' }}
        />
        <RotateButton open={openSLA} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', p: 2, pl: 5, pr: 5, height: 'auto' }}
        in={openSLA}
        timeout="auto"
        unmountOnExit>
        {slaData?.map(({ name, id, initChecked }) => (
          <Item
            name={name}
            id={`${id}`}
            groupChecked={null}
            onChooseItems={onChooseItems}
            initChecked={initChecked}
            key={id as string}
          />
        ))}
      </Collapse>
      {/* <Box sx={{ color: theme.palette.error.main, height: 20, ml: 5 }}>
        {errSelectedItems && 'Контракт не может быть без !'}
      </Box> */}
    </Box>
  )
}
