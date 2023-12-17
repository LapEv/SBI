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
import { Item } from 'components/CheckBoxGroup'
import { classifierChild2Component } from 'static/styles'
import { DataList } from 'components/CheckBoxGroup/interface'
import { TextField } from 'components/TextFields'
import { useFilteredData } from 'hooks/useFilteredData'
import { useAuth } from 'hooks/auth/useAuth'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useObjects } from 'hooks/objects/useObjects'
import { AddObject } from './Modals'
import { SearchIconElement } from 'components/Icons'
import { ModalTitles } from './data'

interface IObjectList {
  objectID: string[]
  onChooseItems: (checked: boolean, id: string) => void
}

export function ContractObjectList({ objectID, onChooseItems }: IObjectList) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const modalRef = React.createRef()
  const [modal, setModal] = useState<boolean>(false)
  const openPopover = Boolean(anchorEl)
  const [{ admin }] = useAuth()
  const [{ objects }, { getObjects }] = useObjects()
  const [objectsData, setObjectsData] = useState<DataList[]>([])
  const [openObject, setOpenObject] = useState(false)
  const [filterText, setFilterText] = useState<string>('')
  const filteredData = useFilteredData<DataList>(
    objectsData,
    filterText,
    'name'
  )
  const theme = useTheme()

  const openObjectList = () => {
    setOpenObject(!openObject)
    getObjects()
  }

  useEffect(() => {
    const listData = objects.map(({ object, id }) => {
      return {
        name: object,
        id: id as string,
        initChecked: objectID?.find(item => item === id) ? true : false,
      }
    })
    setObjectsData(listData)
  }, [objects, objectID])

  const AddNewObject = () => {
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
        <AddObject
          ref={modalRef}
          handleModal={handleModal}
          title={ModalTitles.newObject}
        />
      </Modal>
      <ListItemButton
        divider={openObject}
        sx={classifierChild2Component}
        onClick={openObjectList}>
        <ListItemText
          primary={'Объекты'}
          sx={{ ml: 2 }}
          primaryTypographyProps={{ fontSize: '1rem!important' }}
        />
        <RotateButton open={openObject} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', p: 2, pl: 5, pr: 5 }}
        in={openObject}
        timeout="auto"
        unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TextField
            variant="outlined"
            sx={{ width: '90%', mt: 2, height: 40 }}
            label="Введите фильтр"
            margin="normal"
            value={filterText || ''}
            onChange={e => setFilterText(e.target.value ?? '')}
            InputProps={{
              endAdornment: <SearchIconElement />,
            }}
          />{' '}
          {admin && (
            <IconButton
              onMouseEnter={(event: MouseEvent<HTMLElement>) =>
                setAnchorEl(event.currentTarget)
              }
              onMouseLeave={() => setAnchorEl(null)}
              onClick={AddNewObject}
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
                  Добавить объект
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
