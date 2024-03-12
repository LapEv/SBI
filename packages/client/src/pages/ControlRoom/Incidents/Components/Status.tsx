import React, { memo, useEffect, useState } from 'react'
import { useAuth } from 'hooks/auth/useAuth'
import { DropDownIncidents, emptyValue } from 'components/DropDown'
import { Options } from 'components/DropDown/interface'
import { useIncidents } from 'hooks/incidents/useINC'
import { IModal, IStatus, IStatusTemp } from './interfaces'
import { ModalTitles, customDropDownCell, emptyStatusTemp } from '../data'
import { useMessage } from 'hooks/message/useMessage'
import { Modal } from '@mui/material'
import { ChangeStatus } from '../Modals'
import { DataCloseINC } from '../Modals/interfaces'
import { useFiles } from 'hooks/files/useFiles'
import { FilterOptions } from '../Utils/FilterOptions'

export const Status = memo(
  ({ value, id, incident, currentStatus, timeSLA }: IStatus) => {
    const [{}, { setMessage }] = useMessage()
    const modalClientRef = React.createRef()
    const [modal, setModal] = useState<IModal>({
      status: false,
      data: emptyValue,
    })

    const [{ user }] = useAuth()
    const [{ uploadedFiles }, { uploadFiles, resetUploadFiles }] = useFiles()
    const [{ incStatuses }, { changeStatus }] = useIncidents()

    const [status, setStatus] = useState<Options>({
      label: value,
      id: '',
    })
    const [tempData, setTempData] = useState<IStatusTemp>(emptyStatusTemp)

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
        setStatus({ id: '', label: currentStatus })
        return
      }
      if (newStatus <= oldStatus) {
        setStatus({ id: '', label: currentStatus })
        if (newStatus === oldStatus) return
        setMessage({
          text: `Нельзя перевести в статус "${data.label}"!`,
          type: 'warning',
        })
        return
      }
      if (newStatus - oldStatus > 1) {
        setMessage({
          text: `Нельзя перескакивать по статусам!`,
          type: 'warning',
        })
        setStatus({ id: '', label: currentStatus })
        return
      }

      if (newStatus === 2) {
        setModal({ status: true, data })
        return
      }
      setStatus(data)
      const { nameSort, direction, limit, page, filterOptions } =
        FilterOptions()
      changeStatus({
        id,
        id_incStatus: data.id as string,
        incident,
        status: data.label,
        userID: user.id as string,
        timeSLA,
        nameSort,
        direction,
        limit,
        page,
        filterOptions,
      })
    }

    const handleModal = ({
      state,
      typeCompletedWork,
      commentCloseCheck,
      files,
      spaceParts,
      data,
    }: DataCloseINC) => {
      if (!state) {
        setModal({ status: false, data: emptyValue })
        return
      }
      if (files) {
        setTempData({
          data,
          id,
          id_incStatus: data.id as string,
          incident,
          status: data.label,
          userID: user.id as string,
          timeSLA,
          typeCompletedWork: typeCompletedWork as Options,
          commentCloseCheck: commentCloseCheck as string,
          spaceParts: spaceParts as string[],
        })
        uploadFiles({
          id_incFiles: id,
          type: 'IncidentActs',
          files: files as FileList,
          incident,
        })
        return
      }
      setStatus(data)
      const { nameSort, direction, limit, page, filterOptions } =
        FilterOptions()
      changeStatus({
        id,
        id_incStatus: data.id as string,
        incident,
        status: data.label,
        userID: user.id as string,
        timeSLA,
        typeCompletedWork,
        commentCloseCheck,
        spaceParts,
        nameSort,
        direction,
        limit,
        page,
        filterOptions,
      })
      setModal({ status: false, data: emptyValue })
    }

    useEffect(() => {
      if (uploadedFiles && uploadedFiles.length > 0 && id === tempData.id) {
        const {
          data,
          id,
          id_incStatus,
          incident,
          status,
          userID,
          timeSLA,
          typeCompletedWork,
          commentCloseCheck,
          spaceParts,
        } = tempData
        const { nameSort, direction, limit, page, filterOptions } =
          FilterOptions()
        setStatus(data)
        changeStatus({
          id,
          id_incStatus,
          incident,
          status,
          userID,
          timeSLA,
          typeCompletedWork,
          commentCloseCheck,
          spaceParts,
          nameSort,
          direction,
          limit,
          page,
          filterOptions,
        })
        setModal({ status: false, data: emptyValue })
        resetUploadFiles()
      }
    }, [uploadedFiles])

    useEffect(() => {
      setStatus({ label: value, id: '' })
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
