import { NoRequiredValidation, lightTextValidation } from 'utils/validatorRules'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import { INC_Column, ITableMeta } from './interfaces'
import { CustomCell, UserResponsible, Executor } from './'

export const menuData = [
  {
    name: 'newIncidentStatus',
    title: 'Добавить новый статус инцидента',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'newTypesOfWork',
    title: 'Добавить тип работ',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
  {
    name: 'deleteIncidentStatuses',
    title: 'Удалить статус инцидента',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'deleteTypesOfWork',
    title: 'Удалить тип работ',
    icon: <RemoveCircleOutline fontSize="medium" />,
  },
  {
    name: 'changeIncidentStatuses',
    title: 'Изменить статус инцидента',
    icon: <EditIcon fontSize="medium" />,
  },
  {
    name: 'changeTypesOfWork',
    title: 'Изменить тип работ',
    icon: <EditIcon fontSize="medium" />,
  },
]

export const createIncident = [
  {
    name: 'newIncident',
    title: 'Добавить новый инцидент',
    icon: <AddCircleOutlineIcon fontSize="medium" />,
  },
]
export const createRequest = [
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
  newTypesOfWork: 'Новый тип работ',
  deleteIncidentStatuses: 'Удалить статус инцидента',
  deleteTypesOfWork: 'Удалить тип работ',
  changeIncidentStatuses: 'Изменить статус инцидента',
  changeTypesOfWork: 'Изменить тип работ',
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

export const MapTypesOfWorkInputFields = [
  {
    name: 'typesOfWork',
    label: 'Введите новый тип работ',
    validation: lightTextValidation,
    type: 'text',
    required: true,
  },
]

export const MapINCInputFields = [
  {
    name: 'client',
    label: 'Выберите клиента',
    validation: NoRequiredValidation,
    type: 'text',
    required: true,
  },
  {
    name: 'sla',
    label: 'Выберите SLA',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'contract',
    label: 'Выберите контракт',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'timeSLA',
    label: 'Выберите время SLA',
    validation: NoRequiredValidation,
    type: 'datetime',
    required: true,
  },
  {
    name: 'object',
    label: 'Выберите объект',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'typeOfWrok',
    label: 'Выберите тип работ',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'equipment',
    label: 'Выберите классификатор',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'cientINC',
    label: 'Введите клиентский номер',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'model',
    label: 'Выберите модель',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'applicant',
    label: 'Введите заявителя',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'typicalMalfunction',
    label: 'Выберите типовую неисправность',
    validation: NoRequiredValidation,
    type: 'dropdown',
    required: true,
  },
  {
    name: 'applicantContacts',
    label: 'Введите контакты заявителя',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'description',
    label: 'Введите описание к инциденту',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
  {
    name: 'comments',
    label: 'Введите комментарии',
    validation: NoRequiredValidation,
    type: 'text',
    required: false,
  },
]

export const customCell = {
  width: 'auto',
  maxWidth: 150,
  height: 30,
  p: 0,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

export const customDropDownCell = {
  width: 200,
  maxWidth: 300,
  height: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  p: 0,
  pl: 1,
  pr: 1,
}

export const customHedearCell = {
  paddingLeft: 20,
}

export const textLabels = {
  body: {
    noMatch: 'Извините, нет ни одной записи!',
    toolTip: 'Сортировка',
    // columnHeaderTooltip: column => `Sort for ${column.label}`
  },
  pagination: {
    next: 'Следующая',
    previous: 'Предыдущая',
    rowsPerPage: 'Показывать строк:',
    displayRows: 'из',
  },
  toolbar: {
    search: 'Поиск',
    downloadCsv: 'Скачать CSV',
    print: 'Печать',
    viewColumns: 'Просмотр столбцов',
    filterTable: 'Фильтр',
  },
  filter: {
    all: 'Все',
    title: 'ФИЛЬТР',
    reset: 'СБРОС',
  },
  viewColumns: {
    title: 'Показывать столбцы',
    titleAria: 'Показать/скрыть столбцы',
  },
  selectedRows: {
    text: 'строк(и,а)',
    delete: 'Удалить',
    deleteAria: 'Удалить',
  },
}
