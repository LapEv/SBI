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
    addNotification: 'Уведомление записано!',
    addNotificationError: 'Ошибка при добавлении уведомления',
    updateNotification: 'Уведомление обновлено!',
    updateNotificationError: 'Ошибка при изменении уведомления!',
    getAllNotifications: 'Ошибка при создании списка уведомлений',
    userNotFound: 'Пользователь не найден!',
    errorRegistration: 'Ошибка при регистрации!',
    duplicateUser: 'Пользователь с таким именем уже существует!',
    successfulRegistration: 'Пользователь успешно зарегистрирован!',
    notLogged: 'Пользователь не авторизован!',
    invalidPassword: 'Введен неверный пароль!',
    loginError: 'Ошибка входа в систему',
    getUsers: 'Ошибка получения списка пользователей',
    getRoles: 'Ошибка получения списка ролей',
    errorNewRole: 'Error when creating a new role',
    duplicatRole: 'Роль с таким названием уже существует!',
    successfulRole: 'Роль была успешно добавлена!',
    delRoleError: 'Ошибка при удалении роли',
    updateUser: 'Пользователь обновлен!',
    updateUserError: 'Ошибка при изменении данных пользователя!',
    findUser: 'Пользователь найден!',
    findUserError: 'Ошибка при поиске данных пользователя!',
  },
}
