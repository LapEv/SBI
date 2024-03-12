import React, { ChangeEvent, memo } from 'react'
import { Box, Collapse, ListItemButton, Modal } from '@mui/material'
import { TextField } from 'components/TextFields/'
import { User } from 'storeAuth/interfaces'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import {
  MapProfileInputFields,
  MapProfileInputFieldsAdminWithoutPassword,
} from './data'
import { useAuth } from 'hooks/auth/useAuth'
import { useTheme } from '@mui/material/styles'
import { ProfileValues } from './interfaces'
import { Item } from 'components/CheckBoxGroup'
import { useEffect, useState } from 'react'
import { useRoles } from 'hooks/roles/useRoles'
import { ButtonsSection, RotateButton } from 'components/Buttons'
import { DataList } from 'components/CheckBoxGroup/interface'
import { deepEqual } from 'utils/deepEqual'
import { DeleteUserModal } from './Modals/DeleteUserModal'

export const ProfileData = memo((user: User) => {
  const modalRef = React.createRef()
  const theme = useTheme()
  const [{ admin, userData }, { updateUserData, deleteUser, updateUser }] =
    useAuth()
  const [{ rolesGroup }, { getRolesGroup }] = useRoles()
  const [open, setOpen] = useState(false)
  const [dataGroup, setDataGroup] = useState<DataList[]>([])
  const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
  const [changeActive, setChangeActive] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)

  const fieldsData = admin
    ? MapProfileInputFieldsAdminWithoutPassword
    : MapProfileInputFields

  const { handleSubmit, control } = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      list: fieldsData.map(data => ({
        ...data,
        value: user[data.name as keyof typeof user],
      })),
    },
  })
  const { errors } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  function changeData() {
    updateUser(userData)
  }

  const setNewRolesGroup = (checked: boolean, id: string) => {
    if (!checked) {
      setErrSelectedItems(true)
      setChangeActive(true)
      return
    }
    const data = rolesGroup.map(item => {
      return {
        name: item.groupName,
        id: item.id,
        initChecked: item.id === id ?? false,
      }
    })
    setDataGroup(data)
    setErrSelectedItems(false)
    setChangeActive(false)

    const groupData = rolesGroup.find(item => item.id === id)?.group
    updateUserData({
      ...userData,
      ...{ rolesGroup: groupData },
    })
  }

  const handleClick = () => {
    setOpen(!open)
    getRolesGroup()
  }

  const deleteUserFunc = (answer: boolean, reasonOfDelete: string) => {
    setModal(false)
    if (!answer) return
    deleteUser(userData.id as string, reasonOfDelete)
  }

  useEffect(() => {
    setChangeActive(deepEqual(userData as {}, user as {}))
  }, [userData])

  useEffect(() => {
    const data = rolesGroup.map(item => {
      return {
        name: item.groupName,
        id: item.id,
        initChecked: userData.rolesGroup === item.group ?? false,
      }
    })
    setDataGroup(data)
  }, [rolesGroup])

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(changeData)}
      sx={{ '& .MuiTextField-root': { m: 0.5, width: '55ch' } }}>
      {fields.map(({ id, name, label, validation, type }, index) => {
        return (
          <Controller
            key={id}
            control={control}
            name={`list.${index}.value`}
            rules={validation}
            render={({ field }) => (
              <TextField
                {...field}
                inputRef={field.ref}
                label={label}
                type={type}
                required
                disabled={!admin}
                variant="outlined"
                sx={{ width: '88%', m: 2, mt: 2.5, height: 60 }}
                margin="normal"
                onChange={(event: ChangeEvent<HTMLInputElement>) => (
                  field.onChange(event),
                  updateUserData({
                    ...userData,
                    ...{ [name]: event.target.value },
                  })
                )}
                error={!!(errors?.list ?? [])[index]?.value?.message}
                helperText={(errors?.list ?? [])[index]?.value?.message}
              />
            )}
          />
        )
      })}
      {admin && (
        <Box>
          <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <DeleteUserModal
              answerFromModal={deleteUserFunc}
              handleModal={setModal}
              ref={modalRef}
              title="Вы действительно хотите удалить пользователя?"
            />
          </Modal>
          <ListItemButton
            sx={{ fontSize: 12, color: theme.palette.text.secondary }}
            onClick={handleClick}>
            <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
            Дополнительно
          </ListItemButton>
          <Collapse
            sx={{ width: '90%', ml: 5, height: 'auto' }}
            in={open}
            timeout="auto"
            unmountOnExit>
            {open &&
              dataGroup.map(({ name, id, initChecked }) => (
                <Item
                  name={name}
                  id={`${id}`}
                  groupChecked={null}
                  onChooseItems={setNewRolesGroup}
                  initChecked={initChecked}
                  key={`${id}`}
                />
              ))}
          </Collapse>
          <Box sx={{ color: theme.palette.error.main, height: 20, ml: 5 }}>
            {errSelectedItems && 'Пользователь не может быть без роли!'}
          </Box>
          <ButtonsSection
            btnSecondHandle={() => setModal(true)}
            btnName="Сохранить"
            btnDisabled={changeActive}
            btnSecondName="Удалить"
            btnSecondDisabled={false}
          />
        </Box>
      )}
    </Box>
  )
})
