import { createAsyncThunk } from '@reduxjs/toolkit'
import { authhost, ApiEndPoints, authFileHost } from './config'
import { getError } from 'utils/getError'
import { Files, UploadFiles } from 'store/slices/files/interfaces'
import axios from 'axios'

interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

export const getFiles = createAsyncThunk(
  'files/getFiles',
  async (_, thunkAPI) => {
    try {
      const { data } = await authhost.get<Files>(ApiEndPoints.Files.getFiles)
      return data
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось получить данные по файлам: \n${
            error.response?.data.message ?? error.response?.data
          }`
        )
      } else {
        console.error(error)
      }
    }
  }
)

export const uploadFiles = createAsyncThunk(
  'files/uploadFiles',
  async ({ type, files, incident, id_incFiles }: UploadFiles, thunkAPI) => {
    try {
      const formData = new FormData()
      Array.from(files).map(file => {
        formData.append('files', file, file.name)
        formData.append('filesName', file.name)
      })
      formData.append('type', type)
      formData.append('incident', incident as string)
      formData.append('id_incFiles', id_incFiles)
      const { data } = await authFileHost.post(
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
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        return thunkAPI.rejectWithValue(
          `Не удалось загрузить файлы: \n${
            error.response?.data.message ?? error.response?.data
          }`
        )
      } else {
        console.error(error)
      }
    }
  }
)
