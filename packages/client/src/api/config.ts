import axios from 'axios'

export const ApiEndPoints = {
  User: {
    Login: 'user/login',
    SetUser: 'user/setUser',
    SignOut: 'user/logout',
    UserInfo: 'user/getUserInfo',
    GetUsers: 'user/getUsers',
    CheckUser: 'user/checkUser',
    UserFullInfo: 'user/getUserFullInfo',
    UpdatePassword: 'user/password',
    UpdateProfile: 'user/profile',
    UpdateProfileAvatar: 'user/profile/avatar',
    Search: 'user/search',
    ChangeTheme: 'user/theme',
    GetUserTheme: 'user/theme/?id=',
  },
  Roles: {
    newRole: 'role/newRole',
    newRolesGroup: 'role/newRolesGroup',
    getRoles: 'role/getRoles',
    getRolesGroup: 'role/getRolesGroup',
    deleteRoles: 'role/deleteRole',
    deleteRolesGroup: 'role/deleteRolesGroup',
    changeRolesGroup: 'role/changeRolesGroup',
  },
  Structure: {
    newDivision: 'structure/newDivision',
    newDepartment: 'structure/newDepartment',
    getDivisions: 'structure/getDivisions',
    getDepartments: 'structure/getDepartments',
    deleteDivision: 'structure/deleteDivision',
    deleteDepartment: 'structure/deleteDepartment',
  },
}

const url = `http://localhost:${__SERVER_PORT__}/api/`

const authhost = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const host = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

authhost.interceptors.request.use(authInterceptor)

export { host, authhost }
