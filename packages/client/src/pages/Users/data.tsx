import {
  emailValidation,
  loginValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  textValidation,
  textValidationENGlowercase,
} from 'utils/validatorRules'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Loupe from '@mui/icons-material/Loupe'
import Queue from '@mui/icons-material/Queue'
import LayersClear from '@mui/icons-material/LayersClear'
import DeleteSweep from '@mui/icons-material/DeleteSweep'
import DisplaySettings from '@mui/icons-material/DisplaySettings'
import Addchart from '@mui/icons-material/Addchart'
import GroupAdd from '@mui/icons-material/GroupAdd'
import Remove from '@mui/icons-material/Remove'
import GroupRemove from '@mui/icons-material/GroupRemove'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

export const menuData = [
  {
    name: 'addDivision',
    title: 'Добавить дивизион',
    icon: <Loupe fontSize="medium" />,
  },
  {
    name: 'addDepartments',
    title: 'Добавить отдел',
    icon: <Queue fontSize="medium" />,
  },
  {
    name: 'addUser',
    title: 'Добавить пользователя',
    icon: <PersonAdd fontSize="medium" />,
  },
  {
    name: 'addRole',
    title: 'Добавить роль',
    icon: <Addchart fontSize="medium" />,
  },
  {
    name: 'addRolesGroup',
    title: 'Добавить группу ролей',
    icon: <GroupAdd fontSize="medium" />,
  },
  {
    name: 'deleteDivision',
    title: 'Удалить дивизион',
    icon: <LayersClear fontSize="medium" />,
  },
  {
    name: 'deleteDepartments',
    title: 'Удалить отдел',
    icon: <DeleteSweep fontSize="medium" />,
  },
  {
    name: 'deleteUser',
    title: 'Удалить пользователя',
    icon: <PersonRemoveIcon fontSize="medium" />,
  },
  {
    name: 'deleteRole',
    title: 'Удалить роли',
    icon: <Remove fontSize="medium" />,
  },
  {
    name: 'deleteRolesGroup',
    title: 'Удалить группу ролей',
    icon: <GroupRemove fontSize="medium" />,
  },
  {
    name: 'changeRolesGroup',
    title: 'Изменить группу ролей',
    icon: <DisplaySettings fontSize="medium" />,
  },
]

export const ModalTitles = {
  addDivision: 'Новое подразделение',
  addDepartments: 'Новый отдел',
  addUser: 'Новый пользователь',
  addRole: 'Новая роль',
  addRolesGroup: 'Новая группа ролей',
  deleteDivision: 'Удалить дивизионы',
  deleteDepartment: 'Удалить отделы',
  deleteRole: 'Удалить роли',
  deleteRolesGroup: 'Удалить группу ролей',
  deleteUser: 'Удалить пользователя',
  changeRolesGroup: 'Изменить группу ролей',
}

export const MapRoleInputFields = [
  {
    name: 'nameRole',
    label: 'Введите новую роль',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'role',
    label: 'Введите идентификатор роли',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapRolesGroupInputFields = [
  {
    name: 'nameRolesGroup',
    label: 'Введите новую группу ролей',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'role',
    label: 'Введите идентификатор группы ролей',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapDivisionInputFields = [
  {
    name: 'newDivisionName',
    label: 'Введите новое подразделение',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'newDivisionId',
    label: 'Введите идентификатор нового подразделения',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapDepartmentInputFields = [
  {
    name: 'newDepartment',
    label: 'Введите новый отдел',
    validation: textValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'newDepartmentId',
    label: 'Введите идентификатор нового отдела',
    validation: textValidationENGlowercase,
    type: 'text',
    required: true,
  },
]

export const MapProfileInputFieldsAdmin = [
  {
    name: 'lastName',
    label: 'Фамилия',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'firstName',
    label: 'Имя',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'middleName',
    label: 'Отчество',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'username',
    label: 'Логин',
    validation: loginValidation,
    value: '',
    required: true,
  },
  {
    name: 'post',
    label: 'Должность',
    validation: textValidation,
    value: '',
    required: true,
  },
  {
    name: 'email',
    label: 'Почта',
    validation: emailValidation,
    value: '',
    required: true,
  },
  {
    name: 'phone',
    label: 'Телефон',
    validation: phoneValidation,
    value: '',
    required: true,
  },
  {
    name: 'password',
    label: 'Пароль',
    validation: passwordValidation,
    value: '',
    required: true,
  },
]

export const MapProfileInputFieldsAdminWithoutPassword = [
  {
    name: 'lastName',
    label: 'Фамилия',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'firstName',
    label: 'Имя',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'middleName',
    label: 'Отчество',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'username',
    label: 'Логин',
    validation: loginValidation,
    value: '',
    required: true,
  },
  {
    name: 'post',
    label: 'Должность',
    validation: textValidation,
    value: '',
    required: true,
  },
  {
    name: 'email',
    label: 'Почта',
    validation: emailValidation,
    value: '',
    required: true,
  },
  {
    name: 'phone',
    label: 'Телефон',
    validation: phoneValidation,
    value: '',
    required: true,
  },
]

export const MapProfileInputFields = [
  {
    name: 'lastName',
    label: 'Фамилия',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'firstName',
    label: 'Имя',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'middleName',
    label: 'Отчество',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'post',
    label: 'Должность',
    validation: nameValidation,
    value: '',
    required: true,
  },
  {
    name: 'email',
    label: 'Почта',
    validation: emailValidation,
    value: '',
    required: true,
  },
  {
    name: 'phone',
    label: 'Телефон',
    validation: phoneValidation,
    value: '',
    required: true,
  },
]
