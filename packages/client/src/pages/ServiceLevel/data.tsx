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
import EditIcon from '@mui/icons-material/Edit'

export const menuData = [
  {
    name: 'newSLA',
    title: 'Добавить SLA',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newOLA',
    title: 'Добавить OLA',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'deleteSLA',
    title: 'Удалить SLA',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteOLA',
    title: 'Удалить OLA',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'changeSLA',
    title: 'Изменить SLA',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeOLA',
    title: 'Изменить OLA',
    icon: <EditIcon fontSize="medium" />,
  },
]
export const ModalTitles = {
  newSLA: 'Новый SLA',
  newOLA: 'Новая OLA',
  deleteSLA: 'Удалить SLA',
  deleteOLA: 'Удалить OLA',
  changeSLA: 'Изменить SLA',
  changeOLA: 'Изменить OLA',
}

// export const MapClassifierInputFields = [
//   {
//     name: 'classifier',
//     label: 'Введите новую классификацию оборудования',
//     validation: textValidationlowercase,
//     type: 'text',
//   },
// ]

// export const MapModelsInputFields = [
//   {
//     name: 'model',
//     label: 'Введите новую модель',
//     validation: lightTextValidation,
//     type: 'text',
//   },
// ]

// export const MapTypMalfunctionInputFields = [
//   {
//     name: 'model',
//     label: 'Введите новую типовую неисправность',
//     validation: textValidation,
//     type: 'text',
//   },
// ]

// export const MapNewTypicalMalfunctionsInputFields = [
//   {
//     name: 'typicalMalfunctions',
//     label: 'Введите новую типовую неисправность',
//     validation: lightTextValidation,
//     type: 'text',
//   },
// ]

// export const EmptyTypicalMalfunctions = [
//   {
//     models: [''],
//     id: '',
//     id_equipment: '',
//   },
// ]
