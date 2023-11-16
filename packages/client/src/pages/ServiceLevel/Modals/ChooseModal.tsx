import React from 'react'
import { DeleteSLA, DeleteOLA } from './'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = React.forwardRef<unknown, ChooseModalProps>(
  ({ modalImage, handleModal }: ChooseModalProps, ref) => {
    return (
      <>
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
      </>
    )
  }
)
