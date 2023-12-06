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
  ButtonsModalSection,
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
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { AddValuesProps } from './Modals/interfaces'
import { MapContractInputFields } from './data'
import { TextField } from 'components/TextFields'
import { ContractPage } from './'

export const ContractsList = memo(
  ({
    contract,
    id,
    number,
    date,
    SLAs,
    ClassifierEquipment,
    Objects,
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

    const handleClick = () => {
      if (!open) {
        setData(contracts.filter(item => item.id))
        setActiveContract(id as string)
      }
      setOpen(!open)
    }

    const changeData = () => {
      console.log('changeData')
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
          <ContractPage
            contract={contract}
            id={id}
            number={number}
            date={date}
            SLAs={SLAs}
            ClassifierEquipment={ClassifierEquipment}
            Objects={Objects}
            id_client={id_client}
          />
        </Collapse>
      </Box>
    )
  }
)
