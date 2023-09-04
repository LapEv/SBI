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
    newRoleGroup: 'role/newRoleGroup',
    getRoles: 'role/getRoles',
    getRolesGroup: 'role/getRolesGroup',
    deleteRole: 'role/deleteRole',
    deleteRoleGroup: 'role/deleteRoleGroup',
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
