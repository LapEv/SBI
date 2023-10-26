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
import { TextField } from 'components/TextFields'
import { ChooseModalProps, AddValuesProps, Data } from './interfaces'
import { MapProfileInputFieldsAdmin } from '../data'
import { style, styleTextFieldProps } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { DropDown } from 'components/DropDown'
import { useRoles } from 'hooks/roles/useRoles'
import { CheckBoxGroup } from 'components/CheckBoxGroup'
import { useAuth } from 'hooks/auth/useAuth'
import { ICheckBoxGroupData } from 'components/CheckBoxGroup/interface'
import { RolesGroup } from 'storeRoles/interfaces'

export const AddUser = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ userStatus }, { getUserStatus, signup }] = useAuth()
    const [{ divisions, departaments }] = useStructure()
    const [{ rolesGroup }, { getRoles, getRolesGroup, setActiveRolesGroup }] =
      useRoles()
    const [dataGroup, setDataGroup] = useState<ICheckBoxGroupData[]>([])
    const [division, setDivision] = useState<string>('')
    const [listDepartments, setDepartments] = useState<Data[]>([])
    const [department, setDepartment] = useState<string>('')
    const [selectedGroup, setGroup] = useState<string>('')
    const [selectedItems, setItems] = useState<string[]>([])
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
      const group = rolesGroup.find(item => item.id === selectedGroup)?.group
      const newUser = {
        username: list[3].value,
        firstName: list[1].value,
        lastName: list[0].value,
        middleName: list[2].value,
        email: list[5].value,
        phone: list[6].value,
        password: list[7].value,
        post: list[4].value,
        roleGroup: group,
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
      setActiveRolesGroup('')
      handleModal(false)
    }

    const setRolesGroup = (group: string) => {
      if (!group) return
      const groupData = rolesGroup.find(item => item.id === group) as RolesGroup
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

    const closeModal = () => {
      setActiveRolesGroup('')
      handleModal(false)
    }

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
                    style: styleTextFieldProps.inputProps,
                  }}
                  InputLabelProps={{
                    style: styleTextFieldProps.inputLabelProps,
                  }}
                  FormHelperTextProps={{
                    style: styleTextFieldProps.formHelperTextProps,
                  }}
                />
              )}
            />
          )
        })}
        {dataGroup.map((item, index) => (
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
        <ButtonsModalSection closeModal={closeModal} btnName="Сохранить" />
      </Box>
    )
  }
)
