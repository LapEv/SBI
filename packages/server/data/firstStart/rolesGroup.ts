export const rolesGroupStartData = [
  {
    group: 'SUPERADMIN',
    roles: ['SUPERADMIN'],
    groupName: 'SUPERADMIN',
  },
  {
    group: 'ADMIN',
    roles: ['ADMIN'],
    groupName: 'ADMIN',
  },
  {
    group: 'Dispatcher',
    roles: [
      'getUsers',
      'getDivisions',
      'getDepartments',
      'getActiveObjects',
      'getActiveClients',
      'getAddresses',
      'getRegions',
    ],
    groupName: 'Диспетчер',
  },
  {
    group: 'FieldEngineers',
    roles: ['getUsers', 'getDivisions', 'getDepartments'],
    groupName: 'Выездные инженеры',
  },
]
