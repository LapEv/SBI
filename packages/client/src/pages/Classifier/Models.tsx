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
  ChangeModelsInTypicalMalfunction,
  ClassifierModels,
  ShortTypicalMalfunctions,
  TypicalMalfunctions,
} from 'store/slices/classifier/interfaces'
import { useClassifier } from 'hooks/classifier/useClassifier'
import { classifierChildComponent, flexColumn_FS_SA } from 'static/styles'
import { Item } from 'components/CheckBoxGroup'
import { DataList } from 'components/CheckBoxGroup/interface'
import { ModalChangeName } from 'components/ModaQuestions'
import { сheckArrObjects } from 'utils/сheckArrObjects'
import { EmptyTypicalMalfunctions } from './data'

export const Models = memo(
  ({
    model,
    id_equipment,
    id,
    typicalModels,
    TypicalMalfunctions,
  }: ClassifierModels) => {
    const [{ activeModel }, { setActiveModel, changeClassifierModel }] =
      useClassifier()
    const theme = useTheme()
    const modalRef = React.createRef()
    const [open, setOpen] = useState(false)
    const [data, setData] = useState<DataList[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [changeActive, setChangeActive] = useState<boolean>(true)
    const [selectedModels, setSelectedModels] = useState
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    // const [resetData, setResetData] = useState<boolean>(false)

    const handleClick = () => {
      if (!open) {
        setActiveModel(id as string)
      }
      setOpen(!open)
    }

    const undoChanges = () => {
      if (changeActive) return
      setData([{ name: '', id: '', initChecked: false }])
      setChangeActive(true)
      setErrSelectedItems(false)
      // setResetData(true)
    }

    // useEffect(() => {
    //   // setDataList()
    //   setResetData(false)
    // }, [resetData])

    const onChooseModels = (checked: boolean, id: string) => {
      // if (checked) {
      //   const newSLAs = [...slaID]
      //   newSLAs.push(id)
      //   setSLADisabled(isEqualArr(newSLAs, SLAs?.map(({ id }) => id) as string[]))
      //   setSLAID(newSLAs)
      //   return
      // }
      // const newSLAs = slaID.filter(item => item !== id)
      // setSLADisabled(isEqualArr(newSLAs, SLAs?.map(({ id }) => id) as string[]))
      // setSLAID(newSLAs)
    }

    useEffect(() => {
      const listData = TypicalMalfunctions?.map(item => {
        return {
          name: item.typicalMalfunction,
          id: item.id as string,
          initChecked: typicalModels?.find(value => item.id === value.id)
            ? true
            : false,
        }
      }) as DataList[]
      console.log('listData = ', listData)
      setData(listData)
    }, [])

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
            btnHandle={onChooseModels}
            btnSecondHandle={undoChanges}
            btnName="Сохранить"
            btnDisabled={changeActive}
            btnSecondName="Отменить"
            btnSecondDisabled={false}
          />
        </Collapse>
      </Box>
    )
  }
)
