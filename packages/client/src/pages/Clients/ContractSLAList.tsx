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
import { DropDown } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { filterFirstElement } from './Modals/data'
import { SelectMUI } from 'components/Select'

interface ISLAa {
  SLAs: SLA[]
}
export function ContractSLAList({ SLAs }: ISLAa) {
  const [{ sla, typesSLA }, { changeSLA, changeOLA, getSLA, getTypesSLA }] =
    useSLA()
  const [btnDisabled, setbtnDisabled] = useState<boolean>(true)
  const [slaData, setSLAData] = useState<DataList[]>([])
  const [openSLA, setOpenSLA] = useState(false)
  const [filterList, setFilterList] = useState<Options[]>([])
  const [selectedFilter, setSelectedFilter] =
    useState<Options>(filterFirstElement)

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
    getTypesSLA()
  }

  useEffect(() => {
    const listData = sla.map(({ sla, id, TypesSLA }) => {
      console.log('sla = ', sla)
      console.log('id = ', id)
      console.log('SLAs = ', SLAs?.find(item => item.id === id) ? true : false)
      return {
        name: sla,
        id: id as string,
        comment: TypesSLA.typeSLA,
        initChecked: SLAs?.find(item => item.id === id) ? true : false,
      }
    })
    setSLAData(listData)
  }, [sla])

  useEffect(() => {
    const listData = typesSLA.map(item => {
      return {
        ['label']: item.typeSLA as string,
        ['id']: item.id as string,
      }
    })
    listData.unshift(filterFirstElement)
    setFilterList(listData)
  }, [typesSLA])

  const changeFilter = (data: Options) => {
    console.log('data = ', data)
  }

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
        <SelectMUI
          data={filterList}
          props={{ mt: 4 }}
          onChange={changeFilter}
          value={selectedFilter.label || 'Все'}
          label="Выберите фильтр"
          defaultData="Все"
        />
        {slaData?.map(({ name, id, initChecked, comment }) => (
          <Item
            name={name}
            id={`${id}`}
            comment={comment}
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
