import { createSlice } from '@reduxjs/toolkit'

export type MessageState = {
  message: {
    text: string
    type: string | null
  }
}

const initialState: MessageState = {
  message: {
    text: '',
    type: null,
  },
}

export const messageSlise = createSlice({
  name: 'message',
  initialState,
  reducers: {
    resetMessage(state) {
      console.log('resetMessage state = ', state)
      state.message = { text: '', type: null }
    },
    setMessage(state, action) {
      console.log('setMessage state = ', state)
      console.log('setMessage action = ', action)
      state.message = action.payload
    },
  },
})

export const messageReducer = messageSlise.reducer
export const { setMessage, resetMessage } = messageSlise.actions
