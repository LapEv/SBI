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
import { NewSLA } from 'pages/ServiceLevel/Modals'
import { ModalTitles } from 'pages/ServiceLevel/data'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useIncidents } from 'hooks/incidents/useINC'

interface ISLAList {
  slaID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}

export function ContractSLAList({ slaID, onChooseItems }: ISLAList) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const modalRef = React.createRef()
  const [modal, setModal] = useState<boolean>(false)
  const openPopover = Boolean(anchorEl)
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
  const theme = useTheme()

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
            <IconButton
              onMouseEnter={(event: MouseEvent<HTMLElement>) =>
                setAnchorEl(event.currentTarget)
              }
              onMouseLeave={() => setAnchorEl(null)}
              onClick={AddNewSLA}
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
                  Добавить уровень сервиса
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
