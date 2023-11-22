import { timeValidation, textValidationlowercase } from 'utils/validatorRules'
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

export const ServiceList = [
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
    validation: textValidationlowercase,
    type: 'text',
  },
  {
    name: 'time',
    label: 'Выберите время реакции',
    validation: timeValidation,
    type: 'time',
  },
  {
    name: 'timeStart',
    label: 'Выберите время начала',
    validation: timeValidation,
    type: 'time',
  },
  {
    name: 'timeEnd',
    label: 'Выберите время конца',
    validation: timeValidation,
    type: 'time',
  },
]

export const MapSLAViewInputFields = [
  {
    name: 'sla',
    label: 'Наименование SLA',
    validation: textValidationlowercase,
    type: 'text',
  },
  {
    name: 'time',
    label: 'Время реакции',
    validation: timeValidation,
    type: 'time',
  },
  {
    name: 'timeStart',
    label: 'Время начала',
    validation: timeValidation,
    type: 'time',
  },
  {
    name: 'timeEnd',
    label: 'Время конца',
    validation: timeValidation,
    type: 'time',
  },
]

export const MapOLAInputFields = [
  {
    name: 'ola',
    label: 'Введите новый OLA',
    validation: textValidationlowercase,
    type: 'text',
  },
  {
    name: 'time',
    label: 'Выберите время реакции',
    validation: timeValidation,
    type: 'time',
  },
  {
    name: 'timeStart',
    label: 'Выберите время начала',
    validation: timeValidation,
    type: 'time',
  },
  {
    name: 'timeEnd',
    label: 'Выберите время конца',
    validation: timeValidation,
    type: 'time',
  },
]

export const MapOLAViewInputFields = [
  {
    name: 'ola',
    label: 'Наименование OLA',
    validation: textValidationlowercase,
    type: 'text',
  },
  {
    name: 'time',
    label: 'Время реакции',
    validation: timeValidation,
    type: 'time',
  },
  {
    name: 'timeStart',
    label: 'Время начала',
    validation: timeValidation,
    type: 'time',
  },
  {
    name: 'timeEnd',
    label: 'Время конца',
    validation: timeValidation,
    type: 'time',
  },
]
