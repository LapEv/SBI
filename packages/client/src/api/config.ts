import axios, { InternalAxiosRequestConfig } from 'axios'

export const ApiEndPoints = {
  User: {
    Login: 'user/login',
    SetUser: 'user/setUser',
    SignOut: 'user/logout',
    UserInfo: 'user/getUserInfo',
    GetUsers: 'user/getActiveUsers',
    CheckUser: 'user/checkUser',
    UserFullInfo: 'user/getUserFullInfo',
    ChangePassword: 'user/changePassword',
    UpdateProfile: 'user/updateProfile',
    UpdateProfileAvatar: 'user/profile/changeAvatar',
    Search: 'user/search',
    ChangeTheme: 'user/theme',
    GetUserTheme: 'user/theme/?id=',
    GetUserStatus: 'user/getUserStatus',
    DeleteUser: 'user/deleteUser',
    UpdateUser: 'user/updateUser',
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
    updateDivision: 'structure/updateDivision',
    updateDepartment: 'structure/updateDepartment',
  },
  Addresses: {
    getAddresses: 'addresses/getAddresses',
    newAddress: 'addresses/newAddress',
    deleteAddress: 'addresses/deleteAddress',
    changeAddress: 'addresses/changeAddress',
    getRegions: 'addresses/getRegions',
    newRegion: 'addresses/newRegion',
    deleteRegion: 'addresses/deleteRegion',
    changeRegion: 'addresses/changeRegion',
  },
  Classifier: {
    getClassifierEquipments: 'classifier/getClassifierEquipments',
    newClassifierEquipment: 'classifier/newClassifierEquipment',
    deleteclassifierEquipment: 'classifier/deleteclassifierEquipment',
    changeClassifierEquipment: 'classifier/changeClassifierEquipment',
    getClassifierModels: 'classifier/getClassifierModels',
    newClassifierModel: 'classifier/newClassifierModel',
    deleteClassifierModel: 'classifier/deleteClassifierModel',
    changeClassifierModel: 'classifier/changeClassifierModel',
    getTypicalMalfunctions: 'classifier/getTypicalMalfunctions',
    newTypicalMalfunction: 'classifier/newTypicalMalfunction',
    deleteTypicalMalfunction: 'classifier/deleteTypicalMalfunction',
    changeTypicalMalfunction: 'classifier/changeTypicalMalfunction',
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

const authInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

authhost.interceptors.request.use(authInterceptor)

export { host, authhost }
