import { useEffect, useState } from 'react'
import { Box, Collapse, ListItemButton, ListItemText } from '@mui/material'
import { RotateButton } from 'components/Buttons'
import { useSLA } from 'hooks/sla/useSLA'
import { Item } from 'components/CheckBoxGroup'
import { classifierChild2Component } from 'static/styles'
import { DataList } from 'components/CheckBoxGroup/interface'
import { filterFirstElement } from './Modals/data'
import { SelectMUI } from 'components/Select'
import { useFilteredData } from 'hooks/useFilteredData'

interface ISLAList {
  slaID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}

export function ContractSLAList({ slaID, onChooseItems }: ISLAList) {
  const [{ sla, typesSLA }, { getSLA, getTypesSLA }] = useSLA()
  const [slaData, setSLAData] = useState<DataList[]>([])
  const [openSLA, setOpenSLA] = useState(false)
  const [filterList, setFilterList] = useState<string[]>([])
  const [filterText, setFilterText] = useState<string>('')
  const [selectedFilter, setSelectedFilter] =
    useState<string>(filterFirstElement)
  const filteredData = useFilteredData<DataList>(slaData, filterText, 'comment')

  const openSLAList = () => {
    setOpenSLA(!openSLA)
    getSLA()
    getTypesSLA()
  }

  useEffect(() => {
    const listData = sla.map(({ sla, id, TypesSLA }) => {
      return {
        name: sla,
        id: id as string,
        comment: TypesSLA.typeSLA,
        initChecked: slaID?.find(item => item === id) ? true : false,
      }
    })
    setSLAData(listData)
  }, [sla, slaID])

  useEffect(() => {
    const listData = typesSLA.map(({ typeSLA }) => typeSLA)
    listData.unshift(filterFirstElement)
    setFilterList(listData)
  }, [typesSLA])

  const changeFilter = (text: string) => {
    setFilterText(text === filterFirstElement ? '' : text)
    setSelectedFilter(text)
  }

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
        sx={{ width: '100%', p: 2, pl: 5, pr: 5 }}
        in={openSLA}
        timeout="auto"
        unmountOnExit>
        <SelectMUI
          data={filterList}
          props={{ mt: 4 }}
          onChange={changeFilter}
          value={selectedFilter || filterFirstElement}
          label="Выберите фильтр"
          defaultData="Все"
        />
        <Box
          sx={{
            maxHeight: '33vH',
            overflowX: 'hidden',
            overflowY: 'auto',
            height: 'auto',
          }}>
          {filteredData?.map(({ name, id, initChecked, comment }) => (
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
        </Box>
      </Collapse>
    </Box>
  )
}
