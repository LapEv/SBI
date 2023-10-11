export type MessageState = {
  text: string
  type: string | null
  isLoadingMessage: boolean
  error?: string
}

export type AnswerMessage = {
  message: {
    text: string
    type: string | null
  }
}
