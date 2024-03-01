import { Options } from 'components/DropDown/interface'
import { ChangeComment } from 'store/slices/incidents/interfaces'

export interface AdditionalMenuProps {
  denseTable: boolean
  setDenseTableFunc: (state: boolean) => void
  onPrint: () => void
  checkClickMenu: (name: string | null) => void
  dragTable: boolean
  setDragTable: (state: boolean) => void
}

export interface IDenseTable {
  denseTable: boolean
  setDenseTable: (data: boolean) => void
}

export interface IDragTable {
  dragTable: boolean
  setDragTable: (data: boolean) => void
}

export interface IExecutor {
  value: string
  id: string
  incident: string
  responsible: string
}

export interface IStatus {
  value: string
  id: string
  incident: string
  responsible: string
  currentStatus: string
  timeSLA: string
}

export interface CellProps {
  label: string
  value: string
}

export interface CellPropsComments {
  label: string
  value: string
  onSaveComments: (comment: string) => void
}

export interface IncidentDataProps {
  values: any
  setHeight: (height: number) => void
  onSaveComments: (data: ChangeComment) => void
}

export interface PrintData {
  onPrint: () => void
}

export interface ICustomCell {
  value: string
  denseTable: boolean
}

export interface ISpacePart {
  value: string[]
  denseTable: boolean
}

export interface IModal {
  status: boolean
  data: Options
}

export interface IStatusTemp {
  id: string
  incident: string
  timeSLA: string
  data: Options
  id_incStatus: string
  status: string
  userID: string
  typeCompletedWork: Options
  commentCloseCheck: string
  spaceParts: string[]
}
