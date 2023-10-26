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
