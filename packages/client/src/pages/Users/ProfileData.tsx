import { Box, Collapse, TextField, ListItemButton } from '@mui/material'
import { User } from 'storeAuth/interfaces'
import {
  useForm,
  useFieldArray,
  Controller,
  useFormState,
} from 'react-hook-form'
import { MapProfileInputFields, MapProfileInputFieldsAdmin } from './data'
import { useAuth } from 'hooks/auth/useAuth'
import { useTheme } from '@mui/material/styles'
import { ProfileValues } from './interfaces'
import { CheckBoxGroup } from 'components/CheckBoxGroup/CheckBoxGroup'
import { RolesGroup } from 'storeRoles/interfaces'
import { useEffect, useState } from 'react'
import { useRoles } from 'hooks/roles/useRoles'
import { RotateButton } from 'components/Buttons/RotateButton'
import { ICheckBoxGroupData } from 'components/CheckBoxGroup/interface'

export const ProfileData = (userData: User) => {
  const theme = useTheme()
  const [{ admin }, { updateUserData }] = useAuth()
  const [{ roles, rolesGroup, activeRolesGroup }, { getRoles, getRolesGroup }] =
    useRoles()
  const [open, setOpen] = useState(false)
  const [dataGroup, setDataGroup] = useState<ICheckBoxGroupData[]>([])

  const [selectedGroup, setGroup] = useState<string>(userData.roleGroup!)
  const [selectedItems, setItems] = useState<string[]>([])
  const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)

  const fieldsData = admin ? MapProfileInputFieldsAdmin : MapProfileInputFields

  const { reset, handleSubmit, control } = useForm<ProfileValues>({
    mode: 'onBlur',
    defaultValues: {
      list: fieldsData.map(data => ({
        ...data,
        value: userData![data.name as keyof typeof userData],
      })),
    },
  })
  const { errors, isValid } = useFormState({ control })
  const { fields } = useFieldArray({
    control,
    name: 'list',
  })

  function changeData(data: ProfileValues) {
    console.log('data = ', data)
  }

  const setRolesGroup = (group: string) => {
    if (!group) return
    const groupData = rolesGroup.find(item => item.id === group)!
    const listRoles = groupData.roles.map(item => item.role)
    setItems(listRoles)
    setGroup(group)
    if (group && errSelectedItems) setErrSelectedItems(false)
  }

  const setRoles = (checked: boolean, id: string) => {
    if (!checked) {
      setItems(selectedItems.filter(value => value !== id))
      return
    }
    setItems([...selectedItems, id as string])
    if ([...selectedItems, id as string] && errSelectedItems)
      setErrSelectedItems(false)
  }

  console.log('selectedGroup = ', selectedGroup)
  // console.log('selectedGroup = ', selectedGroup)
  // console.log('rolesGroup = ', rolesGroup)

  const handleClick = () => {
    setOpen(!open)
    getRolesGroup()
    getRoles()
  }

  useEffect(() => {
    const data = rolesGroup.map(item => {
      return {
        id: item.id,
        group: item.group,
        groupName: item.groupName,
        items: item.roles.map(value => {
          return {
            name: value.nameRole,
            nameId: value.role,
            id: value.id,
          }
        }),
      }
    })
    setDataGroup(data)
  }, [rolesGroup])

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
                // onChange={(event: ChangeEvent<HTMLInputElement>) => (
                //   field.onChange(event),
                //   updateUserData({
                //     ...userData!,
                //     ...{ [name]: event.target.value },
                //   })
                // )}
                error={!!(errors?.list ?? [])[index]?.value?.message}
                helperText={(errors?.list ?? [])[index]?.value?.message}
                inputProps={{
                  style: { height: 5, borderRadius: 5, padding: '16px 14px' },
                }}
                InputLabelProps={{
                  style: {
                    top: -7,
                    marginTop: 0,
                    color: value
                      ? theme.palette.mode === 'dark'
                        ? '#C1EEE1'
                        : '#1E515D'
                      : theme.palette.mode === 'dark'
                      ? '#1E515D'
                      : '#C1EEE1',
                  },
                }}
                FormHelperTextProps={{
                  style: { height: 0, marginTop: -1, zIndex: 999 },
                }}
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
            sx={{ width: '100%', ml: 5 }}
            in={open}
            timeout="auto"
            unmountOnExit>
            {open &&
              dataGroup.map((item, index) => (
                <CheckBoxGroup
                  data={item}
                  key={`${item}${index}`}
                  onChooseGroup={setRolesGroup}
                  onChooseItems={setRoles}
                  oneGroup={true}
                  selectedGroup={selectedGroup}
                />
              ))}
          </Collapse>
        </Box>
      )}
    </Box>
  )
}
