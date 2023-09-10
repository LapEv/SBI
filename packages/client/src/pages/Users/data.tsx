import {
  emailValidation,
  loginValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  textValidation,
} from 'utils/validatorRules'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Loupe from '@mui/icons-material/Loupe'
import Queue from '@mui/icons-material/Queue'
import LayersClear from '@mui/icons-material/LayersClear'
import DeleteSweep from '@mui/icons-material/DeleteSweep'
import PersonRemove from '@mui/icons-material/PersonRemove'

export const menuData = [
  {
    name: 'addDivision',
    title: 'Добавить дивизион',
    icon: <Loupe fontSize="medium" />,
  },
  {
    name: 'addDepartments',
    title: 'Добавить департамент',
    icon: <Queue fontSize="medium" />,
  },
  {
    name: 'addUser',
    title: 'Добавить пользователя',
    icon: <PersonAdd fontSize="medium" />,
  },
  {
    name: 'deleteDivision',
    title: 'Удалить дивизион',
    icon: <LayersClear fontSize="medium" />,
  },
  {
    name: 'deleteDepartments',
    title: 'Удалить департамент',
    icon: <DeleteSweep fontSize="medium" />,
  },
  {
    name: 'deleteDivision',
    title: 'Удалить пользователя',
    icon: <PersonRemove fontSize="medium" />,
  },
]
export const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.default',
  borderWidth: 2,
  borderColor: 'border.default',
  borderStyle: 'solid',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
}

export const styleTextFieldProps = {
  inputProps: {
    height: 5,
    borderRadius: 5,
  },
  inputLabelProps: {
    top: -7,
    marginTop: 0,
  },
}

export const ModalTitles = {
  addDivision: 'Новое подразделение',
  addDepartments: 'Новый отдел',
  addUser: 'Новый пользователь',
  delDivision: 'Удалить дивизион',
  delDepartments: 'Удалить отдел',
  delUser: 'Удалить пользователь',
}

export const MapDivisionInputFields = [
  {
    name: 'newDivision',
    label: 'Введите новое подразделение',
    validation: textValidation,
    type: 'text',
  },
]

export const MapDepartmentInputFields = [
  {
    name: 'newDivision',
    label: 'Введите новый отдел',
    validation: textValidation,
    type: 'text',
  },
]

export const MapProfileInputFieldsAdmin = [
  {
    name: 'lastName',
    label: 'Фамилия',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'firstName',
    label: 'Имя',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'middleName',
    label: 'Отчество',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'username',
    label: 'Логин',
    validation: loginValidation,
    value: '',
  },
  {
    name: 'post',
    label: 'Должность',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'email',
    label: 'Почта',
    validation: emailValidation,
    value: '',
  },
  {
    name: 'phone',
    label: 'Телефон',
    validation: phoneValidation,
    value: '',
  },
  {
    name: 'password',
    label: 'Пароль',
    validation: passwordValidation,
    value: '',
  },
]

export const MapProfileInputFields = [
  {
    name: 'lastName',
    label: 'Фамилия',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'firstName',
    label: 'Имя',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'middleName',
    label: 'Отчество',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'post',
    label: 'Должность',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'email',
    label: 'Почта',
    validation: emailValidation,
    value: '',
  },
  {
    name: 'phone',
    label: 'Телефон',
    validation: phoneValidation,
    value: '',
  },
]
