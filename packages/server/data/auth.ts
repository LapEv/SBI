export const auth = {
  passwordMinLength: 5,
  passwordMaxLength: 30,
  username: 'username',
  emptyUsername: 'The user name cannot be empty',
  password: 'password',
  checkPassword() {
    return `The password must be at least ${this.passwordMinLength} and no more than ${this.passwordMaxLength} characters`
  },
  notification: {
    addNotification: {
      ENG: 'Notification recorded!',
      RUS: 'Уведомление записано!',
    },
    addNotificationError: {
      ENG: 'Add notification error',
      RUS: 'Ошибка при добавлении уведомления',
    },
    updateNotification: {
      ENG: 'The notification has been updated!',
      RUS: 'Уведомление обновлено!',
    },
    updateNotificationError: {
      ENG: 'Error when updating notification!',
      RUS: 'Ошибка при изменении уведомления!',
    },
    getAllNotifications: {
      ENG: 'Get all notifications error',
      RUS: 'Ошибка при создании списка уведомлений',
    },
    userNotFound: { ENG: 'User not found!', RUS: 'Пользователь не найден!' },
    errorRegistration: {
      ENG: 'Error during registration!',
      RUS: 'Ошибка при регистрации!',
    },
    duplicateUser: {
      ENG: 'A user with this name already exists!',
      RUS: 'Пользователь с таким именем уже существует!',
    },
    successfulRegistration: {
      ENG: 'The user has been successfully registered!',
      RUS: 'Пользователь успешно зарегистрирован!',
    },
    notLogged: {
      ENG: 'The user is not logged in!',
      RUS: 'Пользователь не авторизован!',
    },
    invalidPassword: {
      ENG: 'Invalid password entered!',
      RUS: 'Введен неверный пароль!',
    },
    loginError: {
      ENG: 'Login error',
      RUS: 'Ошибка входа в систему',
    },
    getUsers: {
      ENG: 'Error getting the list of users',
      RUS: 'Ошибка получения списка пользователей',
    },
    getRoles: {
      ENG: 'Error getting the list of roles',
      RUS: 'Ошибка получения списка ролей',
    },
    errorNewRole: {
      ENG: 'Ошибка при создании новой роли',
      RUS: 'Error when creating a new role',
    },
    duplicatRole: {
      ENG: 'A role with this name already exists!',
      RUS: 'Роль с таким названием уже существует!',
    },
    successfulRole: {
      ENG: 'The role has been successfully added!',
      RUS: 'Роль была успешно добавлена!',
    },
    delRoleError: {
      ENG: 'Error when deleting a role',
      RUS: 'Ошибка при удалении роли',
    },
    updateUser: {
      ENG: 'User updated!',
      RUS: 'Пользователь обновлен!',
    },
    updateUserError: {
      ENG: 'Error when changing user data!',
      RUS: 'Ошибка при изменении данных пользователя!',
    },
    findUser: {
      ENG: 'User finded!',
      RUS: 'Пользователь найден!',
    },
    findUserError: {
      ENG: 'Error when finding user data!',
      RUS: 'Ошибка при поиске данных пользователя!',
    },
  },
}
