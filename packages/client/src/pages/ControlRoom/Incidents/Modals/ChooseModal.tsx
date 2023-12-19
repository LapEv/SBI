import React from 'react'
import {
  ChangeIncidentStatuses,
  DeleteIncidentStatus,
  NewIncident,
  NewIncidentStatus,
  NewRequest,
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
        {modalImage === 'deleteIncidentStatuses' && (
          <DeleteIncidentStatus
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.deleteIncidentStatuses}
          />
        )}
        {modalImage === 'changeIncidentStatuses' && (
          <ChangeIncidentStatuses
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.changeIncidentStatuses}
          />
        )}
      </>
    )
  }
)
