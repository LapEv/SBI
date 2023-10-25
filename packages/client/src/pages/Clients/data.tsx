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
import SouthAmerica from '@mui/icons-material/SouthAmerica'
import { RegionsSVG } from 'static/svg/region'

export const menuData = [
  {
    name: 'newAddress',
    title: 'Добавить адрес',
    icon: <SouthAmerica fontSize="medium" />,
  },
  {
    name: 'newRegion',
    title: 'Добавить регион',
    icon: <RegionsSVG fontSize="medium" />,
  },
  {
    name: 'changeAddress',
    title: 'Изменить адрес',
    icon: <SouthAmerica fontSize="medium" />,
  },
  {
    name: 'changeRegion',
    title: 'Изменить регион',
    icon: <SouthAmerica fontSize="medium" />,
  },
  {
    name: 'deleteAddress',
    title: 'Удалить адрес',
    icon: <SouthAmerica fontSize="medium" />,
  },
  {
    name: 'deleteRegion',
    title: 'Удалить регион',
    icon: <RegionsSVG fontSize="medium" />,
  },
  {
    name: 'deleteDepartments',
    title: 'Удалить отдел',
    icon: <SouthAmerica fontSize="medium" />,
  },
  {
    name: 'deleteRole',
    title: 'Удалить роли',
    icon: <SouthAmerica fontSize="medium" />,
  },
  {
    name: 'deleteRolesGroup',
    title: 'Удалить группу ролей',
    icon: <SouthAmerica fontSize="medium" />,
  },
  {
    name: 'changeRolesGroup',
    title: 'Изменить группу ролей',
    icon: <SouthAmerica fontSize="medium" />,
  },
]
export const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '40%',
  top: '50%',
  left: '50%',
  height: 'auto',
  maxHeight: '98%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.default',
  borderWidth: 2,
  borderColor: 'border.default',
  borderStyle: 'solid',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  overflowX: 'hidden',
}

export const styleTextFieldProps = {
  inputProps: {
    height: 5,
    borderRadius: 5,
    padding: '16px 14px',
  },
  inputLabelProps: {
    top: -7,
    marginTop: 0,
  },
}

export const ModalTitles = {
  newAddress: 'Новый адрес',
  newRegion: 'Новый регион',
  deleteAddress: 'Удалить адрес',
  deleteRegion: 'Удалить регион',
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
