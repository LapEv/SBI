import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { MessageActions } from './messageActions'
import {
  MessageState,
  resetMessage,
  setMessage,
} from 'store/slices/message/message'

export function useMessage(): [MessageState, MessageActions] {
  const type = useSelector((state: RootState) => state.message)
  const dispatch = useAppDispatch()

  return [
    type,
    {
      resetMessage() {
        dispatch(resetMessage())
      },
      setMessage(data) {
        dispatch(setMessage(data))
      },
    },
  ]
}
