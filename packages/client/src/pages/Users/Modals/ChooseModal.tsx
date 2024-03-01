import React, { memo } from 'react'
import {
  AddDivision,
  AddUser,
  AddRole,
  DeleteRole,
  AddDepartments,
  AddRolesGroup,
  DeleteRolesGroup,
  DeleteDivision,
  DeleteUser,
  DeleteDepartment,
  ChangeRolesGroup,
} from './'
import { ModalTitles } from '../data'
import { ChooseModalProps } from './interfaces'

export const ChooseModal = memo(
  React.forwardRef<unknown, ChooseModalProps>(
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
          {modalImage === 'addRole' && (
            <AddRole
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.addRole}
            />
          )}

          {modalImage === 'addRolesGroup' && (
            <AddRolesGroup
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.addRolesGroup}
            />
          )}
          {modalImage === 'deleteDivision' && (
            <DeleteDivision
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteDivision}
            />
          )}
          {modalImage === 'deleteDepartments' && (
            <DeleteDepartment
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteDepartment}
            />
          )}
          {modalImage === 'deleteRole' && (
            <DeleteRole
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteRole}
            />
          )}
          {modalImage === 'deleteRolesGroup' && (
            <DeleteRolesGroup
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteRolesGroup}
            />
          )}
          {modalImage === 'deleteUser' && (
            <DeleteUser
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.deleteUser}
            />
          )}
          {modalImage === 'changeRolesGroup' && (
            <ChangeRolesGroup
              ref={ref}
              handleModal={handleModal}
              title={ModalTitles.changeRolesGroup}
            />
          )}
        </>
      )
    }
  )
)
