import React from 'react'
import {
  ChangeIncidentStatuses,
  ChangeTypeOfWork,
  DeleteIncidentStatus,
  DeleteTypesOfWork,
  NewIncident,
  NewIncidentStatus,
  NewRequest,
  NewTypesOfWork,
} from '.'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = React.forwardRef<unknown, ChooseModalProps>(
  ({ modalImage, handleModal }: ChooseModalProps, ref) => {
    return (
      <>
        {modalImage === 'newIncident' && (
          <NewIncident
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newIncident}
          />
        )}
        {modalImage === 'newRequest' && (
          <NewRequest
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newRequest}
          />
        )}
        {modalImage === 'newIncidentStatus' && (
          <NewIncidentStatus
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newIncidentStatus}
          />
        )}
        {modalImage === 'newTypesOfWork' && (
          <NewTypesOfWork
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newTypesOfWork}
          />
        )}
        {modalImage === 'deleteIncidentStatuses' && (
          <DeleteIncidentStatus
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.deleteIncidentStatuses}
          />
        )}
        {modalImage === 'deleteTypesOfWork' && (
          <DeleteTypesOfWork
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.deleteTypesOfWork}
          />
        )}
        {modalImage === 'changeIncidentStatuses' && (
          <ChangeIncidentStatuses
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.changeIncidentStatuses}
          />
        )}
        {modalImage === 'changeTypesOfWork' && (
          <ChangeTypeOfWork
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.changeTypesOfWork}
          />
        )}
      </>
    )
  }
)
