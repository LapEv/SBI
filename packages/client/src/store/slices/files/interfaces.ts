import { TypesOfWork } from '../incidents/interfaces'

export interface Files {
  id: string
  file: string
}

export interface UploadFiles {
  type: string
  files: FileList
  incident?: string
}

export interface AnswerFiles {
  data: Files[]
  type: string
}

export type FilesState = {
  files: Files[]
  isLoadingSLA: boolean
  error?: string
}
