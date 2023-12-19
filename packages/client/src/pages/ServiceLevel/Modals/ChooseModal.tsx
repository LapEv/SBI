import React from 'react'
import {
  DeleteSLA,
  DeleteOLA,
  NewSLA,
  NewOLA,
  NewTypesSLA,
  DeleteTypesSLA,
  ChangeTypeSLA,
} from '.'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = React.forwardRef<unknown, ChooseModalProps>(
  ({ modalImage, handleModal }: ChooseModalProps, ref) => {
    return (
      <>
        {modalImage === 'newSLA' && (
          <NewSLA
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newSLA}
          />
        )}
        {modalImage === 'newOLA' && (
          <NewOLA
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newOLA}
          />
        )}
        {modalImage === 'newTypesSLA' && (
          <NewTypesSLA
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newTypesSLA}
          />
        )}
        {modalImage === 'deleteSLA' && (
          <DeleteSLA
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.deleteSLA}
          />
        )}
        {modalImage === 'deleteOLA' && (
          <DeleteOLA
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.deleteOLA}
          />
        )}
        {modalImage === 'deleteTypesSLA' && (
          <DeleteTypesSLA
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.deleteTypesSLA}
          />
        )}
        {modalImage === 'changeTypesSLA' && (
          <ChangeTypeSLA
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.changeTypesSLA}
          />
        )}
      </>
    )
  }
)
