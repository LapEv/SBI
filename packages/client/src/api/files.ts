import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints, authhFileHost } from './config'
import { getError } from 'utils/getError'
import { Files, UploadFiles } from 'store/slices/files/interfaces'

export const getFiles = createAsyncThunk(
  'files/getFiles',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Files>(ApiEndPoints.Files.getFiles)
      return data
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные по файлам\n${getError(e)}`
      )
    }
  }
)

export const uploadFiles = createAsyncThunk(
  'files/uploadFiles',
  async ({ type, files, incident }: UploadFiles, thunkAPI) => {
    try {
      const formData = new FormData()
      Array.from(files).forEach(file => {
        formData.append('files', file, file.name)
        formData.append('filesName', file.name)
      })
      formData.append('type', type)
      formData.append('incident', incident as string)
      const { data } = await authhFileHost.post(
        ApiEndPoints.Files.uploadFiles,
        formData
      )
      return {
        data,
        message: {
          text: 'Файлы загружены',
          type: 'success',
        },
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (e: any) {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      return thunkAPI.rejectWithValue(
        `Не удалось загрузить файлы\n${getError(e)} `
      )
    }
  }
)
