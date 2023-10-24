export interface Addresses {
  id?: string
  address: string
  coordinates: string
}

export interface Regions {
  id?: string
  region: string
}

export interface AnswerAddresses {
  data: Addresses[]
  type: string
}

export interface AnswerRegions {
  data: Regions[]
  type: string
}

export type AddressesState = {
  addresses: Addresses[]
  regions: Regions[]
  isLoadingRoles: boolean
  error?: string
}

export interface СhangeAddress {
  address: Addresses
  id: string
}

export interface СhangeRegion {
  region: Regions
  id: string
}
