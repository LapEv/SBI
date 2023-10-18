import { RolesGroup } from 'storeRoles/interfaces'

export interface IListBoxGroup {
  groupName: string
  data: DataList[]
  groupId: string
  groupChecked: boolean
  onChooseItems: (checked: boolean, id: string) => void
}

export interface DataList {
  name: string
  id: string
  nameId?: string
  key?: string
  groupChecked?: boolean | null
  comment?: string
  initChecked?: boolean
}

export interface IItem extends DataList {
  name: string
  id: string
  onChooseItems: (checked: boolean, id: string) => void
  initChecked?: boolean
}

export interface ICheckBoxGroupData {
  group: string
  items: { name: string; id: string; nameId: string }[]
  id: string
  groupName: string
}
export interface ICheckBoxGroup {
  data: ICheckBoxGroupData
  props?: object
  key: string
  onChooseGroup: (data: string, id?: string) => void
  onChooseItems: (checked: boolean, id: string) => void
  oneGroup: boolean
  selectedGroup: string | string[]
}
