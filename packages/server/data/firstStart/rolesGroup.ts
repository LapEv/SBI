export const rolesGroupStartData = [
  {
    group: 'SUPERADMIN',
    roles: [
      'SUPERADMIN',
      'ADMIN',
      'getUsers',
      'getRoles',
      'getRolesGroup',
      'getDivisions',
      'getDepartments',
    ],
    rolesGroupName: ['SUPERADMIN'],
  },
  {
    group: 'ADMIN',
    roles: [
      'ADMIN',
      'getUsers',
      'getRoles',
      'getRolesGroup',
      'getDivisions',
      'getDepartments',
    ],
    rolesGroupName: ['ADMIN'],
  },
  {
    group: 'Dispatcher',
    roles: [
      'getUsers',
      'getRoles',
      'getRolesGroup',
      'getDivisions',
      'getDepartments',
    ],
    rolesGroupName: ['Диспетчер'],
  },
]
