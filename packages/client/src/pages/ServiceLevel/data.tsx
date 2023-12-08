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
    name: 'newTypesSLA',
    title: 'Добавить тип SLA',
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
    name: 'deleteTypesSLA',
    title: 'Удалить тип SLA',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'changeTypesSLA',
    title: 'Изменить тип SLA',
    icon: <EditIcon fontSize="medium" />,
  },
]
export const ModalTitles = {
  newSLA: 'Новый SLA',
  newOLA: 'Новый OLA',
  newTypesSLA: 'Новый тип SLA',
  deleteSLA: 'Удалить SLA',
  deleteOLA: 'Удалить OLA',
  deleteTypesSLA: 'Удалить тип SLA',
  changeTypesSLA: 'Изменить тип SLA',
}

export const ServiceDataList = [
  {
    name: 'sla',
    label: 'SLA',
  },
  {
    name: 'ola',
    label: 'OLA',
  },
]

export const MapSLAInputFields = [
  {
    name: 'sla',
    label: 'Введите новый SLA',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'time',
    label: 'Выберите время реакции',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeStart',
    label: 'Выберите время начала',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeEnd',
    label: 'Выберите время конца',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'TypeSLA',
    label: 'Выберите тип SLA',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
]

export const MapSLAViewInputFields = [
  {
    name: 'sla',
    label: 'Наименование SLA',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'time',
    label: 'Время реакции',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeStart',
    label: 'Время начала',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeEnd',
    label: 'Время конца',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'TypeSLA',
    label: 'Тип SLA',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
]

export const MapOLAInputFields = [
  {
    name: 'ola',
    label: 'Введите новый OLA',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'time',
    label: 'Выберите время реакции',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeStart',
    label: 'Выберите время начала',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeEnd',
    label: 'Выберите время конца',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'TypeSLA',
    label: 'Выберите тип OLA',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
]

export const MapOLAViewInputFields = [
  {
    name: 'ola',
    label: 'Наименование OLA',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'time',
    label: 'Время реакции',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeStart',
    label: 'Время начала',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'timeEnd',
    label: 'Время конца',
    validation: timeValidation,
    type: 'time',
    required: true,
  },
  {
    name: 'TypeSLA',
    label: 'Тип SLA',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
]

export const MapTypesSLAInputFields = [
  {
    name: 'ola',
    label: 'Введите новый тип SLA',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
]
