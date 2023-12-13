import React, { useEffect, useState, memo, SyntheticEvent } from 'react'
import { Box, ListItemText, ListItemButton, Modal } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { EditButton, RotateButton } from 'components/Buttons'
import { classifierChildComponent, flexColumn_FS_SA } from 'static/styles'
import { ModalChangeName } from 'components/ModaQuestions'
import { Contracts } from 'store/slices/contracts/interfaces'
import { useContracts } from 'hooks/contracts/useContracts'
import { ContractPage } from './'
import { useAuth } from 'hooks/auth/useAuth'

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
    const [{ admin }] = useAuth()
    const [{ activeContract }, { setActiveContract }] = useContracts()
    const [_, { newContractName }] = useContracts()
    const modalRef = React.createRef()
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState<boolean>(false)

    const handleClick = () => {
      if (!open) {
        setActiveContract(id as string)
      }
      setOpen(!open)
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
          {admin && <EditButton handleClick={editContract} size={'1.5rem'} />}
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
