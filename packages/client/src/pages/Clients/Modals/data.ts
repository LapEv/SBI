import {
  coordinatesValidation,
  textValidationlowercase,
} from 'utils/validatorRules'

export const MapNewAddressInputFields = [
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

export const MapNewRegionInputFields = [
  {
    name: 'region',
    label: 'Введите новый регион',
    validation: textValidationlowercase,
    type: 'text',
  },
]
