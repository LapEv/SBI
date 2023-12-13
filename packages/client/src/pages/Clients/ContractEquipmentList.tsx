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
import { useSLA } from 'hooks/sla/useSLA'
import { Item } from 'components/CheckBoxGroup'
import { classifierChild2Component } from 'static/styles'
import { DataList } from 'components/CheckBoxGroup/interface'
import { filterFirstElement } from './Modals/data'
import { SelectMUI } from 'components/Select'
import { useFilteredData } from 'hooks/useFilteredData'
import { useAuth } from 'hooks/auth/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { NewClassifierEquipment } from 'pages/Classifier/Modals'
import { ModalTitles } from 'pages/Classifier/data'
import { useClassifier } from 'hooks/classifier/useClassifier'

interface IEquipmentList {
  equipmentID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}

export function ContractEquipmentList({
  equipmentID,
  onChooseItems,
}: IEquipmentList) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const modalRef = React.createRef()
  const [modal, setModal] = useState<boolean>(false)
  const openPopover = Boolean(anchorEl)
  const [{ admin }] = useAuth()
  const [{ equipments }, { getClassifierEquipments }] = useClassifier()
  const [{ sla, typesSLA }, { getSLA, getTypesSLA }] = useSLA()
  const [equipmentData, setEquipmentData] = useState<DataList[]>([])
  const [openEquipment, setOpenEquipment] = useState(false)
  const [filterList, setFilterList] = useState<string[]>([])
  const [filterText, setFilterText] = useState<string>('')
  const [selectedFilter, setSelectedFilter] =
    useState<string>(filterFirstElement)
  const filteredData = useFilteredData<DataList>(
    equipmentData,
    filterText,
    'comment'
  )
  const theme = useTheme()

  const openEquipmentList = () => {
    setOpenEquipment(!openEquipment)
    getClassifierEquipments()
    getTypesSLA()
  }

  useEffect(() => {
    console.log('equipments = ', equipments)
    const listData = equipments.map(({ equipment, id }) => {
      return {
        name: equipment,
        id: id as string,
        // comment: TypesSLA.typeSLA,
        initChecked: equipmentID?.find(item => item === id) ? true : false,
      }
    })
    setEquipmentData(listData)
  }, [equipments, equipmentID])

  useEffect(() => {
    const listData = typesSLA.map(({ typeSLA }) => typeSLA)
    listData.unshift(filterFirstElement)
    setFilterList(listData)
  }, [typesSLA])

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
        <NewClassifierEquipment
          ref={modalRef}
          handleModal={handleModal}
          title={ModalTitles.newClassifierEquipment}
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
