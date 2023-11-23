import {
  coordinatesValidation,
  emailValidation,
  lightTextValidation,
  loginValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  textValidation,
  textValidationENGlowercase,
  textValidationlowercase,
} from 'utils/validatorRules'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import EditIcon from '@mui/icons-material/Edit'

export const menuData = [
  {
    name: 'newClient',
    title: 'Добавить клиента',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newAddress',
    title: 'Добавить адрес',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newRegion',
    title: 'Добавить регион',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'changeAddress',
    title: 'Изменить адрес',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeRegion',
    title: 'Изменить регион',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'deleteAddress',
    title: 'Удалить адрес',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteRegion',
    title: 'Удалить регион',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
]
export const ModalTitles = {
  newClient: 'Новый клиент',
  newAddress: 'Новый адрес',
  newRegion: 'Новый регион',
  deleteAddress: 'Удалить адрес',
  deleteRegion: 'Удалить регион',
  changeAddress: 'Изменить адрес',
  changeRegion: 'Изменить регион',
}

export const MapAddressInputFields = [
  {
    name: 'address',
    label: 'Введите новый адрес',
    validation: textValidationlowercase,
    type: 'text',
  },
  {
    name: 'coordinates',
    label: 'Введите координаты точки',
    validation: coordinatesValidation,
    type: 'text',
  },
]

export const MapRegionInputFields = [
  {
    name: 'region',
    label: 'Введите новый регион',
    validation: textValidation,
    type: 'text',
  },
]

export const MapClientInputFields = [
  {
    name: 'client',
    label: 'Введите внутренние наименование клиента',
    validation: lightTextValidation,
    type: 'text',
  },
  {
    name: 'legalName',
    label: 'Введите юридическое наименование клиента',
    validation: lightTextValidation,
    type: 'text',
  },
]
