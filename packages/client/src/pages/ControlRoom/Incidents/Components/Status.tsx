import React, { memo, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownIncidents, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IModal, IStatus } from '../interfaces'
import { ModalTitles, customDropDownCell } from '../data'
import { useMessage } from 'hooks/message/useMessage'
import { Modal } from '@mui/material'
import { ChangeStatus } from '../Modals'
import { DataCloseINC } from '../Modals/interfaces'

export const Status = memo(
  ({ value, id, incident, currentStatus, timeSLA }: IStatus) => {
    const modalClientRef = React.createRef()
    const [modal, setModal] = useState<IModal>({
      status: false,
      data: emptyValue,
    })

    const [{ user }] = useAuth()
    const [_, { setMessage }] = useMessage()
    const [{ incStatuses }, { changeStatus, getIncidentStatuses }] =
      useIncidents()
    const [status, setStatus] = useState<Options>({
      label: value,
      id: '',
    })

    const setData = (data: Options) => {
      const newStatus = incStatuses.findIndex(item => item.id === data.id)
      const oldStatus = incStatuses.findIndex(
        item => item.statusINC === currentStatus
      )
      if (newStatus < 0) {
        setMessage({
          text: `Необходимо выбрать статус!`,
          type: 'warning',
        })
        return
      }
      if (newStatus <= oldStatus) {
        if (newStatus === oldStatus) return
        setMessage({
          text: `Нельзя перевести в статус "${data.label}"!`,
          type: 'warning',
        })
        return
      }
      if (newStatus === 2) {
        setModal({ status: true, data })
        return
      }
      setStatus(data)
      changeStatus({
        id,
        id_incStatus: data.id as string,
        incident,
        status: data.label,
        userID: user.id as string,
        timeSLA,
      })
    }

    const handleModal = ({
      state,
      commentCloseCheck,
      act,
      spaceParts,
      data,
    }: DataCloseINC) => {
      console.log('state = ', state)
      console.log('commentCloseCheck = ', commentCloseCheck)
      console.log('act = ', act)
      console.log('spaceParts = ', spaceParts)
      console.log('data = ', data)
      if (!state) {
        console.log('NO')
        setModal({ status: false, data: emptyValue })
        return
      }
      console.log('YES')
      setStatus(data)
      changeStatus({
        id,
        id_incStatus: data.id as string,
        incident,
        status: data.label,
        userID: user.id as string,
        timeSLA,
        commentCloseCheck,
        act,
        spaceParts,
      })
      setModal({ status: false, data: emptyValue })
    }

    useEffect(() => {
      setStatus({
        label: value,
        id: '',
      })
    }, [value])

    useEffect(() => {
      getIncidentStatuses()
    }, [value])

    return (
      <>
        <Modal
          open={modal.status}
          onClose={setModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <ChangeStatus
            ref={modalClientRef}
            handleModal={handleModal}
            title={ModalTitles.closeINC}
            data={modal.data}
          />
        </Modal>
        <DropDownIncidents
          data={incStatuses.map(({ statusINC, id }) => {
            return {
              ['label']: statusINC,
              ['id']: id as string,
            }
          })}
          props={customDropDownCell}
          textProps={{ fontSize: '0.775rem' }}
          onChange={setData}
          value={status.label}
          label="Выберите статус"
          errorLabel="Не выбран статус!"
          disableClearable={true}
        />
      </>
    )
  }
)
