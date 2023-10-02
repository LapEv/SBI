interface Error {
  response: {
    data?: {
      message?: string
      error?: any
    }
  }
  config?: {
    baseURL?: string
    url?: string
  }
  code?: string
  message?: string
}

export const getError = (err: Error) => {
  if (err.response.data?.error[1].original?.detail as string) {
    return err.response.data?.error[1].original.detail
  }

  if (err.response.data?.message) {
    return err.response.data.message
  }
  if (err.response.data?.message) {
    return err.response.data.message
  }
  return `${err.config?.baseURL}${err.config?.url}\n ${err.code}: ${err.message}`
}
