import React, { useState, useEffect } from 'react'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from '@mui/material'
import {
  useForm,
  useFieldArray,
  useFormState,
  Controller,
} from 'react-hook-form'
import { TextField } from 'components/TextFields/TextFields'
import { ChooseModalProps, AddValuesProps, Data } from './interfaces'
import { MapProfileInputFieldsAdmin, style, styleTextFieldProps } from '../data'
import { ButtonSection } from './ButtonsSection'
import { useStructure } from 'hooks/structure/useStructure'
import { DropDown } from '../../../components/DropDown/DropDown'
import { useRoles } from 'hooks/roles/useRoles'
import { CheckBoxGroup } from 'components/CheckBoxGroup/CheckBoxGroup'
import { Nullable } from 'utils/nullableType'
import { useAuth } from 'hooks/auth/useAuth'
type NullableString = Nullable<string>

export const AddUser = React.forwardRef<unknown, ChooseModalProps>(
  ({ handleModal, title }: ChooseModalProps, ref) => {
    const [{ userStatus }, { getUserStatus, signup }] = useAuth()
    const [{ divisions, departaments }] = useStructure()
    const [{ roles, rolesGroup }, { getRoles, getRolesGroup }] = useRoles()
    const [division, setDivision] = useState<string>('')
    const [listDepartments, setDepartments] = useState<Data[]>([])
    const [department, setDepartment] = useState<string>('')
    const [selectedGroup, setGroup] = useState<NullableString[]>([])
    const [selectedItems, setItems] = useState<NullableString[]>([])
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [chiefDivision, setCheckedCheifDivision] = useState<boolean>(false)
    const [chiefDepartment, setCheckedCheifDepartment] =
      useState<boolean>(false)
    const [statusName, setStatusName] = useState<string>('')

    const theme = useTheme()
    const { handleSubmit, control } = useForm<AddValuesProps>({
      mode: 'onBlur',
      defaultValues: {
        list: MapProfileInputFieldsAdmin,
      },
    })

    const { errors } = useFormState({ control })
    const { fields } = useFieldArray({
      control,
      name: 'list',
    })

    function changeData({ list }: AddValuesProps) {
      if (!selectedGroup.length || !selectedItems.length) {
        setErrSelectedItems(true)
        return
      }
      const id_division = divisions.find(
        item => item.divisionName === division
      )?.id
      const id_department = departaments.find(
        item => item.departmentName === department
      )?.id
      const status = userStatus.find(
        item => item.categoryName === statusName
      )?.category
      const newUser = {
        username: list[3].value,
        firstName: list[1].value,
        lastName: list[0].value,
        middleName: list[2].value,
        email: list[5].value,
        phone: list[6].value,
        password: list[7].value,
        post: list[4].value,
        roleGroup: selectedGroup[0],
        roles: selectedItems,
        division,
        chiefDivision,
        id_division,
        department,
        chiefDepartment,
        id_department,
        status,
      }
      signup(newUser)
      handleModal(false)
    }

    const setRolesGroup = (group: string) => {
      const groupData = rolesGroup.find(item => item.groupName === group)
      const listRoles = groupData?.roles.map(item => item.role)
      setItems(listRoles as NullableString[])
      setGroup([groupData?.group as NullableString])
      if ([groupData?.group as NullableString] && errSelectedItems)
        setErrSelectedItems(false)
    }

    const setRoles = (role: string) => {
      const itemId = roles.find(item => item.nameRole === role)?.role
      if (selectedItems.includes(itemId as string)) {
        setItems(selectedItems.filter(value => value !== itemId))
        return
      }
      setItems([...selectedItems, itemId as string])
      if ([...selectedItems, itemId as string] && errSelectedItems)
        setErrSelectedItems(false)
    }

    const changeDivision = (textValue: string) => {
      setDivision(textValue)
      if (!textValue) {
        setDepartment('')
        setDepartments([])
      }
    }

    useEffect(() => {
      const id_division = divisions.find(
        value => value.divisionName === division
      )?.id
      const list = departaments.filter(item => item.id_division === id_division)
      setDepartments(
        list.map(item => {
          return {
            ['categoryName']: item.departmentName as string,
            ['category']: item.department as string,
            ['id']: item.id as string,
          }
        })
      )
      setDepartment('')
    }, [division])

    useEffect(() => {
      getRoles()
      getRolesGroup()
      getUserStatus()
    }, [])

    return (
      <Box sx={style} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography>{title}</Typography>
        <DropDown
          data={userStatus}
          props={{ mt: 4 }}
          onChange={data => setStatusName(data)}
          value={statusName}
          label="Выберите статус пользователя"
          errorLabel="Не выбран статус пользователя!"
        />
        <DropDown
          data={divisions.map(item => {
            return {
              ['categoryName']: item.divisionName as string,
              ['category']: item.division as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 4 }}
          onChange={changeDivision}
          value={division}
          label="Выберите подразделение"
          errorLabel="Не выбрано подразделение!"
        />
        <Box sx={{ width: '85%', mt: 1 }}>
          <FormControlLabel
            name={'Шеф подразделения'}
            label={'Шеф подразделения'}
            control={
              <Checkbox
                checked={chiefDivision}
                onChange={event =>
                  setCheckedCheifDivision(event.target.checked)
                }
              />
            }
          />
        </Box>
        <DropDown
          data={listDepartments}
          props={{ mt: 1 }}
          onChange={data => setDepartment(data)}
          value={department}
          label="Выберите отдел"
          errorLabel="Не выбран отдел!"
        />
        <Box sx={{ width: '85%', mt: 1 }}>
          <FormControlLabel
            name={'Шеф отдела'}
            label={'Шеф отдела'}
            control={
              <Checkbox
                checked={chiefDepartment}
                onChange={event =>
                  setCheckedCheifDepartment(event.target.checked)
                }
              />
            }
          />
        </Box>
        {fields.map(({ id, label, validation, type, value }, index) => {
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
                  name={field.name}
                  type={type}
                  required
                  variant="outlined"
                  sx={{ width: '90%', m: 2, mt: 1.5, height: 40 }}
                  margin="normal"
                  value={field.value || ''}
                  error={!!(errors?.list ?? [])[index]?.value?.message}
                  helperText={(errors?.list ?? [])[index]?.value?.message}
                  inputProps={{
                    style: {
                      ...styleTextFieldProps.inputProps,
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      ...styleTextFieldProps.inputLabelProps,
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
        {rolesGroup.map((item, index) => (
          <CheckBoxGroup
            data={item}
            key={`${item}${index}`}
            onChooseGroup={setRolesGroup}
            onChooseItems={setRoles}
            oneGroup={true}
            selectedGroup={selectedGroup}
          />
        ))}
        <Box sx={{ color: theme.palette.error.main, height: 20, mt: 1 }}>
          {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
        </Box>
        <ButtonSection handleModal={handleModal} btnName="Сохранить" />
      </Box>
    )
  }
)
