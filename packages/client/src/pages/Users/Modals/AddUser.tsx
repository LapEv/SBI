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
import { ChooseModalProps, AddValuesProps } from './interfaces'
import { MapProfileInputFieldsAdmin } from '../data'
import { modalStyle, boxDataModal } from 'static/styles'
import { ButtonsModalSection } from 'components/Buttons'
import { useStructure } from 'hooks/structure/useStructure'
import { DropDown, emptyValue } from 'components/DropDown'
import { useRoles } from 'hooks/roles/useRoles'
import { CheckBoxGroup, Item } from 'components/CheckBoxGroup'
import { useAuth } from 'hooks/auth/useAuth'
import {
  DataList,
  ICheckBoxGroupData,
} from 'components/CheckBoxGroup/interface'
import { RolesGroup } from 'storeRoles/interfaces'
import { Options } from 'components/DropDown/interface'

export const AddUser = React.forwardRef<unknown, ChooseModalProps>(
  /* eslint-disable @typescript-eslint/no-unused-vars */
  ({ handleModal, title }: ChooseModalProps, ref) => {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    const [{ userStatus }, { getUserStatus, signup }] = useAuth()
    const [{ divisions, departaments }] = useStructure()
    const [{ rolesGroup }, { getRolesGroup }] = useRoles()
    const [dataGroup, setDataGroup] = useState<DataList[]>([])
    const [division, setDivision] = useState<Options>(emptyValue)
    const [listDepartments, setDepartments] = useState<Options[]>([])
    const [department, setDepartment] = useState<Options>(emptyValue)
    const [selectedGroup, setGroup] = useState<string>('')
    const [errSelectedItems, setErrSelectedItems] = useState<boolean>(false)
    const [chiefDivision, setCheckedCheifDivision] = useState<boolean>(false)
    const [chiefDepartment, setCheckedCheifDepartment] =
      useState<boolean>(false)
    const [statusName, setStatusName] = useState<Options>(emptyValue)

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
      if (!selectedGroup.length) {
        setErrSelectedItems(true)
        return
      }
      const status = userStatus.find(
        item => item.id === statusName.id
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
        rolesGroup: group,
        division: division.label,
        chiefDivision,
        id_division: division.id,
        department: department.label,
        chiefDepartment,
        id_department: department.id,
        status,
        reasonOfDelete: '',
      }
      signup(newUser)
      handleModal(false)
    }

    const setRolesGroup = (checked: boolean, id: string) => {
      if (!checked) {
        setErrSelectedItems(true)
        setGroup('')
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
      setGroup(id)
      setErrSelectedItems(false)
    }

    const changeDivision = (data: Options) => {
      setDivision(data)
      if (!data) {
        setDepartment({
          label: '',
          id: '',
        })
        setDepartments([])
      }
    }

    useEffect(() => {
      const list = departaments.filter(item => item.id_division === division.id)
      setDepartments(
        list.map(item => {
          return {
            ['label']: item.departmentName as string,
            ['id']: item.id as string,
          }
        })
      )
      setDepartment({
        label: '',
        id: '',
      })
    }, [division])

    useEffect(() => {
      getRolesGroup()
      getUserStatus()
    }, [])

    useEffect(() => {
      const data = rolesGroup.map(item => {
        return {
          id: item.id,
          name: item.groupName,
        }
      })
      setDataGroup(data)
    }, [rolesGroup])

    const closeModal = () => {
      handleModal(false)
    }

    return (
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit(changeData)}>
        <Typography>{title}</Typography>
        <DropDown
          data={userStatus.map(item => {
            return {
              ['label']: item.categoryName as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 4 }}
          onChange={data => setStatusName(data)}
          value={statusName.label}
          label="Выберите статус пользователя"
          errorLabel="Не выбран статус пользователя!"
        />
        <DropDown
          data={divisions.map(item => {
            return {
              ['label']: item.divisionName as string,
              ['id']: item.id as string,
            }
          })}
          props={{ mt: 4 }}
          onChange={changeDivision}
          value={division.label}
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
          value={department.label}
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
        {fields.map(({ id, label, validation, type }, index) => {
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
                />
              )}
            />
          )
        })}
        {dataGroup.map(({ name, id, initChecked }) => (
          <Item
            name={name}
            id={`${id}`}
            groupChecked={null}
            onChooseItems={setRolesGroup}
            initChecked={initChecked}
            key={id}
            props={{ ml: 7 }}
          />
        ))}
        <Box sx={{ color: theme.palette.error.main, minHeight: 10, mt: 1 }}>
          {errSelectedItems && 'Не выбрана ни одна роль или группа ролей!'}
        </Box>
        <ButtonsModalSection closeModal={closeModal} btnName="Сохранить" />
      </Box>
    )
  }
)
