import { UserForINC } from 'storeAuth/interfaces'
import { Clients } from '../clients/interfaces'
import { ContractsForINC } from '../contracts/interfaces'
import { ObjectsForINC } from '../objects/interfaces'
import { SLAforINC } from '../sla/interfaces'
import {
  ClassifierEquipmentForINC,
  ClassifierModelForINC,
  TypicalMalfunctionForINC,
} from '../classifier/interfaces'

export interface INC {
  id: string
  numberINC: string
  incident: string
  clientINC: string
  status: string
  client: string
  contract: string
  sla: string
  typeOfWork: string
  object: string
  address: string
  coordinates: string
  region: string
  userAccepted: string
  equipment: string
  model: string
  typicalMalfunction: string
  timeRegistration: string
  timeInWork: string
  timeSLA: string
  timeCloseCheck: string
  timeClose: string
  executor: string
  responsible: string
  description: string
  comment: string
  report: string
  spaceParts: string
  act: string
  active: boolean
  IncindentStatus?: INCStatuses
  TypesOfWork?: TypesOfWork
  SLA?: SLAforINC
  Client?: Clients
  Contract?: ContractsForINC
  Object?: ObjectsForINC
  User?: UserForINC
  ClassifierEquipment?: ClassifierEquipmentForINC
  ClassifierModel?: ClassifierModelForINC
  TypicalMalfunction?: TypicalMalfunctionForINC
}

// export interface INCList {
//   id: string
//   numberINC: string
//   incident: string
//   clientINC: string
//   status: string
//   client: string
//   contract: string
//   sla: string
//   typeOfWork: string
//   object: string
//   address: string
//   coordinates: string
//   region: string
//   userAccepted: string
//   equipment: string
//   model: string
//   typicalMalfunction: string
//   timeRegistration: string
//   timeInWork: string
//   timeSLA: string
//   timeCloseCheck: string
//   timeClose: string
//   executor: string
//   responsible: string
//   description: string
//   comment: string
//   report: string
//   spaceParts: string
//   act: string
//   active: boolean
//   INCStatuses?: INCStatuses
//   TypesOfWork?: TypesOfWork
//   SLA?: SLAforINC
//   Client?: Clients
//   Contract?: ContractsForINC
//   Object?: ObjectsForINC
//   User?: UserForINC
//   ClassifierEquipment?: ClassifierEquipmentForINC
//   ClassifierModel?: ClassifierModelForINC
//   TypicalMalfunction?: TypicalMalfunctionForINC

// }

export interface AddINC {
  id_incStatus: string
  clientID: string
  contractID: string
  objectID: string
  SLAID: string
  typeOfWorkID: string
  timeSLA: string
  clientINC: string
  responsibleID: string
  equipmentId: string
  modelId: string
  typicalMalfunctionID: string
  description: string
  comment: string
  applicant: string
  applicantContacts: string
  methodsReuqest: string
}

export interface INCStatuses {
  id: string
  statusINC: string
  active?: boolean
}

export interface AddINCStatuses {
  statusINC: string
}

export interface TypesOfWork {
  id: string
  typeOfWork: string
  active?: boolean
}

export interface AddTypesOfWork {
  typeOfWork: string
}

export interface AnswerINC {
  data: INC[]
  type: string
}

export interface AnswerINCStatuses {
  data: INCStatuses[]
  type: string
}

export interface AnswerTypesOfWork {
  data: TypesOfWork[]
  type: string
}

export type INCState = {
  incidents: INC[]
  incStatuses: INCStatuses[]
  typesOfWork: TypesOfWork[]
  activeINC: string
  isLoadingINC: boolean
  error?: string
}

export interface ChangeINC {
  id?: string
  numberINC: string
  incident: string
  clientINC: string
  timeRegistration: string
  timeInWork: string
  timeSLA: string
  timeCloseCheck: string
  timeClose: string
  executor: string
  responsible: string
  description: string
  comment: string
  report: string
  spaceParts: string
  act: string
}

export interface ChangeINCStatuses {
  statusINC: string
  id?: string
}

export interface ChangeTypesOfWork {
  typeOfWork: string
  id?: string
}

export interface IServiceList {
  name: string
  label: string
}
