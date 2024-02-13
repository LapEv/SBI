import { UploadFiles } from 'store/slices/files/interfaces'

export interface FilesActions {
  getFiles: () => void
  uploadFiles: (data: UploadFiles) => void
  resetUploadFiles: () => void
}
