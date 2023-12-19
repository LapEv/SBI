import {
  timeValidation,
  lightTextValidation,
  NoRequiredValidation,
} from 'utils/validatorRules'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import EditIcon from '@mui/icons-material/Edit'

export const menuData = [
  {
    name: 'newIncidentStatus',
    title: 'Добавить новый статус инцидента',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'deleteIncidentStatuses',
    title: 'Удалить статус инцидента',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'changeIncidentStatuses',
    title: 'Изменить статус инцидента',
    icon: <EditIcon fontSize="medium" />,
  },
]

export const menuDispatcher = [
  {
    name: 'newIncident',
    title: 'Добавить новый инцидент',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newRequest',
    title: 'Добавить новый запрос',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
]

export const ModalTitles = {
  newIncident: 'Новый инцидент',
  newRequest: 'Новый запрос',
  newIncidentStatus: 'Новый статус инцидента',
  deleteIncidentStatuses: 'Удалить статус инцидента',
  changeIncidentStatuses: 'Изменить статус инцидента',
}

export const MapINCStatusInputFields = [
  {
    name: 'incStatus',
    label: 'Введите новый статус инцидента',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
]

export const MapINCInputFields = [
  {
    name: 'client',
    label: 'Выберите клиента',
    validation: lightTextValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'contract',
    label: 'Выберите контракт',
    validation: lightTextValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'object',
    label: 'Выберите объект',
    validation: lightTextValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'sla',
    label: 'Выберите SLA',
    validation: lightTextValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'cientINC',
    label: 'Введите клиентский номер',
    validation: lightTextValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'equipment',
    label: 'Выберите классификатор',
    validation: lightTextValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'model',
    label: 'Выберите модель',
    validation: lightTextValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'typicalMalfunction',
    label: 'Выберите типовую неисправность',
    validation: lightTextValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'description',
    label: 'Введите описание к инциденту',
    validation: lightTextValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'comments',
    label: 'Введите комментарии',
    validation: lightTextValidation,
    type: 'text',
    required: false,
  },
]
