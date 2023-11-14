import React, { useEffect, useState, memo, SyntheticEvent } from 'react'
import { Box, ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { EditButton, RotateButton } from 'components/Buttons'
import { ClassifierModels } from 'store/slices/classifier/interfaces'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { classifierChildComponent, flexColumn_FS_SA } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'
import { ModalChangeName } from 'components/ModaQuestions'

export const Models = memo(({ model, id_equipment, id }: ClassifierModels) => {
  const [
    { activeModel, typicalMalfunctions },
    { setActiveModel, getTypicalMalfunctionsById, changeClassifierModel },
  ] = useClassifier()
  const modalRef = React.createRef()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<DataList[]>([])
  const [modal, setModal] = useState<boolean>(false)

  const handleClick = () => {
    if (!open) {
      getTypicalMalfunctionsById(id_equipment)
      setActiveModel(id as string)
    }
    setOpen(!open)
  }

  useEffect(() => {
    setData(
      typicalMalfunctions.map(item => {
        return {
          name: item.typicalMalfunction,
          id: item.id as string,
          initChecked: item.models.includes(id as string),
        }
      })
    )
  }, [typicalMalfunctions])

  const onChooseItems = (checked: boolean, id: string) => {
    // if (!checked) {
    //   setSelectedRoles(selectedRoles.filter(value => value !== id))
    //   return
    // }
    // setSelectedRoles([...selectedRoles, id])
    // if ([...selectedRoles, id] && errSelectedItems) setErrSelectedItems(false)
  }

  const editModel = (event: SyntheticEvent<EventTarget>) => {
    event.stopPropagation()
    setModal(true)
  }

  const changeModel = (answer: boolean, text: string) => {
    setModal(false)
    if (!answer) return
    changeClassifierModel({
      model: text,
      id: id as string,
      id_equipment,
    })
  }

  useEffect(() => {
    if (activeModel !== id) {
      setOpen(false)
    }
  }, [activeModel])

  return (
    <Box sx={flexColumn_FS_SA}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalChangeName
          answer={changeModel}
          handleModal={setModal}
          ref={modalRef}
          question="Введите новое наименование модели"
        />
      </Modal>
      <ListItemButton
        divider={open}
        sx={classifierChildComponent}
        onClick={handleClick}>
        <ListItemText
          primary={model}
          sx={{ ml: 2 }}
          primaryTypographyProps={{ fontSize: '1.175rem!important' }}
        />
        <EditButton handleClick={editModel} size={'1.5rem'} />
        <RotateButton open={open} size={'2rem'} />
      </ListItemButton>
      <Collapse
        sx={{ width: '100%', p: 2, pl: 5, pr: 5 }}
        in={open}
        timeout="auto"
        unmountOnExit>
        {data.map(({ name, id, initChecked }) => (
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
    </Box>
  )
})
