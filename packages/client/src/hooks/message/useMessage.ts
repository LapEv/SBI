import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useAppDispatch } from 'store/hooks'
import { MessageActions } from './messageActions'
import { MessageState, resetMessage, setMessage } from 'store/slices/message'

export function useMessage(): [MessageState, MessageActions] {
  const message = useSelector((state: RootState) => state.message)
  const dispatch = useAppDispatch()

  const state = useSelector((state: RootState) => state)

  return [
    message,
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
