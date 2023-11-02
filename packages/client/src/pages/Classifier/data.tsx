import {
  coordinatesValidation,
  emailValidation,
  loginValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  textValidation,
  textValidationENGlowercase,
  textValidationlowercase,
} from 'utils/validatorRules'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

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
]
export const ModalTitles = {
  newClassifierEquipment: 'Новый классификатор',
  newClassifierModel: 'Новая модель',
  newTypicalMalfunction: 'Новая типичная неисправность',
}

// export const MapAddressInputFields = [
//   {
//     name: 'address',
//     label: 'Введите новый адрес',
//     validation: textValidationlowercase,
//     type: 'text',
//   },
//   {
//     name: 'coordinates',
//     label: 'Введите координаты точки',
//     validation: coordinatesValidation,
//     type: 'text',
//   },
// ]

// export const MapRegionInputFields = [
//   {
//     name: 'region',
//     label: 'Введите новый регион',
//     validation: textValidation,
//     type: 'text',
//   },
// ]
