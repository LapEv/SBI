import React, { useEffect, useState, MouseEvent } from 'react'
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemText,
  IconButton,
  useTheme,
  Popover,
  Modal,
  Typography,
} from '@mui/material'
import { RotateButton } from 'components/Buttons'
import { CheckBoxGroups } from 'components/CheckBoxGroup'
import { classifierChild2Component } from 'static/styles'
import { ICheckBoxGroupData } from 'components/CheckBoxGroup/interface'
import { filterFirstElement } from './Modals/data'
import { SelectMUI } from 'components/Select'
import { useAuth } from 'hooks/auth/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { useFilteredData } from 'hooks/useFilteredData'
import { SwitchToClassifierPage } from './'

interface IEquipmentList {
  equipmentID: string[]
  modelID: string[]
  onChooseGroup: (data: string[]) => void
  onChooseItems: (data: string[]) => void
  clearChanges?: boolean
  onClearChanges?: (clearChanges: boolean) => void
}

export function ContractEquipmentList({
  equipmentID,
  modelID,
  onChooseGroup,
  onChooseItems,
  clearChanges,
  onClearChanges,
}: IEquipmentList) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const modalRef = React.createRef()
  const [modal, setModal] = useState<boolean>(false)
  const openPopover = Boolean(anchorEl)
  const [{ admin }] = useAuth()
  const [{ equipments }, { getClassifierEquipments }] = useClassifier()
  const [equipmentList, setEquipmentList] = useState<ICheckBoxGroupData[]>([])
  const [openEquipment, setOpenEquipment] = useState(false)
  const [filterList, setFilterList] = useState<string[]>([])
  const [filterText, setFilterText] = useState<string>('')
  const [selectedFilter, setSelectedFilter] =
    useState<string>(filterFirstElement)
  const filteredData = useFilteredData<ICheckBoxGroupData>(
    equipmentList,
    filterText,
    'group'
  )
  const theme = useTheme()

  const openEquipmentList = () => {
    setOpenEquipment(!openEquipment)
    getClassifierEquipments()
  }

  useEffect(() => {
    const listData = equipments.map(({ equipment }) => equipment)
    listData.unshift(filterFirstElement)
    setFilterList(listData)
    const data = equipments.map(({ equipment, id, ClassifierModels }) => {
      return {
        id: id as string,
        group: equipment,
        checkedGroup: equipmentID ? equipmentID.includes(id as string) : false,
        items: ClassifierModels?.map(({ model, id }) => {
          return {
            item: model,
            id: id as string,
            checkedItems: modelID.includes(id as string),
          }
        }) as [],
      }
    })
    setEquipmentList(data)
  }, [equipments, equipmentID])

  const changeFilter = (text: string) => {
    setFilterText(text === filterFirstElement ? '' : text)
    setSelectedFilter(text)
  }

  const AddNewEquipment = () => {
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
        <SwitchToClassifierPage
          ref={modalRef}
          handleModal={handleModal}
          title={
            'Вы действительно перейти на страницу создания классифиактора? Все ваши внесенные изменения не сохранятся! Сохраните их сейчас и продолжите настройку позже!'
          }
        />
      </Modal>
      <ListItemButton
        divider={openEquipment}
        sx={classifierChild2Component}
        onClick={openEquipmentList}>
        <ListItemText
          primary={'Классификатор оборудования'}
          sx={{ ml: 2 }}
          primaryTypographyProps={{ fontSize: '1rem!important' }}
        />
        <RotateButton open={openEquipment} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', p: 2, pl: 5, pr: 5 }}
        in={openEquipment}
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
            <IconButton
              onMouseEnter={(event: MouseEvent<HTMLElement>) =>
                setAnchorEl(event.currentTarget)
              }
              onMouseLeave={() => setAnchorEl(null)}
              onClick={AddNewEquipment}
              size="medium"
              sx={{
                ml: 5,
                width: 40,
                height: 40,
                borderRadius: '20%',
                color: theme.palette.primary.contrastText,
                backgroundColor: theme.palette.primary.main,
                boxShadow: 5,
              }}>
              <AddCircleOutlineIcon />
              <Popover
                sx={{
                  pointerEvents: 'none',
                  background: 'none',
                }}
                open={openPopover}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'right',
                }}
                onClose={(event: MouseEvent<HTMLElement>) =>
                  setAnchorEl(event.currentTarget)
                }
                disableRestoreFocus
                container={anchorEl}>
                <Typography sx={{ p: 1, fontSize: 12, color: 'text.primary' }}>
                  Добавить классификатор
                </Typography>
              </Popover>
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            maxHeight: '33vH',
            overflowX: 'hidden',
            overflowY: 'auto',
            height: 'auto',
          }}>
          <CheckBoxGroups
            data={filteredData}
            onChooseGroup={onChooseGroup}
            onChooseItems={onChooseItems}
            startDataGroups={equipmentID}
            startDataItems={modelID}
            clearChanges={clearChanges}
            onClearChanges={onClearChanges}
          />
        </Box>
      </Collapse>
    </Box>
  )
}
