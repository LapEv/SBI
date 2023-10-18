import { MessageState } from 'store/slices/message/interfaces'

export interface MessageActions {
  resetMessage: () => void
  setMessage: (data: MessageState) => void
}
