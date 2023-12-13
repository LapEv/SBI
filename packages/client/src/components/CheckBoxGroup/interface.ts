export interface IListBoxGroup {
  groupName: string
  data: { item: string; id: string }[]
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
  oneChecked?: boolean
}

export interface IItem extends DataList {
  name: string
  id: string
  onChooseItems: (checked: boolean, id: string) => void
  initChecked?: boolean
  oneChecked?: boolean
  props?: object
}

export interface ICheckBoxGroupData {
  group: string
  items: { item: string; id: string; checkedModels: boolean }[]
  id: string
  checkedGroup: boolean
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
