import React, { memo, useEffect, useState } from 'react'
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemText,
  Modal,
} from '@mui/material'
import { IconPopoverButton, RotateButton } from 'components/Buttons'
import { useSLA } from 'hooks/sla/useSLA'
import { Item } from 'components/CheckBoxGroup'
import { classifierChild2Component, popoverIcon } from 'static/styles'
import { DataList } from 'components/CheckBoxGroup/interface'
import { filterFirstElement } from './Modals/data'
import { SelectMUI } from 'components/Select'
import { useFilteredData } from 'hooks/useFilteredData'
import { useAuth } from 'hooks/auth/useAuth'
import { NewSLA } from 'pages/ServiceLevel/Modals'
import { ModalTitles } from 'pages/ServiceLevel/data'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useIncidents } from 'hooks/incidents/useINC'
import { ISLAList } from './interfaces'

export const ContractSLAList = memo(({ slaID, onChooseItems }: ISLAList) => {
  const modalRef = React.createRef()
  const [modal, setModal] = useState<boolean>(false)
  const [{ admin }] = useAuth()
  const [{ typesOfWork }, { getTypesOfWork }] = useIncidents()
  const [{ sla }, { getSLA }] = useSLA()
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
    getTypesOfWork()
  }

  useEffect(() => {
    const listData = sla.map(({ sla, id, TypesOfWork }) => {
      return {
        name: sla,
        id: id as string,
        comment: TypesOfWork.typeOfWork,
        initChecked: slaID?.find(item => item === id) ? true : false,
      }
    })
    setSLAData(listData)
  }, [sla, slaID])

  useEffect(() => {
    const listData = typesOfWork.map(({ typeOfWork }) => typeOfWork)
    listData.unshift(filterFirstElement)
    setFilterList(listData)
  }, [typesOfWork])

  const changeFilter = (text: string) => {
    setFilterText(text === filterFirstElement ? '' : text)
    setSelectedFilter(text)
  }

  const AddNewSLA = () => {
    setModal(true)
  }

  const handleModal = (bool: boolean) => {
    setModal(bool)
  }

  return (
    <Box sx={{ width: '95%' }}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <NewSLA
          ref={modalRef}
          handleModal={handleModal}
          title={ModalTitles.newSLA}
        />
      </Modal>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <SelectMUI
            data={filterList}
            props={{ height: 40 }}
            onChange={changeFilter}
            value={selectedFilter || filterFirstElement}
            label="Выберите фильтр"
            defaultData="Все"
          />
          {admin && (
            <IconPopoverButton
              popover={'Добавить уровень сервиса'}
              onClick={AddNewSLA}
              icon={<AddCircleOutlineIcon />}
              propsPopover={{ ml: -1 }}
              sx={popoverIcon}
            />
          )}
        </Box>
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
})
