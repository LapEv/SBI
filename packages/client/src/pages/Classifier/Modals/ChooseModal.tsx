import React from 'react'
import {
  NewClassifierEquipment,
  NewClassifierModel,
  NewTypicalMalfunction,
} from './'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = React.forwardRef<unknown, ChooseModalProps>(
  ({ modalImage, handleModal }: ChooseModalProps, ref) => {
    return (
      <>
        {modalImage === 'newClassifierEquipment' && (
          <NewClassifierEquipment
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newClassifierEquipment}
          />
        )}
        {modalImage === 'newClassifierModel' && (
          <NewClassifierModel
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newClassifierModel}
          />
        )}
        {modalImage === 'newTypicalMalfunction' && (
          <NewTypicalMalfunction
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.newTypicalMalfunction}
          />
        )}
      </>
    )
  }
)
