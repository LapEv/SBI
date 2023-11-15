import React, { useEffect, useState, memo, SyntheticEvent } from 'react'
import { Box, ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import {
  ButtonsSectionNoSubmit,
  EditButton,
  RotateButton,
} from 'components/Buttons'
import { useTheme } from '@mui/material/styles'

import {
  ClassifierModels,
  TypicalMalfunctions,
} from 'store/slices/classifier/interfaces'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { classifierChildComponent, flexColumn_FS_SA } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'
import { ModalChangeName } from 'components/ModaQuestions'
import { deepEqual } from 'utils/deepEqual'
import { TypeModels } from './Modals/interfaces'

export const Models = memo(({ model, id_equipment, id }: ClassifierModels) => {
  const [
    { activeModel, typicalMalfunctions, compareData },
    {
      setActiveModel,
      getTypicalMalfunctionsById,
      changeClassifierModel,
      setCompareData,
      changeModelsInTypicalMalfunction,
    },
  ] = useClassifier()
  const theme = useTheme()
  const modalRef = React.createRef()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<DataList[]>([])
  const [modal, setModal] = useState<boolean>(false)
  const [changeActive, setChangeActive] = useState<boolean>(true)
  // const [selectedTypicalMalfunction, setSelectedTypicalMalfunction] = useState<
  //   string[]
  // >([])
  const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
  const [type, setType] = useState<TypicalMalfunctions[]>([])

  const id_model = id
  const handleClick = () => {
    if (!open) {
      getTypicalMalfunctionsById(id_equipment)
      setActiveModel(id as string)
    }
    setOpen(!open)
  }

  useEffect(() => {
    const listData = typicalMalfunctions.map(item => {
      return {
        name: item.typicalMalfunction,
        id: item.id as string,
        initChecked: item.models.includes(id as string),
      }
    })
    setData(listData)
    setCompareData(listData)
    setType(typicalMalfunctions)
  }, [typicalMalfunctions])

  const onChooseItems = (checked: boolean, id: string) => {
    // const newData = data.map(item => {
    //   return {
    //     ...item,
    //     initChecked: item.id === id ? checked : item.initChecked,
    //   }
    // })
    // const isNotCompare =
    //   newData.findIndex(
    //     (item, index) => !deepEqual(item, compareData[index])
    //   ) >= 0 ?? false

    // // setData(newData)
    // setChangeActive(!isNotCompare)

    // const newType = typicalMalfunctions.filter(item => item.id === id)[0]
    console.log('type = ', type)
    // console.log('newType = ', newType)
    console.log('id_model = ', id_model)
    if (!checked) {
      setType(
        type.map(item =>
          item.id !== id
            ? item
            : {
                ...item,
                models: item.models.filter(value => value !== id_model),
              }
        )
      )
      // console.log(
      //   'type end = ',
      //   type.map(item =>
      //     item.id !== id
      //       ? item
      //       : {
      //           ...item,
      //           models: item.models.filter(value => value !== id_model),
      //         }
      //   )
      // )
      // console.log('id_model = ', id_model)
      // const newModels = newType.models.filter(
      //   models => !models.includes(id_model as string)
      // )
      // console.log('newModels = ', newModels)
      // setType(
      //   type.map(item =>
      //     item.id != newType.id ? item : { id, models: newModels }
      //   )
      // )
      // console.log(
      //   'type end = ',
      //   type.map(item =>
      //     item.id != newType.id ? item : { id, models: newModels }
      //   )
      // )
      return
    }
    // newType.models.push(id_model as string)
    // console.log('newType = ', newType)
    setType(type.map(item => (item.id !== id ? item : checkArrayPush(item))))
    // console.log(
    //   'type end = ',
    //   type.map(item => (item.id !== id ? item : checkArrayPush(item)))
    // )
  }

  const checkArrayPush = (item: any) => {
    if (item.models.includes(id_model)) return item
    item.models.push(id_model)
    return item
  }

  useEffect(() => {
    const temp = deepEqual(type, typicalMalfunctions)
    console.log('temp = ', temp)
  }, [type])

  const undoChanges = () => {
    if (changeActive) return
    setData(compareData)
    setChangeActive(true)
  }

  const changeDataModels = () => {
    // if (!selectedTypicalMalfunction.length) {
    //   setErrSelectedItems(true)
    //   return
    // }
    // changeModelsInTypicalMalfunction({
    //   selectedTypicalMalfunction,
    //   id_equipment,
    //   id: id as string,
    // })
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
        sx={{ width: '100%', p: 2, pl: 5, pr: 5, height: 'auto' }}
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
        <Box sx={{ color: theme.palette.error.main, height: 20, ml: 5 }}>
          {errSelectedItems &&
            'Модель не может быть без типовых неисправностей!'}
        </Box>
        <ButtonsSectionNoSubmit
          btnHandle={changeDataModels}
          btnSecondHandle={undoChanges}
          btnName="Сохранить"
          btnDisabled={changeActive}
          btnSecondName="Отменить"
          btnSecondDisabled={false}
        />
      </Collapse>
    </Box>
  )
})
