import {
  emailValidation,
  // loginValidation,
  nameValidation,
  passwordValidation,
  passwordValidationNew,
  passwordValidationConfrim,
  phoneValidation,
  textValidation,
} from 'utils/validatorRules'

export const MapPasswordInputFields = [
  {
    name: 'oldPassword',
    label: 'Old Password',
    validation: passwordValidation,
    type: 'password',
  },
  {
    name: 'newPassword',
    label: 'New Password',
    validation: passwordValidationNew,
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    validation: passwordValidationConfrim,
    type: 'password',
  },
]

export const MapProfileInputFields = [
  {
    name: 'lastName',
    label: 'Фамилия',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'post',
    label: 'Должность',
    validation: textValidation,
    value: '',
  },
  {
    name: 'firstName',
    label: 'Имя',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'email',
    label: 'Почта',
    validation: emailValidation,
    value: '',
  },
  {
    name: 'middleName',
    label: 'Отчество',
    validation: nameValidation,
    value: '',
  },
  {
    name: 'phone',
    label: 'Телефон',
    validation: phoneValidation,
    value: '',
  },
]

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
