import { ChangeEvent } from 'react'
import { Box, Collapse, ListItemButton } from '@mui/material'
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
import { CheckBoxGroup, Item } from 'components/CheckBoxGroup'
import { useEffect, useState } from 'react'
import { useRoles } from 'hooks/roles/useRoles'
import { ButtonsSection, RotateButton } from 'components/Buttons'
import {
  DataList,
  ICheckBoxGroupData,
} from 'components/CheckBoxGroup/interface'
import { deepEqual } from 'utils/deepEqual'

export const ProfileData = (user: User) => {
  const theme = useTheme()
  const [{ admin, userData }, { updateUserData, deleteUser, updateUser }] =
    useAuth()
  const [{ rolesGroup }, { getRolesGroup }] = useRoles()
  const [open, setOpen] = useState(false)
  const [dataGroup, setDataGroup] = useState<DataList[]>([])
  const [selectedGroup, setGroup] = useState<string>(user.rolesGroup as string)
  const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
  const [changeActive, setChangeActive] = useState<boolean>(false)

  const fieldsData = admin
    ? MapProfileInputFieldsAdminWithoutPassword
    : MapProfileInputFields

  const { handleSubmit, control } = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      list: fieldsData.map(data => ({
        ...data,
        value: user![data.name as keyof typeof user],
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

  const setRolesGroup = (group: string) => {
    if (!group) return
    const groupData = rolesGroup.find(item => item.id === group)!
    setGroup(group)
    updateUserData({
      ...userData!,
      ...{ roleGroup: groupData.group },
    })
    if (group && errSelectedItems) setErrSelectedItems(false)
  }

  const setRoles = (checked: boolean, id: string) => {
    if (!checked) {
      setErrSelectedItems(true)
      return
    }
    setErrSelectedItems(true)
  }

  const handleClick = () => {
    setOpen(!open)
    getRolesGroup()
  }

  const deleteUserFunc = () => {
    deleteUser([userData.id as string])
  }

  useEffect(() => {
    setChangeActive(deepEqual(userData, user))
  }, [userData])

  useEffect(() => {
    const data = rolesGroup.map(item => {
      return {
        name: item.groupName,
        id: item.id,
        initChecked: userData.rolesGroup?.includes(item.id),
      }
      // return {
      //   id: item.id,
      //   group: item.group,
      //   groupName: item.groupName,
      //   items: item.roles.map((value, index) => {
      //     return {
      //       name: value,
      //       nameId: `${value}${index}`,
      //       id: `${index}`,
      //     }
      //   }),
      // }
    })
    setDataGroup(data)
    setRolesGroup(
      rolesGroup.find(item => item.group === userData.rolesGroup)?.id as string
    )
  }, [rolesGroup])

  console.log('dataGroup = ', dataGroup)
  console.log('rolesGroup = ', rolesGroup)

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(changeData)}
      sx={{ '& .MuiTextField-root': { m: 0.5, width: '55ch' } }}>
      {fields.map(({ id, name, label, validation, type, value }, index) => {
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
                    ...userData!,
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
          <ListItemButton
            sx={{ fontSize: 12, color: theme.palette.text.secondary }}
            onClick={handleClick}>
            <RotateButton open={open} handleClick={handleClick} size={'2rem'} />
            Дополнительно
          </ListItemButton>
          <Collapse
            sx={{ width: '90%', ml: 5 }}
            in={open}
            timeout="auto"
            unmountOnExit>
            {open &&
              dataGroup.map((item, index) => (
                // <CheckBoxGroup
                //   data={item}
                //   key={`${item}${index}`}
                //   onChooseGroup={setRolesGroup}
                //   onChooseItems={setRoles}
                //   oneGroup={true}
                //   selectedGroup={selectedGroup}
                // />
                <Item
                  name={item.name}
                  id={`${item.id}`}
                  groupChecked={null}
                  onChooseItems={setRoles}
                  initChecked={item.initChecked}
                  key={`${item.id}`}
                />
              ))}
          </Collapse>
          <Box sx={{ color: theme.palette.error.main, height: 20 }}>
            {errSelectedItems &&
              'Здесь роли изменить нельзя! Создайте новую группу ролей с необходимыми ролями!'}
          </Box>
          <ButtonsSection
            btnSecondHandle={deleteUserFunc}
            btnName="Сохранить"
            btnDisabled={changeActive}
            btnSecondName="Удалить"
          />
        </Box>
      )}
    </Box>
  )
}
