export interface IListBoxGroup {
  groupName: string
  data: { item: string; id: string; checkedItems: boolean }[]
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
  items: { item: string; id: string; checkedItems: boolean }[]
  id: string
  checkedGroup: boolean
}
export interface ICheckBoxGroups {
  data: ICheckBoxGroupData[]
  props?: object
  onChooseGroup: (group: string[]) => void
  onChooseItems: (items: string[]) => void
  oneGroup?: boolean
}

export interface ICheckBoxGroup {
  data: ICheckBoxGroupData
  props?: object
  onChooseGroup: (checked: boolean, id: string) => void
  onChooseItems: (checked: boolean, id: string) => void
  onChooseItemsGroup: (checked: boolean, ids: string[]) => void
  oneGroup?: boolean
}

export interface ICheckBoxGroupItems {
  item: string
  id: string
  checkedItems: boolean
}
