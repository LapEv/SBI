import { textValidation } from 'utils/validatorRules'

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

export const MapDivisionInputFields = [
  {
    title: 'Добавить новый дивизион',
    name: 'newDivision',
    label: 'Введите новый дивизион',
    validation: textValidation,
    type: 'text',
  },
]
