import axios, { InternalAxiosRequestConfig } from 'axios'

export const ApiEndPoints = {
  User: {
    Login: 'user/login',
    SetUser: 'user/setUser',
    SignOut: 'user/logout',
    UserInfo: 'user/getUserInfo',
    GetUsers: 'user/getActiveUsers',
    GetFieldEngineers: 'user/getFieldEngineers',
    GetDispatchers: 'user/getDispatchers',
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
  Objects: {
    getObjects: 'objects/getObjects',
    newObject: 'objects/newObject',
    deleteObjects: 'objects/deleteObjects',
    changeObject: 'objects/changeObject',
  },
  Classifier: {
    getClassifierEquipments: 'classifier/getClassifierEquipments',
    newClassifierEquipment: 'classifier/newClassifierEquipment',
    deleteClassifierEquipment: 'classifier/deleteClassifierEquipment',
    changeClassifierEquipment: 'classifier/changeClassifierEquipment',
    getClassifierModels: 'classifier/getClassifierModels',
    getClassifierModelsById: 'classifier/getClassifierModelsById',
    newClassifierModel: 'classifier/newClassifierModel',
    deleteClassifierModel: 'classifier/deleteClassifierModel',
    changeClassifierModel: 'classifier/changeClassifierModel',
    getTypicalMalfunctions: 'classifier/getTypicalMalfunctions',
    getTypicalMalfunctionsById: 'classifier/getTypicalMalfunctionsById',
    newTypicalMalfunction: 'classifier/newTypicalMalfunction',
    deleteTypicalMalfunction: 'classifier/deleteTypicalMalfunction',
    changeTypicalMalfunction: 'classifier/changeTypicalMalfunction',
    changeModelsInTypicalMalfunction:
      'classifier/changeModelsInTypicalMalfunction',
  },
  SLA: {
    getSLA: 'SLA/getSLA',
    newSLA: 'SLA/newSLA',
    deleteSLA: 'SLA/deleteSLA',
    changeSLA: 'SLA/changeSLA',
    getOLA: 'SLA/getOLA',
    newOLA: 'SLA/newOLA',
    deleteOLA: 'SLA/deleteOLA',
    changeOLA: 'SLA/changeOLA',
  },
  Clients: {
    getClientGroups: 'client/getClientGroups',
    newClientGroup: 'client/newClientGroup',
    deleteClientGroup: 'client/deleteClientGroup',
    changeClientGroup: 'client/changeClientGroup',
    getClients: 'client/getClients',
    newClient: 'client/newClient',
    deleteClient: 'client/deleteClient',
    changeClient: 'client/changeClient',
  },
  Contracts: {
    getContracts: 'contracts/getContracts',
    getContractsByClientID: 'contracts/getContractsByClientID',
    newContract: 'contracts/newContract',
    newContractName: 'contracts/newContractName',
    deleteContract: 'contracts/deleteContract',
    changeContract: 'contracts/changeContract',
  },
  INC: {
    getINC: 'incidents/getINC',
    newINC: 'incidents/newINC',
    changeINC: 'incidents/changeINC',
    changeExecutor: 'incidents/changeExecutor',
    changeResponsible: 'incidents/changeResponsible',
    changeUserClosingCheck: 'incidents/changeUserClosingCheck',
    changeUserClosing: 'incidents/changeUserClosing',
    getIncidentStatuses: 'incidents/getIncidentStatuses',
    newIncidentStatuses: 'incidents/newIncidentStatuses',
    deleteIncidentStatuses: 'incidents/deleteIncidentStatuses',
    changeIncidentStatuses: 'incidents/changeIncidentStatuses',
    getTypesOfWork: 'incidents/getTypesOfWork',
    newTypeOfWork: 'incidents/newTypeOfWork',
    deleteTypesOfWork: 'incidents/deleteTypesOfWork',
    changeTypesOfWork: 'incidents/changeTypesOfWork',
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
