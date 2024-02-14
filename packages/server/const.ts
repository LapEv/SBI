export const mailConst = {
  mailMessages: {
    footer:
      'Данное сообщение отправлено автоматически, не надо на него отвечать.',
    Incidents: {
      titleRegistration: 'Уведолмение о регистрации обращения под номером ',
      addRequest: 'Зарегистровано обращение:',
      client: 'Клиент:',
      clientINC: 'Номер клиента:',
      object: 'Объект:',
      objectClientID: 'ID объекта клиента:',
      objectClientName: 'Название объекта клиента:',
      address: 'Адрес объекта:',
      equipment: 'Классификатор оборудования:',
      model: 'Модель оборудования:',
      malfunction: 'Неисправность:',
      status: 'Статус:',
      timeRegistration: 'Время регистрации:',
      timeSLA: 'Крайний срок выполнения:',
      description: 'Описание проблемы:',
      applicant: 'Заявитель:',
      applicantContacts: 'Контакты заявителя:',
      userAccepted: 'Принял:',
    },
  },
}

export const AppConst = {
  attrINC: 'INC',
  numberDigit: 9,
  startINC: 23111,
  methodsReuqest: {
    manually: 'manually',
    email: 'email',
    web: 'web',
  },
  ActionComment: {
    incidentRegistration: 'Зарегистрирован инцидент под номером ',
    changeExecutor: {
      first: 'Для инцидента под номером ',
      second: ' изменен исполнитель ',
    },
    changeResponsible: {
      first: 'Для инцидента под номером ',
      second: ' изменен ответственный ',
    },
    changeStatus: {
      first: 'Для инцидента под номером ',
      second: ' изменен статус ',
    },
  },
  Statuses: {
    registered: 'Зарегистрирован',
    inWork: 'В работе',
    resolved: 'Решён',
    closed: 'Закрыт',
  },
  path: {
    files: 'Files',
    incidentsActs: 'IncidentsActs',
  },
  fileNotification: {
    addFile: 'Файл был добавлен!',
    addFileError: 'Ошибка при записи файла!',
    addDir: 'Папка была создана!',
    addFolderError: 'Ошибка при создании папки!',
    errorFileExists: 'Такой файл уже существует!',
    getFiles: 'Список файлов подготовлен!',
    getFilesError: 'Ошибка при создании списка файлов!',
    getFile: 'Файл получен!',
    getFileError: 'Ошибка при получении файла!',
  },
}
