import { createSlice } from '@reduxjs/toolkit'

export type MessageState = {
  text: string
  type: string | null
}

const initialState: MessageState = {
  text: '',
  type: null,
}

export const messageSlise = createSlice({
  name: 'message',
  initialState,
  reducers: {
    resetMessage(state) {
      console.log('resetMessage state = ', state)
      state.text = ''
      state.type = null
    },
    setMessage(state, action) {
      console.log('setMessage state = ', state)
      console.log('setMessage action = ', action)
      state.text = 'action.payload.text'
      state.type = 'action.payload.type'
    },
  },
})

export const messageReducer = messageSlise.reducer
export const { setMessage, resetMessage } = messageSlise.actions
