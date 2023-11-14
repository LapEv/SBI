import {
  coordinatesValidation,
  emailValidation,
  loginValidation,
  nameValidation,
  passwordValidation,
  lightTextValidation,
  textValidation,
  textValidationENGlowercase,
  textValidationlowercase,
} from 'utils/validatorRules'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'

export const menuData = [
  {
    name: 'newClassifierEquipment',
    title: 'Добавить классификатор',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newClassifierModel',
    title: 'Добавить модель',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newTypicalMalfunction',
    title: 'Добавить типичную неисправность',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'deleteClassifierEquipment',
    title: 'Удалить классификатор оборудования',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteClassifierModel',
    title: 'Удалить модель',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteTypicalMalfunction',
    title: 'Удалить типичную неисправность',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
]
export const ModalTitles = {
  newClassifierEquipment: 'Новый классификатор',
  newClassifierModel: 'Новая модель',
  newTypicalMalfunction: 'Новая типичная неисправность',
  deleteClassifierEquipment: 'Удалить классификатор',
  deleteClassifierModel: 'Удалить модель',
  deleteTypicalMalfunction: 'Удалить типичную неисправность',
  changeClassifierEquipment: 'Изменить классификатор',
  changeClassifierModel: 'Изменить модель',
  changeTypicalMalfunction: 'Изменить типичную неисправность',
}

export const MapClassifierInputFields = [
  {
    name: 'classifier',
    label: 'Введите новую классификацию оборудования',
    validation: textValidationlowercase,
    type: 'text',
  },
]

export const MapModelsInputFields = [
  {
    name: 'model',
    label: 'Введите новую модель',
    validation: lightTextValidation,
    type: 'text',
  },
]

export const MapTypMalfunctionInputFields = [
  {
    name: 'model',
    label: 'Введите новую типовую неисправность',
    validation: textValidation,
    type: 'text',
  },
]
