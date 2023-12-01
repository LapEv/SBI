import React, { useEffect, useState, memo, SyntheticEvent } from 'react'
import {
  Box,
  ListItemText,
  ListItemButton,
  Modal,
  IconButton,
} from '@mui/material'
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
import { Contracts } from 'store/slices/contracts/interfaces'
import { useContracts } from 'hooks/contracts/useContracts'
import { ChooseModal } from 'pages/Users/Modals'
import { useAuth } from 'hooks/auth/useAuth'

export const ContractsList = memo(
  ({
    contract,
    id,
    number,
    date,
    sla,
    equipment,
    objects,
    id_client,
  }: Contracts) => {
    const [{ activeContract }, { setActiveContract }] = useContracts()
    const [{ contracts }, { newContractName }] = useContracts()
    const theme = useTheme()
    const modalRef = React.createRef()
    const [open, setOpen] = useState(false)
    const [data, setData] = useState<Contracts[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [changeActive, setChangeActive] = useState<boolean>(true)
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [resetData, setResetData] = useState<boolean>(false)
    const [type, setType] = useState<TypicalMalfunctions[]>([])
    // const [newTypicalMalfunction, setNewTypicalMalfunction] = useState<
    //   ShortTypicalMalfunctions[]
    // >(EmptyTypicalMalfunctions)
    const id_model = id

    const handleClick = () => {
      if (!open) {
        setData(contracts.filter(item => item.id))
        setActiveContract(id as string)
      }
      setOpen(!open)
    }

    const onChooseItems = (checked: boolean, id: string) => {
      // if (!checked) {
      //   setType(
      //     type.map(item =>
      //       item.id !== id
      //         ? item
      //         : {
      //             ...item,
      //             models: item.models.filter(value => value !== id_model),
      //           }
      //     )
      //   )
      //   setSelectedTypes(selectedTypes.filter(value => value !== id))
      //   return
      // }
      // setType(type.map(item => (item.id !== id ? item : checkArrayPush(item))))
      // setSelectedTypes([...selectedTypes, id])
    }

    const checkArrayPush = (item: any) => {
      const newItemModels = [...item.models]
      if (newItemModels.includes(id_model)) return item
      newItemModels.push(id_model)
      return { ...item, models: newItemModels }
    }

    // useEffect(() => {
    //   const isEqualArr = сheckArrObjects(
    //     type,
    //     typicalMalfunctions
    //   ) as ShortTypicalMalfunctions[]
    //   setChangeActive(isEqualArr.length ? false : true)
    //   setNewTypicalMalfunction(isEqualArr)
    //   if (!selectedTypes.length) {
    //     setErrSelectedItems(true)
    //     return
    //   }
    //   setErrSelectedItems(false)
    // }, [type])

    const undoChanges = () => {
      // if (changeActive) return
      // setData([{ name: '', id: '', initChecked: false }])
      // setChangeActive(true)
      // setErrSelectedItems(false)
      // setResetData(true)
    }

    // useEffect(() => {
    //   setDataList()
    //   setResetData(false)
    // }, [resetData])

    const changeDataModels = () => {
      // if (errSelectedItems) return
      // console.log('newTypicalMalfunction = ', newTypicalMalfunction)
      // console.log('id_equipment = ', id_equipment)
      // changeModelsInTypicalMalfunction({ id_equipment, newTypicalMalfunction })
    }

    const editContract = (event: SyntheticEvent<EventTarget>) => {
      event.stopPropagation()
      setModal(true)
    }

    const changeContractName = (answer: boolean, text: string) => {
      setModal(false)
      if (!answer) return
      newContractName({
        contract: text,
        id: id as string,
      })
    }

    useEffect(() => {
      if (activeContract !== id) {
        setOpen(false)
      }
    }, [activeContract])

    return (
      <Box sx={flexColumn_FS_SA}>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <ModalChangeName
            answer={changeContractName}
            handleModal={setModal}
            ref={modalRef}
            question="Введите новое наименование контракта"
          />
        </Modal>
        <ListItemButton
          divider={open}
          sx={classifierChildComponent}
          onClick={handleClick}>
          <ListItemText
            primary={contract}
            sx={{ ml: 2 }}
            primaryTypographyProps={{ fontSize: '1.175rem!important' }}
          />
          <EditButton handleClick={editContract} size={'1.5rem'} />
          <RotateButton open={open} size={'2rem'} />
        </ListItemButton>
        <Collapse
          sx={{ width: '100%', p: 2, pl: 5, pr: 5, height: 'auto' }}
          in={open}
          timeout="auto"
          unmountOnExit>
          {/* {data.map(
            ({ contract, id, initChecked }) => (
              console.log('name = ', name),
              (
                <Item
                  name={name}
                  id={`${id}`}
                  groupChecked={null}
                  onChooseItems={onChooseItems}
                  initChecked={initChecked}
                  key={id as string}
                />
              )
            )
          )} */}
          <Box sx={{ color: theme.palette.error.main, height: 20, ml: 5 }}>
            {errSelectedItems && 'Контракт не может быть без !'}
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
  }
)
