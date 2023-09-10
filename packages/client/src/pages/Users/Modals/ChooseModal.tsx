import React, { ForwardedRef } from 'react'
import { AddDivision, AddUser } from './'
import { AddDepartments } from './'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = React.forwardRef<unknown, ChooseModalProps>(
  ({ modalImage, handleModal }: ChooseModalProps, ref) => {
    return (
      <>
        {modalImage === 'addDivision' && (
          <AddDivision
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.addDivision}
          />
        )}
        {modalImage === 'addDepartments' && (
          <AddDepartments
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.addDepartments}
          />
        )}
        {modalImage === 'addUser' && (
          <AddUser
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.addUser}
          />
        )}
      </>
    )
  }
)
