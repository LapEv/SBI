export const apiConst = {
  APInotifications: {
    mailMessages: {
      addRequest: {
        subject: {
          RUS: 'Ваще обращение принято под номером № ',
          ENG: 'Your request has been accepted under the number ',
        },
      },
      changeStatusRequest: {
        subject: {
          RUS: 'Изменен статус обращения ',
          ENG: 'The status of the request has been changed ',
        },
      },
      footer: {
        appName: 'stressOff',
        RUS() {
          return `Вы получили это сообщение, потому что пользуетесь услугами проекта "${this.appName}". Вы всегда можете настроить получение уведомлений в настройках своего личного кабинета в мобильжном приложении "${this.appName}", перейдя в раздел «Настройки» и изменив настройку рассылки уведомлений.`
        },
        ENG() {
          return `You received this message because you use the services of the project "${this.appName}". You can always configure receiving notifications in the settings of your personal account in the mobile application "${this.appName}" by going to the "Settings" section and changing the notification distribution setting.`
        },
      },
    },
    mailConstants: {
      request: { RUS: 'Обращение № ', ENG: 'Request № ' },
      status: { RUS: 'Статус: ', ENG: 'Status: ' },
      topic: { RUS: 'Тема: ', ENG: 'Topic: ' },
      description: { RUS: 'Описание: ', ENG: 'Description: ' },
      solution: { RUS: 'Комментарии: ', ENG: 'Comments: ' },
      date: { RUS: 'Дата: ', ENG: 'Date: ' },
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
