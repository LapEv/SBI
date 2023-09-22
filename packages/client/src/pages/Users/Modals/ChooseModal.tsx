import React from 'react'
import { AddDivision, AddUser, AddRole, DeleteRole } from './'
import { AddDepartments } from './'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = React.forwardRef<unknown, ChooseModalProps>(
  ({ modalImage, handleModal }: ChooseModalProps, ref) => {
    console.log('modalImage = ', modalImage)
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
        {modalImage === 'addRole' && (
          <AddRole
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.addRole}
          />
        )}

        {/* {modalImage === 'addRolesGroup' && (
          <AddRolesGroup
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.addRolesGroup}
          />
        )} */}
        {modalImage === 'deleteRole' && (
          <DeleteRole
            ref={ref}
            handleModal={handleModal}
            title={ModalTitles.delRole}
          />
        )}
      </>
    )
  }
)
