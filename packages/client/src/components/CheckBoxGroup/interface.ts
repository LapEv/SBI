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
  groupChecked?: boolean
  comment?: string
}

export interface IItem extends DataList {
  name: string
  id: string
  onChooseItems: (checked: boolean, id: string) => void
}
