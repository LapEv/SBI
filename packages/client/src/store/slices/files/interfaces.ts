import { TypesOfWork } from '../incidents/interfaces'

export interface Files {
  id: string
  name: string
  size: string
  mimetype: string
  path: string
}

export interface UploadFiles {
  type: string
  files: FileList
  incident?: string
  config?: any
  id_incFiles: string
}

export interface AnswerUploaded {
  data: Files[]
  type: string
}

export type FilesState = {
  files: Files[]
  isLoadingFiles: boolean
  uploadedFiles: Files[]
  error?: string
}
