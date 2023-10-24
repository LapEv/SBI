import React from 'react'
import { AddAddress, AddRegion } from './'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = React.forwardRef<unknown, ChooseModalProps>(
  ({ modalImage, handleModal }: ChooseModalProps, ref) => {
    return (
      <>
        {modalImage === 'newAddress' && (
          <AddAddress
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newAddress}
          />
        )}
        {modalImage === 'newRegion' && (
          <AddRegion
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newRegion}
          />
        )}
      </>
    )
  }
)
